import { supabase } from './client';
import type { ProjectSubmission } from './project-submission-service';

export interface PendingSubmission {
  id: string;
  studentId: string;
  studentName: string;
  weekId: string;
  weekNumber: number;
  weekTitle: string;
  repositoryUrl?: string;
  liveUrl?: string;
  description?: string;
  submittedAt: Date;
  attemptCount: number;
}

export interface ReviewedSubmission extends PendingSubmission {
  status: 'approved' | 'needs_revision';
  grade?: 'excellent' | 'good' | 'needs_improvement';
  mentorFeedback?: string;
  xpEarned: number;
  reviewedAt: Date;
}

export interface ChallengeAnalytics {
  challengeId: string;
  challengeTitle: string;
  weekNumber: number;
  totalAttempts: number;
  successfulAttempts: number;
  successRate: number;
  uniqueStudents: number;
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  studentEmail: string;
  totalXP: number;
  completedChallenges: number;
  completedProjects: number;
  weeklyProgress: {
    weekNumber: number;
    challengesCompleted: number;
    projectStatus: 'not_started' | 'submitted' | 'approved' | 'needs_revision';
  }[];
}

export class MentorAnalyticsService {
  /**
   * Busca todas as submissões pendentes de review
   */
  static async getPendingSubmissions(cohortId?: string): Promise<PendingSubmission[]> {
    let query = supabase
      .from('project_submissions')
      .select(`
        id,
        student_id,
        week_id,
        repository_url,
        live_url,
        description,
        submitted_at,
        students!inner(
          id,
          name,
          email,
          cohort_id
        )
      `)
      .eq('status', 'submitted')
      .order('submitted_at', { ascending: false });

    if (cohortId) {
      query = query.eq('students.cohort_id', cohortId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data?.map((submission: any) => ({
      id: submission.id,
      studentId: submission.student_id,
      studentName: submission.students.name,
      weekId: submission.week_id,
      weekNumber: this.extractWeekNumber(submission.week_id),
      weekTitle: `Semana ${this.extractWeekNumber(submission.week_id)}`,
      repositoryUrl: submission.repository_url,
      liveUrl: submission.live_url,
      description: submission.description,
      submittedAt: new Date(submission.submitted_at),
      attemptCount: 1, // TODO: Implementar contagem de reenvios
    })) || [];
  }

  /**
   * Busca submissões já revisadas (histórico)
   */
  static async getReviewedSubmissions(cohortId?: string): Promise<ReviewedSubmission[]> {
    let query = supabase
      .from('project_submissions')
      .select(`
        id,
        student_id,
        week_id,
        repository_url,
        live_url,
        description,
        status,
        grade,
        mentor_feedback,
        xp_earned,
        submitted_at,
        reviewed_at,
        students!inner(
          id,
          name,
          cohort_id
        )
      `)
      .in('status', ['approved', 'needs_revision'])
      .not('reviewed_at', 'is', null)
      .order('reviewed_at', { ascending: false });

    if (cohortId) {
      query = query.eq('students.cohort_id', cohortId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data?.map((submission: any) => ({
      id: submission.id,
      studentId: submission.student_id,
      studentName: submission.students.name,
      weekId: submission.week_id,
      weekNumber: this.extractWeekNumber(submission.week_id),
      weekTitle: `Semana ${this.extractWeekNumber(submission.week_id)}`,
      repositoryUrl: submission.repository_url,
      liveUrl: submission.live_url,
      description: submission.description,
      status: submission.status,
      grade: submission.grade,
      mentorFeedback: submission.mentor_feedback,
      xpEarned: submission.xp_earned,
      submittedAt: new Date(submission.submitted_at),
      reviewedAt: new Date(submission.reviewed_at),
      attemptCount: 1,
    })) || [];
  }

  /**
   * Busca analytics de desafios (taxa de conclusão, dificuldade)
   */
  static async getChallengeAnalytics(cohortId?: string): Promise<ChallengeAnalytics[]> {
    let query = supabase
      .from('challenge_submissions')
      .select(`
        challenge_id,
        success,
        student_id,
        students!inner(cohort_id)
      `);

    if (cohortId) {
      query = query.eq('students.cohort_id', cohortId);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Agrupar por challenge_id
    const analytics = new Map<string, {
      totalAttempts: number;
      successfulAttempts: number;
      students: Set<string>;
    }>();

    data?.forEach((submission: any) => {
      const existing = analytics.get(submission.challenge_id) || {
        totalAttempts: 0,
        successfulAttempts: 0,
        students: new Set<string>(),
      };

      existing.totalAttempts++;
      if (submission.success) existing.successfulAttempts++;
      existing.students.add(submission.student_id);

      analytics.set(submission.challenge_id, existing);
    });

    // Converter para array
    return Array.from(analytics.entries()).map(([challengeId, stats]) => ({
      challengeId,
      challengeTitle: this.getChallengeTitle(challengeId),
      weekNumber: this.extractWeekNumber(challengeId),
      totalAttempts: stats.totalAttempts,
      successfulAttempts: stats.successfulAttempts,
      successRate: stats.totalAttempts > 0 
        ? (stats.successfulAttempts / stats.totalAttempts) * 100 
        : 0,
      uniqueStudents: stats.students.size,
    }))
    .sort((a, b) => a.successRate - b.successRate); // Ordenar por dificuldade (menor taxa primeiro)
  }

  /**
   * Busca progresso de todos os alunos do cohort
   */
  static async getStudentsProgress(cohortId: string): Promise<StudentProgress[]> {
    const { data: students, error: studentsError } = await supabase
      .from('students')
      .select('id, name, email, total_xp')
      .eq('cohort_id', cohortId);

    if (studentsError) throw studentsError;

    const progressPromises = students?.map(async (student) => {
      // Buscar desafios completados
      const { data: challenges } = await supabase
        .from('challenge_submissions')
        .select('challenge_id, success')
        .eq('student_id', student.id)
        .eq('success', true);

      // Buscar projetos
      const { data: projects } = await supabase
        .from('project_submissions')
        .select('week_id, status')
        .eq('student_id', student.id);

      // Montar progresso semanal (semanas 1-12)
      const weeklyProgress = Array.from({ length: 12 }, (_, i) => {
        const weekNumber = i + 1;
        const weekId = `week-${weekNumber}`;
        
        const challengesInWeek = challenges?.filter(c => 
          c.challenge_id.startsWith(weekId)
        ).length || 0;

        const projectInWeek = projects?.find(p => p.week_id === weekId);
        const projectStatus = projectInWeek?.status || 'not_started';

        return {
          weekNumber,
          challengesCompleted: challengesInWeek,
          projectStatus: projectStatus as any,
        };
      });

      return {
        studentId: student.id,
        studentName: student.name,
        studentEmail: student.email,
        totalXP: student.total_xp || 0,
        completedChallenges: challenges?.length || 0,
        completedProjects: projects?.filter(p => p.status === 'approved').length || 0,
        weeklyProgress,
      };
    }) || [];

    return Promise.all(progressPromises);
  }

  /**
   * Busca alunos com dificuldades (muitas tentativas sem sucesso)
   */
  static async getStrugglingStudents(cohortId: string, minAttempts = 5): Promise<{
    studentId: string;
    studentName: string;
    challengeId: string;
    challengeTitle: string;
    attemptCount: number;
    hasSuccess: boolean;
  }[]> {
    const { data, error } = await supabase
      .from('challenge_submissions')
      .select(`
        student_id,
        challenge_id,
        success,
        students!inner(
          id,
          name,
          cohort_id
        )
      `)
      .eq('students.cohort_id', cohortId);

    if (error) throw error;

    // Agrupar por (student_id, challenge_id)
    const attempts = new Map<string, {
      studentId: string;
      studentName: string;
      challengeId: string;
      attemptCount: number;
      hasSuccess: boolean;
    }>();

    data?.forEach((submission: any) => {
      const key = `${submission.student_id}-${submission.challenge_id}`;
      const existing = attempts.get(key) || {
        studentId: submission.student_id,
        studentName: submission.students.name,
        challengeId: submission.challenge_id,
        attemptCount: 0,
        hasSuccess: false,
      };

      existing.attemptCount++;
      if (submission.success) existing.hasSuccess = true;

      attempts.set(key, existing);
    });

    // Filtrar: muitas tentativas SEM sucesso
    return Array.from(attempts.values())
      .filter(a => a.attemptCount >= minAttempts && !a.hasSuccess)
      .map(a => ({
        ...a,
        challengeTitle: this.getChallengeTitle(a.challengeId),
      }))
      .sort((a, b) => b.attemptCount - a.attemptCount);
  }

  /**
   * Extrai número da semana do ID
   */
  private static extractWeekNumber(id: string): number {
    const match = id.match(/week-(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Retorna título do desafio (placeholder - pode ser melhorado)
   */
  private static getChallengeTitle(challengeId: string): string {
    const parts = challengeId.split('-');
    if (parts.length >= 3) {
      return `Desafio ${parts[2]} - Semana ${parts[1]}`;
    }
    return challengeId;
  }
}
