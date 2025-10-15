/**
 * Quiz Attempts Service
 *
 * Handles tracking quiz attempts, scores, and XP earned.
 */

import { supabase } from '@/lib/supabase/client'
import type { QuizAnswer } from '@/lib/learning/quizzes/types'

// ============================================================================
// TYPES
// ============================================================================

export interface QuizAttempt {
  id?: string
  student_id: string
  quiz_id: string
  topic_slug: string
  lesson_id: string
  attempt_number: number
  score: number
  max_score: number
  percentage: number
  passed: boolean
  xp_earned: number
  answers: QuizAnswer[] // Stored as JSONB
  time_spent?: number // seconds
  started_at?: Date
  completed_at: Date
  created_at?: Date
}

export interface QuizStats {
  total_quizzes_taken: number
  total_quizzes_passed: number
  average_score: number
  total_xp_earned: number
}

export interface QuizHistory {
  quiz_id: string
  attempts: QuizAttempt[]
  best_score: number
  best_percentage: number
  total_attempts: number
  passed: boolean
}

// ============================================================================
// QUIZ ATTEMPT FUNCTIONS
// ============================================================================

/**
 * Save a quiz attempt
 */
export async function saveQuizAttempt(
  studentId: string,
  quizId: string,
  topicSlug: string,
  lessonId: string,
  score: number,
  maxScore: number,
  percentage: number,
  passed: boolean,
  xpEarned: number,
  answers: QuizAnswer[],
  timeSpent?: number
): Promise<{ data: QuizAttempt | null; error: Error | null }> {
  try {
    // Get current attempt number
    const { data: previousAttempts } = await supabase
      .from('quiz_attempts')
      .select('attempt_number')
      .eq('student_id', studentId)
      .eq('quiz_id', quizId)
      .order('attempt_number', { ascending: false })
      .limit(1)

    const attemptNumber = previousAttempts && previousAttempts.length > 0
      ? previousAttempts[0].attempt_number + 1
      : 1

    // Insert new attempt
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        student_id: studentId,
        quiz_id: quizId,
        topic_slug: topicSlug,
        lesson_id: lessonId,
        attempt_number: attemptNumber,
        score,
        max_score: maxScore,
        percentage,
        passed,
        xp_earned: xpEarned,
        answers: answers as unknown as Record<string, unknown>, // Supabase handles JSONB
        time_spent: timeSpent,
        completed_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error saving quiz attempt:', error)
    return { data: null, error: error as Error }
  }
}

/**
 * Get all attempts for a specific quiz
 */
export async function getQuizAttempts(
  studentId: string,
  quizId: string
): Promise<{ data: QuizAttempt[]; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('student_id', studentId)
      .eq('quiz_id', quizId)
      .order('completed_at', { ascending: false })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('Error getting quiz attempts:', error)
    return { data: [], error: error as Error }
  }
}

/**
 * Get best attempt for a quiz
 */
export async function getBestQuizAttempt(
  studentId: string,
  quizId: string
): Promise<{ data: QuizAttempt | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('student_id', studentId)
      .eq('quiz_id', quizId)
      .order('percentage', { ascending: false })
      .order('completed_at', { ascending: true }) // If same percentage, prefer earlier attempt
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    return { data: data || null, error: null }
  } catch (error) {
    console.error('Error getting best quiz attempt:', error)
    return { data: null, error: error as Error }
  }
}

/**
 * Check if student has passed a quiz
 */
export async function hasPassedQuiz(
  studentId: string,
  quizId: string
): Promise<{ passed: boolean; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('passed')
      .eq('student_id', studentId)
      .eq('quiz_id', quizId)
      .eq('passed', true)
      .limit(1)

    if (error) throw error

    return { passed: (data && data.length > 0), error: null }
  } catch (error) {
    console.error('Error checking if quiz passed:', error)
    return { passed: false, error: error as Error }
  }
}

/**
 * Get quiz history (all attempts with stats)
 */
export async function getQuizHistory(
  studentId: string,
  quizId: string
): Promise<{ data: QuizHistory | null; error: Error | null }> {
  try {
    const { data: attempts, error } = await getQuizAttempts(studentId, quizId)
    if (error) throw error

    if (!attempts || attempts.length === 0) {
      return { data: null, error: null }
    }

    const bestAttempt = attempts.reduce((best, current) =>
      current.percentage > best.percentage ? current : best
    , attempts[0])

    return {
      data: {
        quiz_id: quizId,
        attempts,
        best_score: bestAttempt.score,
        best_percentage: bestAttempt.percentage,
        total_attempts: attempts.length,
        passed: attempts.some(a => a.passed)
      },
      error: null
    }
  } catch (error) {
    console.error('Error getting quiz history:', error)
    return { data: null, error: error as Error }
  }
}

