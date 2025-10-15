import { supabase } from './client';
import { StudentWeekProgress } from '@/types/weekly-modules';

interface SupabaseWeekProgressRow {
  student_id: string;
  week_id: string;
  status: string;
  started_at?: string;
  completed_at?: string;
  theory_progress: {
    sectionsCompleted: string[];
    readingTime: number;
  };
  challenges_progress: Array<{
    challengeId: string;
    status: string;
    attempts: number;
    xpEarned: number;
    completedAt?: string;
  }>;
  project_progress: {
    status: string;
    submittedAt?: string;
    feedbackFromMentor?: string;
    grade?: string;
    repositoryUrl?: string;
    liveUrl?: string;
  };
  pre_class_checklist_completed: boolean;
  ready_for_live_class: boolean;
  total_xp_earned: number;
  total_time_spent: number;
}

export class WeeklyProgressService {
  static async getStudentProgress(studentId: string, weekId: string): Promise<StudentWeekProgress | null> {
    const { data, error } = await supabase
      .from('student_week_progress')
      .select('*')
      .eq('student_id', studentId)
      .eq('week_id', weekId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data ? this.mapToStudentWeekProgress(data) : null;
  }

  static async getAllStudentProgress(studentId: string): Promise<StudentWeekProgress[]> {
    const { data, error } = await supabase
      .from('student_week_progress')
      .select('*')
      .eq('student_id', studentId)
      .order('week_id', { ascending: true });

    if (error) throw error;

    return data?.map(this.mapToStudentWeekProgress) || [];
  }

  static async initializeWeekProgress(studentId: string, weekId: string): Promise<StudentWeekProgress> {
    const initialProgress: Partial<StudentWeekProgress> = {
      studentId,
      weekId,
      status: 'in_progress',
      startedAt: new Date(),
      theoryProgress: {
        sectionsCompleted: [],
        readingTime: 0
      },
      challengesProgress: [],
      projectProgress: {
        status: 'not_started'
      },
      preClassChecklistCompleted: false,
      readyForLiveClass: false,
      totalXPEarned: 0,
      totalTimeSpent: 0
    };

    const { data, error } = await supabase
      .from('student_week_progress')
      .insert({
        student_id: studentId,
        week_id: weekId,
        status: initialProgress.status,
        started_at: initialProgress.startedAt,
        theory_progress: initialProgress.theoryProgress,
        challenges_progress: initialProgress.challengesProgress,
        project_progress: initialProgress.projectProgress,
        pre_class_checklist_completed: initialProgress.preClassChecklistCompleted,
        ready_for_live_class: initialProgress.readyForLiveClass,
        total_xp_earned: initialProgress.totalXPEarned,
        total_time_spent: initialProgress.totalTimeSpent
      })
      .select()
      .single();

    if (error) throw error;

    return this.mapToStudentWeekProgress(data);
  }

  static async updateTheoryProgress(
    studentId: string,
    weekId: string,
    sectionId: string,
    readingTime: number
  ): Promise<void> {
    const progress = await this.getStudentProgress(studentId, weekId);
    if (!progress) {
      await this.initializeWeekProgress(studentId, weekId);
      return this.updateTheoryProgress(studentId, weekId, sectionId, readingTime);
    }

    const sectionsCompleted = progress.theoryProgress.sectionsCompleted.includes(sectionId)
      ? progress.theoryProgress.sectionsCompleted
      : [...progress.theoryProgress.sectionsCompleted, sectionId];

    const { error } = await supabase
      .from('student_week_progress')
      .update({
        theory_progress: {
          sectionsCompleted,
          readingTime: progress.theoryProgress.readingTime + readingTime
        },
        total_time_spent: progress.totalTimeSpent + readingTime
      })
      .eq('student_id', studentId)
      .eq('week_id', weekId);

    if (error) throw error;
  }

  static async updateChallengeProgress(
    studentId: string,
    weekId: string,
    challengeId: string,
    status: 'not_started' | 'in_progress' | 'completed',
    xpEarned: number = 0
  ): Promise<void> {
    const progress = await this.getStudentProgress(studentId, weekId);
    if (!progress) {
      await this.initializeWeekProgress(studentId, weekId);
      return this.updateChallengeProgress(studentId, weekId, challengeId, status, xpEarned);
    }

    const existingChallengeIndex = progress.challengesProgress.findIndex(
      c => c.challengeId === challengeId
    );

    let updatedChallenges;
    let xpToAdd = 0;
    
    if (existingChallengeIndex >= 0) {
      const existingChallenge = progress.challengesProgress[existingChallengeIndex];
      const wasCompleted = existingChallenge.status === 'completed';
      const isNowCompleted = status === 'completed';
      
      if (wasCompleted && isNowCompleted) {
        return;
      }
      
      updatedChallenges = [...progress.challengesProgress];
      updatedChallenges[existingChallengeIndex] = {
        ...existingChallenge,
        status,
        attempts: status === 'completed' || status === 'in_progress' 
          ? existingChallenge.attempts + 1 
          : existingChallenge.attempts,
        xpEarned: isNowCompleted ? xpEarned : existingChallenge.xpEarned,
        completedAt: isNowCompleted ? new Date() : existingChallenge.completedAt
      };
      
      if (!wasCompleted && isNowCompleted) {
        xpToAdd = xpEarned;
      }
    } else {
      updatedChallenges = [
        ...progress.challengesProgress,
        {
          challengeId,
          status,
          attempts: 1,
          xpEarned: status === 'completed' ? xpEarned : 0,
          completedAt: status === 'completed' ? new Date() : undefined
        }
      ];
      
      if (status === 'completed') {
        xpToAdd = xpEarned;
      }
    }

    const { error } = await supabase
      .from('student_week_progress')
      .update({
        challenges_progress: updatedChallenges,
        total_xp_earned: progress.totalXPEarned + xpToAdd
      })
      .eq('student_id', studentId)
      .eq('week_id', weekId);

    if (error) throw error;
  }

  static async updateProjectProgress(
    studentId: string,
    weekId: string,
    status: 'not_started' | 'in_progress' | 'submitted' | 'approved',
    data?: {
      repositoryUrl?: string;
      liveUrl?: string;
      feedbackFromMentor?: string;
      grade?: 'excellent' | 'good' | 'needs_improvement';
    }
  ): Promise<void> {
    const progress = await this.getStudentProgress(studentId, weekId);
    if (!progress) {
      await this.initializeWeekProgress(studentId, weekId);
      return this.updateProjectProgress(studentId, weekId, status, data);
    }

    const { error } = await supabase
      .from('student_week_progress')
      .update({
        project_progress: {
          status,
          submittedAt: status === 'submitted' || status === 'approved' ? new Date() : undefined,
          ...data
        }
      })
      .eq('student_id', studentId)
      .eq('week_id', weekId);

    if (error) throw error;
  }

  static async markChecklistComplete(studentId: string, weekId: string): Promise<void> {
    const { error } = await supabase
      .from('student_week_progress')
      .update({
        pre_class_checklist_completed: true,
        ready_for_live_class: true
      })
      .eq('student_id', studentId)
      .eq('week_id', weekId);

    if (error) throw error;
  }

  static async completeWeek(studentId: string, weekId: string): Promise<void> {
    const { error } = await supabase
      .from('student_week_progress')
      .update({
        status: 'completed',
        completed_at: new Date()
      })
      .eq('student_id', studentId)
      .eq('week_id', weekId);

    if (error) throw error;
  }

  private static mapToStudentWeekProgress(data: SupabaseWeekProgressRow): StudentWeekProgress {
    return {
      studentId: data.student_id,
      weekId: data.week_id,
      status: data.status as StudentWeekProgress['status'],
      startedAt: data.started_at ? new Date(data.started_at) : undefined,
      completedAt: data.completed_at ? new Date(data.completed_at) : undefined,
      theoryProgress: data.theory_progress || { sectionsCompleted: [], readingTime: 0 },
      challengesProgress: (data.challenges_progress || []).map(c => ({
        ...c,
        status: c.status as 'not_started' | 'in_progress' | 'completed',
        completedAt: c.completedAt ? new Date(c.completedAt) : undefined
      })),
      projectProgress: {
        ...data.project_progress,
        status: (data.project_progress?.status || 'not_started') as 'not_started' | 'in_progress' | 'submitted' | 'approved',
        submittedAt: data.project_progress?.submittedAt ? new Date(data.project_progress.submittedAt) : undefined,
        grade: data.project_progress?.grade as 'excellent' | 'good' | 'needs_improvement' | undefined
      },
      preClassChecklistCompleted: data.pre_class_checklist_completed || false,
      readyForLiveClass: data.ready_for_live_class || false,
      totalXPEarned: data.total_xp_earned || 0,
      totalTimeSpent: data.total_time_spent || 0
    };
  }
}
