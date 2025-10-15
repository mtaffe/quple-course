import { supabase } from './client';

export interface Cohort {
  id: string;
  cohortName: string;
  startDate: Date;
  endDate: Date;
  mentorId: string;
  maxStudents: number;
  timezone: string;
  language: string;
  currentStudentCount?: number;
  availableSpots?: number;
}

export interface CohortStudent {
  id: string;
  cohortId: string;
  studentId: string;
  joinedAt: Date;
}

export class CohortService {
  static async getCohort(cohortId: string): Promise<Cohort | null> {
    const { data, error } = await supabase
      .from('cohorts')
      .select('*')
      .eq('id', cohortId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    const availableSpots = await this.getAvailableSpots(cohortId);
    
    return {
      id: data.id,
      cohortName: data.cohort_name,
      startDate: new Date(data.start_date),
      endDate: new Date(data.end_date),
      mentorId: data.mentor_id,
      maxStudents: data.max_students,
      timezone: data.timezone,
      language: data.language,
      availableSpots
    };
  }

  static async getAvailableSpots(cohortId: string): Promise<number> {
    const { data, error } = await supabase
      .rpc('get_cohort_available_spots', { cohort_uuid: cohortId });

    if (error) throw error;
    return data || 0;
  }

  static async addStudentToCohort(cohortId: string, studentId: string): Promise<CohortStudent> {
    const availableSpots = await this.getAvailableSpots(cohortId);
    
    if (availableSpots <= 0) {
      throw new Error('This cohort is full. Maximum 5 students allowed per cohort.');
    }

    const { data, error } = await supabase
      .from('cohort_students')
      .insert({
        cohort_id: cohortId,
        student_id: studentId
      })
      .select()
      .single();

    if (error) {
      if (error.message.includes('Cohort is full')) {
        throw new Error('This cohort is full. Maximum 5 students allowed per cohort.');
      }
      throw error;
    }

    return {
      id: data.id,
      cohortId: data.cohort_id,
      studentId: data.student_id,
      joinedAt: new Date(data.joined_at)
    };
  }

  static async getCohortStudents(cohortId: string): Promise<CohortStudent[]> {
    const { data, error } = await supabase
      .from('cohort_students')
      .select('*')
      .eq('cohort_id', cohortId)
      .order('joined_at', { ascending: true });

    if (error) throw error;

    return data?.map(row => ({
      id: row.id,
      cohortId: row.cohort_id,
      studentId: row.student_id,
      joinedAt: new Date(row.joined_at)
    })) || [];
  }

  static async getStudentCohorts(studentId: string): Promise<Cohort[]> {
    const { data, error } = await supabase
      .from('cohort_students')
      .select(`
        cohort_id,
        cohorts (*)
      `)
      .eq('student_id', studentId);

    if (error) throw error;

    const cohorts: Cohort[] = [];
    
    for (const row of data || []) {
      if (row.cohorts) {
        const cohortData = Array.isArray(row.cohorts) ? row.cohorts[0] : row.cohorts;
        const availableSpots = await this.getAvailableSpots(cohortData.id);
        
        cohorts.push({
          id: cohortData.id,
          cohortName: cohortData.cohort_name,
          startDate: new Date(cohortData.start_date),
          endDate: new Date(cohortData.end_date),
          mentorId: cohortData.mentor_id,
          maxStudents: cohortData.max_students,
          timezone: cohortData.timezone,
          language: cohortData.language,
          availableSpots
        });
      }
    }

    return cohorts;
  }

  static async removeStudentFromCohort(cohortId: string, studentId: string): Promise<void> {
    const { error } = await supabase
      .from('cohort_students')
      .delete()
      .eq('cohort_id', cohortId)
      .eq('student_id', studentId);

    if (error) throw error;
  }

  static async isCohortFull(cohortId: string): Promise<boolean> {
    const availableSpots = await this.getAvailableSpots(cohortId);
    return availableSpots <= 0;
  }
}