/**
 * Get recent quiz attempts (across all quizzes)
 */
export async function getRecentQuizAttempts(
  studentId: string,
  limit: number = 10
): Promise<{ data: QuizAttempt[]; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('student_id', studentId)
      .order('completed_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('Error getting recent quiz attempts:', error)
    return { data: [], error: error as Error }
  }
}

/**
 * Get quiz statistics for a student
 */
export async function getQuizStats(
  studentId: string
): Promise<{ data: QuizStats | null; error: Error | null }> {
  try {
    // Get all attempts
    const { data: allAttempts, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('student_id', studentId)

    if (error) throw error

    if (!allAttempts || allAttempts.length === 0) {
      return {
        data: {
          total_quizzes_taken: 0,
          total_quizzes_passed: 0,
          average_score: 0,
          total_xp_earned: 0
        },
        error: null
      }
    }

    // Get unique quizzes (best attempt for each)
    const quizMap = new Map<string, QuizAttempt>()
    allAttempts.forEach(attempt => {
      const existing = quizMap.get(attempt.quiz_id)
      if (!existing || attempt.percentage > existing.percentage) {
        quizMap.set(attempt.quiz_id, attempt)
      }
    })

    const bestAttempts = Array.from(quizMap.values())

    const totalQuizzesTaken = bestAttempts.length
    const totalQuizzesPassed = bestAttempts.filter(a => a.passed).length
    const averageScore = bestAttempts.length > 0
      ? Math.round(bestAttempts.reduce((sum, a) => sum + a.percentage, 0) / bestAttempts.length)
      : 0
    const totalXpEarned = bestAttempts.reduce((sum, a) => sum + a.xp_earned, 0)

    return {
      data: {
        total_quizzes_taken: totalQuizzesTaken,
        total_quizzes_passed: totalQuizzesPassed,
        average_score: averageScore,
        total_xp_earned: totalXpEarned
      },
      error: null
    }
  } catch (error) {
    console.error('Error getting quiz stats:', error)
    return { data: null, error: error as Error }
  }
}

/**
 * Get quizzes by topic
 */
export async function getTopicQuizAttempts(
  studentId: string,
  topicSlug: string
): Promise<{ data: QuizAttempt[]; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('student_id', studentId)
      .eq('topic_slug', topicSlug)
      .order('completed_at', { ascending: false })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('Error getting topic quiz attempts:', error)
    return { data: [], error: error as Error }
  }
}

/**
 * Calculate XP for quiz attempt
 * Base: 20 XP
 * +2 XP per correct answer
 * +10 XP for perfect score
 * +20 XP for first-try perfect
 */
export function calculateQuizXP(
  score: number,
  maxScore: number,
  percentage: number,
  isFirstAttempt: boolean
): number {
  let xp = 20 // base XP

  // XP per correct answer (assuming each question is worth same points)
  const correctAnswers = score
  xp += correctAnswers * 2

  // Perfect score bonus
  if (percentage === 100) {
    xp += 10

    // First-try perfect bonus
    if (isFirstAttempt) {
      xp += 20
    }
  }

  return xp
}

/**
 * Format quiz score
 */
export function formatQuizScore(score: number, maxScore: number): string {
  return `${score}/${maxScore}`
}

/**
 * Get performance message based on percentage
 */
export function getPerformanceMessage(percentage: number): {
  title: string
  message: string
  emoji: string
} {
  if (percentage === 100) {
    return {
      title: 'Perfeito! 🎉',
      message: 'Você acertou todas as questões! Dominou completamente este conteúdo.',
      emoji: '🌟'
    }
  }

  if (percentage >= 90) {
    return {
      title: 'Excelente! 🚀',
      message: 'Quase perfeito! Você demonstrou ótimo entendimento do conteúdo.',
      emoji: '🔥'
    }
  }

  if (percentage >= 80) {
    return {
      title: 'Muito Bom! 👏',
      message: 'Você teve um ótimo desempenho. Continue assim!',
      emoji: '💪'
    }
  }

  if (percentage >= 70) {
    return {
      title: 'Bom trabalho! ✅',
      message: 'Você passou! Considere revisar os pontos que errou.',
      emoji: '👍'
    }
  }

  if (percentage >= 50) {
    return {
      title: 'Quase lá! 💪',
      message: 'Você está no caminho certo. Revise o conteúdo e tente novamente.',
      emoji: '📚'
    }
  }

  return {
    title: 'Continue tentando! 🎯',
    message: 'Não desista! Revise o conteúdo e tente novamente. Você consegue!',
    emoji: '💡'
  }
}
