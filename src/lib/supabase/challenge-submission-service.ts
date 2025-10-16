import { supabase } from './client';

export interface ChallengeSubmission {
  id: string;
  studentId: string;
  weekId: string;
  challengeId: string;
  code: string;
  status: 'submitted' | 'passed' | 'failed';
  xpEarned: number;
  attempts: number;
  submittedAt: Date;
}

export interface SubmissionStats {
  totalAttempts: number;
  lastAttempt?: ChallengeSubmission;
  bestAttempt?: ChallengeSubmission;
  isPassed: boolean;
  totalXPEarned: number;
}

export class ChallengeSubmissionService {
  /**
   * Salva uma submissão de desafio (tentativa do aluno)
   */
  static async saveSubmission(
    studentId: string,
    weekId: string,
    challengeId: string,
    code: string,
    success: boolean,
    xpEarned: number = 0
  ): Promise<ChallengeSubmission> {
    // Calcular attempt number e verificar se já passou (1 query leve)
    const { count, hasPassed } = await this.getAttemptInfo(studentId, weekId, challengeId);
    
    const submission = {
      student_id: studentId,
      week_id: weekId,
      challenge_id: challengeId,
      code,
      status: success ? 'passed' : 'submitted',
      xp_earned: success ? xpEarned : 0,
      attempts: (count || 0) + 1,
    };

    const { data, error } = await supabase
      .from('challenge_submissions')
      .insert(submission)
      .select()
      .single();

    if (error) throw error;

    // Se for primeira vez que completa o desafio, atualizar XP global do aluno
    if (success && !hasPassed) {
      await this.updateStudentXP(studentId, xpEarned);
    }

    return this.mapToSubmission(data);
  }

  /**
   * Busca apenas o número de tentativas e status (query otimizada)
   */
  private static async getAttemptInfo(
    studentId: string,
    weekId: string,
    challengeId: string
  ): Promise<{ count: number; hasPassed: boolean }> {
    const [countResult, passedResult] = await Promise.all([
      supabase
        .from('challenge_submissions')
        .select('id', { count: 'exact', head: true })
        .eq('student_id', studentId)
        .eq('week_id', weekId)
        .eq('challenge_id', challengeId),
      supabase
        .from('challenge_submissions')
        .select('id')
        .eq('student_id', studentId)
        .eq('week_id', weekId)
        .eq('challenge_id', challengeId)
        .eq('status', 'passed')
        .limit(1)
        .maybeSingle(),
    ]);

    return {
      count: countResult.count || 0,
      hasPassed: !!passedResult.data,
    };
  }

  /**
   * Atualiza o XP total do estudante
   */
  private static async updateStudentXP(studentId: string, xpToAdd: number): Promise<void> {
    const { error } = await supabase.rpc('increment_student_xp', {
      student_uuid: studentId,
      xp_amount: xpToAdd,
    });

    // Fallback: se a função RPC não existir, fazer update manual
    if (error && error.code === '42883') {
      const { data: student } = await supabase
        .from('students')
        .select('total_xp')
        .eq('id', studentId)
        .single();

      if (student) {
        await supabase
          .from('students')
          .update({ total_xp: (student.total_xp || 0) + xpToAdd })
          .eq('id', studentId);
      }
    } else if (error) {
      console.error('Erro ao atualizar XP do estudante:', error);
    }
  }

  /**
   * Busca estatísticas de submissões de um desafio específico
   */
  static async getSubmissionStats(
    studentId: string,
    weekId: string,
    challengeId: string
  ): Promise<SubmissionStats> {
    const { data, error } = await supabase
      .from('challenge_submissions')
      .select('*')
      .eq('student_id', studentId)
      .eq('week_id', weekId)
      .eq('challenge_id', challengeId)
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      return {
        totalAttempts: 0,
        isPassed: false,
        totalXPEarned: 0,
      };
    }

    const submissions = data.map(this.mapToSubmission);
    const lastAttempt = submissions[0];
    const passedAttempts = submissions.filter(s => s.status === 'passed');
    const bestAttempt = passedAttempts.sort((a, b) => b.xpEarned - a.xpEarned)[0];
    const totalXP = passedAttempts.reduce((sum, s) => sum + s.xpEarned, 0);

    return {
      totalAttempts: submissions.length,
      lastAttempt,
      bestAttempt,
      isPassed: passedAttempts.length > 0,
      totalXPEarned: totalXP,
    };
  }

  /**
   * Busca todas as submissões de uma semana específica
   */
  static async getWeekSubmissions(
    studentId: string,
    weekId: string
  ): Promise<ChallengeSubmission[]> {
    const { data, error } = await supabase
      .from('challenge_submissions')
      .select('*')
      .eq('student_id', studentId)
      .eq('week_id', weekId)
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    return data?.map(this.mapToSubmission) || [];
  }

  /**
   * Busca a última submissão bem-sucedida de um desafio
   */
  static async getLastSuccessfulSubmission(
    studentId: string,
    weekId: string,
    challengeId: string
  ): Promise<ChallengeSubmission | null> {
    const { data, error } = await supabase
      .from('challenge_submissions')
      .select('*')
      .eq('student_id', studentId)
      .eq('week_id', weekId)
      .eq('challenge_id', challengeId)
      .eq('status', 'passed')
      .order('submitted_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      throw error;
    }

    return data ? this.mapToSubmission(data) : null;
  }

  /**
   * Verifica se o aluno já completou um desafio
   */
  static async isChallengeCompleted(
    studentId: string,
    weekId: string,
    challengeId: string
  ): Promise<boolean> {
    const { data, error } = await supabase
      .from('challenge_submissions')
      .select('id')
      .eq('student_id', studentId)
      .eq('week_id', weekId)
      .eq('challenge_id', challengeId)
      .eq('status', 'passed')
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return false; // No rows found
      throw error;
    }

    return !!data;
  }

  /**
   * Mapeia os dados do Supabase para o tipo ChallengeSubmission
   */
  private static mapToSubmission(data: any): ChallengeSubmission {
    return {
      id: data.id,
      studentId: data.student_id,
      weekId: data.week_id,
      challengeId: data.challenge_id,
      code: data.code,
      status: data.status,
      xpEarned: data.xp_earned,
      attempts: data.attempts,
      submittedAt: new Date(data.submitted_at),
    };
  }
}
