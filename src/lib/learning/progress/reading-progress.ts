/**
 * Reading Progress Service
 *
 * Handles tracking student progress through lessons and sections.
 */

import { supabase } from '@/lib/supabase/client'

// ============================================================================
// TYPES
// ============================================================================

export interface ReadingProgress {
  id?: string
  student_id: string
  topic_slug: string
  lesson_id: string
  section_id?: string
  status: 'not_started' | 'in_progress' | 'completed'
  progress_percentage: number
  time_spent: number // seconds
  started_at: Date
  last_accessed_at: Date
  completed_at?: Date
  created_at?: Date
  updated_at?: Date
}

export interface ReadingProgressUpdate {
  status?: 'not_started' | 'in_progress' | 'completed'
  progress_percentage?: number
  time_spent?: number
  completed_at?: Date
}

export interface TopicStats {
  topic_slug: string
  total_lessons: number
  completed_lessons: number
  in_progress_lessons: number
  total_time_spent: number
  completion_percentage: number
}

// ============================================================================
// READING PROGRESS FUNCTIONS
// ============================================================================

/**
 * Track or update reading progress for a lesson/section
 */
export async function trackReadingProgress(
  studentId: string,
  topicSlug: string,
  lessonId: string,
  sectionId?: string,
  update?: ReadingProgressUpdate
): Promise<{ data: ReadingProgress | null; error: Error | null }> {
  try {
    // Check if progress already exists
    const { data: existing, error: fetchError } = await supabase
      .from('reading_progress')
      .select('*')
      .eq('student_id', studentId)
      .eq('topic_slug', topicSlug)
      .eq('lesson_id', lessonId)
      .eq('section_id', sectionId || null)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 = no rows returned (expected for new progress)
      throw fetchError
    }

    const now = new Date().toISOString()

    if (existing) {
      // Update existing progress
      const { data, error } = await supabase
        .from('reading_progress')
        .update({
          ...update,
          last_accessed_at: now,
          updated_at: now
        })
        .eq('id', existing.id)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } else {
      // Create new progress entry
      const { data, error } = await supabase
        .from('reading_progress')
        .insert({
          student_id: studentId,
          topic_slug: topicSlug,
          lesson_id: lessonId,
          section_id: sectionId,
          status: update?.status || 'in_progress',
          progress_percentage: update?.progress_percentage || 0,
          time_spent: update?.time_spent || 0,
          started_at: now,
          last_accessed_at: now,
          completed_at: update?.completed_at
        })
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    }
  } catch (error) {
    console.error('Error tracking reading progress:', error)
    return { data: null, error: error as Error }
  }
}

/**
 * Mark a lesson as completed
 */
export async function markLessonCompleted(
  studentId: string,
  topicSlug: string,
  lessonId: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await trackReadingProgress(
      studentId,
      topicSlug,
      lessonId,
      undefined,
      {
        status: 'completed',
        progress_percentage: 100,
        completed_at: new Date()
      }
    )

    if (error) throw error
    return { success: true, error: null }
  } catch (error) {
    console.error('Error marking lesson completed:', error)
    return { success: false, error: error as Error }
  }
}

/**
 * Update time spent on a lesson
 */
export async function updateTimeSpent(
  studentId: string,
  topicSlug: string,
  lessonId: string,
  additionalSeconds: number
): Promise<{ success: boolean; error: Error | null }> {
  try {
    // Get current progress
    const { data: current } = await supabase
      .from('reading_progress')
      .select('time_spent')
      .eq('student_id', studentId)
      .eq('topic_slug', topicSlug)
      .eq('lesson_id', lessonId)
      .eq('section_id', null)
      .single()

    const currentTime = current?.time_spent || 0
    const newTime = currentTime + additionalSeconds

    const { error } = await trackReadingProgress(
      studentId,
      topicSlug,
      lessonId,
      undefined,
      {
        time_spent: newTime
      }
    )

    if (error) throw error
    return { success: true, error: null }
  } catch (error) {
    console.error('Error updating time spent:', error)
    return { success: false, error: error as Error }
  }
}

/**
 * Get reading progress for a specific lesson
 */
export async function getReadingProgress(
  studentId: string,
  topicSlug: string,
  lessonId: string,
  sectionId?: string
): Promise<{ data: ReadingProgress | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('reading_progress')
      .select('*')
      .eq('student_id', studentId)
      .eq('topic_slug', topicSlug)
      .eq('lesson_id', lessonId)
      .eq('section_id', sectionId || null)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    return { data: data || null, error: null }
  } catch (error) {
    console.error('Error getting reading progress:', error)
    return { data: null, error: error as Error }
  }
}

/**
 * Get all reading progress for a topic
 */
export async function getTopicProgress(
  studentId: string,
  topicSlug: string
): Promise<{ data: ReadingProgress[]; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('reading_progress')
      .select('*')
      .eq('student_id', studentId)
      .eq('topic_slug', topicSlug)
      .order('last_accessed_at', { ascending: false })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('Error getting topic progress:', error)
    return { data: [], error: error as Error }
  }
}

/**
 * Get statistics for a topic
 */
export async function getTopicStats(
  studentId: string,
  topicSlug: string
): Promise<{ data: TopicStats | null; error: Error | null }> {
  try {
    const { data: progress, error } = await getTopicProgress(studentId, topicSlug)
    if (error) throw error

    const totalLessons = progress.length
    const completedLessons = progress.filter(p => p.status === 'completed').length
    const inProgressLessons = progress.filter(p => p.status === 'in_progress').length
    const totalTimeSpent = progress.reduce((sum, p) => sum + p.time_spent, 0)
    const completionPercentage = totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0

    return {
      data: {
        topic_slug: topicSlug,
        total_lessons: totalLessons,
        completed_lessons: completedLessons,
        in_progress_lessons: inProgressLessons,
        total_time_spent: totalTimeSpent,
        completion_percentage: completionPercentage
      },
      error: null
    }
  } catch (error) {
    console.error('Error getting topic stats:', error)
    return { data: null, error: error as Error }
  }
}

/**
 * Get recently accessed content
 */
export async function getRecentlyAccessed(
  studentId: string,
  limit: number = 5
): Promise<{ data: ReadingProgress[]; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('reading_progress')
      .select('*')
      .eq('student_id', studentId)
      .order('last_accessed_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('Error getting recently accessed:', error)
    return { data: [], error: error as Error }
  }
}

/**
 * Get all progress for a student (across all topics)
 */
export async function getAllProgress(
  studentId: string
): Promise<{ data: ReadingProgress[]; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('reading_progress')
      .select('*')
      .eq('student_id', studentId)
      .order('last_accessed_at', { ascending: false })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('Error getting all progress:', error)
    return { data: [], error: error as Error }
  }
}

/**
 * Format time spent in human-readable format
 */
export function formatTimeSpent(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes < 60) {
    return remainingSeconds > 0
      ? `${minutes}min ${remainingSeconds}s`
      : `${minutes}min`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return remainingMinutes > 0
    ? `${hours}h ${remainingMinutes}min`
    : `${hours}h`
}
