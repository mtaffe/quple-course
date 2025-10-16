import { supabase } from './client';

export interface ProjectSubmission {
  id: string;
  studentId: string;
  weekId: string;
  repositoryUrl?: string;
  liveUrl?: string;
  description?: string;
  status: 'submitted' | 'approved' | 'needs_revision';
  grade?: 'excellent' | 'good' | 'needs_improvement';
  mentorFeedback?: string;
  xpEarned: number;
  submittedAt: Date;
  reviewedAt?: Date;
}

export interface ProjectSubmissionInput {
  weekId: string;
  repositoryUrl?: string;
  liveUrl?: string;
  description?: string;
}

export class ProjectSubmissionService {
  /**
   * Submete um projeto semanal
   */
  static async submitProject(
    studentId: string,
    input: ProjectSubmissionInput
  ): Promise<ProjectSubmission> {
    // Verificar se já existe submissão para esta semana
    const existing = await this.getProjectSubmission(studentId, input.weekId);

    if (existing) {
      // Atualizar submissão existente
      // CRITICAL: Passar null explicitamente para campos limpos (undefined não sobrescreve)
      const { data, error } = await supabase
        .from('project_submissions')
        .update({
          repository_url: input.repositoryUrl || null,
          live_url: input.liveUrl || null,
          description: input.description || null,
          status: 'submitted', // Reset status ao reenviar
          submitted_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      return this.mapToProjectSubmission(data);
    }

    // Criar nova submissão
    const { data, error } = await supabase
      .from('project_submissions')
      .insert({
        student_id: studentId,
        week_id: input.weekId,
        repository_url: input.repositoryUrl,
        live_url: input.liveUrl,
        description: input.description,
        status: 'submitted',
        xp_earned: 0, // XP será atribuído quando aprovado pelo mentor
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapToProjectSubmission(data);
  }

  /**
   * Busca submissão de projeto de uma semana específica
   */
  static async getProjectSubmission(
    studentId: string,
    weekId: string
  ): Promise<ProjectSubmission | null> {
    const { data, error } = await supabase
      .from('project_submissions')
      .select('*')
      .eq('student_id', studentId)
      .eq('week_id', weekId)
      .maybeSingle();

    if (error) throw error;
    return data ? this.mapToProjectSubmission(data) : null;
  }

  /**
   * Busca todas as submissões de um estudante
   */
  static async getAllStudentSubmissions(
    studentId: string
  ): Promise<ProjectSubmission[]> {
    const { data, error } = await supabase
      .from('project_submissions')
      .select('*')
      .eq('student_id', studentId)
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return data?.map(this.mapToProjectSubmission) || [];
  }

  /**
   * Atualiza feedback do mentor (apenas para mentores)
   */
  static async updateMentorFeedback(
    submissionId: string,
    feedback: {
      status: 'approved' | 'needs_revision';
      grade?: 'excellent' | 'good' | 'needs_improvement';
      mentorFeedback: string;
      xpEarned?: number;
    }
  ): Promise<ProjectSubmission> {
    const { data, error } = await supabase
      .from('project_submissions')
      .update({
        status: feedback.status,
        grade: feedback.grade,
        mentor_feedback: feedback.mentorFeedback,
        xp_earned: feedback.xpEarned || 0,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', submissionId)
      .select()
      .single();

    if (error) throw error;

    // Se aprovado, atualizar XP do estudante
    if (feedback.status === 'approved' && feedback.xpEarned) {
      await this.updateStudentXP(data.student_id, feedback.xpEarned);
    }

    return this.mapToProjectSubmission(data);
  }

  /**
   * Atualiza XP do estudante
   */
  private static async updateStudentXP(studentId: string, xpToAdd: number): Promise<void> {
    const { error } = await supabase.rpc('increment_student_xp', {
      student_uuid: studentId,
      xp_amount: xpToAdd,
    });

    // Fallback se RPC não existir
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
   * Mapeia dados do Supabase para ProjectSubmission
   */
  private static mapToProjectSubmission(data: any): ProjectSubmission {
    return {
      id: data.id,
      studentId: data.student_id,
      weekId: data.week_id,
      repositoryUrl: data.repository_url,
      liveUrl: data.live_url,
      description: data.description,
      status: data.status,
      grade: data.grade,
      mentorFeedback: data.mentor_feedback,
      xpEarned: data.xp_earned,
      submittedAt: new Date(data.submitted_at),
      reviewedAt: data.reviewed_at ? new Date(data.reviewed_at) : undefined,
    };
  }
}
