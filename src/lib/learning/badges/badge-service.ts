/**
 * Badge Service
 *
 * Service for checking and unlocking badges based on student progress
 */

import { supabase } from '@/lib/supabase/client'
import { ALL_LEARNING_BADGES, getBadgeById, type Badge } from './learning-badges'
import type { ReadingProgress } from '../progress/reading-progress'
import type { QuizAttempt } from '../progress/quiz-attempts'

// ============================================================================
// TYPES
// ============================================================================

export interface BadgeUnlock {
  badge: Badge
  unlockedAt: Date
  isNew: boolean // true if this is the first time unlocking
}

// ============================================================================
// BADGE CHECKING FUNCTIONS
// ============================================================================

/**
 * Check and unlock badges for a student after completing a quiz
 */
export async function checkQuizBadges(
  studentId: string,
  quizId: string,
  percentage: number,
  isFirstAttempt: boolean
): Promise<BadgeUnlock[]> {
  const unlockedBadges: BadgeUnlock[] = []

  try {
    // Get student's current badges
    const { data: student } = await supabase
      .from('students')
      .select('badges')
      .eq('id', studentId)
      .single()

    const currentBadges = student?.badges || []

    // Get all quiz attempts
    const { data: attempts } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('student_id', studentId)

    if (!attempts) return []

    // Check for quiz perfect badges
    if (percentage === 100) {
      const perfectBadge = await checkAndUnlockBadge(
        studentId,
        'quiz-perfectionist',
        currentBadges
      )
      if (perfectBadge) unlockedBadges.push(perfectBadge)

      // Count unique quizzes with 100%
      const perfectQuizzes = new Set(
        attempts.filter(a => a.percentage === 100).map(a => a.quiz_id)
      )

      if (perfectQuizzes.size >= 5) {
        const badge5 = await checkAndUnlockBadge(
          studentId,
          'quiz-master-5',
          currentBadges
        )
        if (badge5) unlockedBadges.push(badge5)
      }

      if (perfectQuizzes.size >= 10) {
        const badge10 = await checkAndUnlockBadge(
          studentId,
          'quiz-master-10',
          currentBadges
        )
        if (badge10) unlockedBadges.push(badge10)
      }
    }

    // Check for quiz completion badges
    const passedQuizzes = new Set(
      attempts.filter(a => a.passed).map(a => a.quiz_id)
    )

    if (passedQuizzes.size >= 5) {
      const completer = await checkAndUnlockBadge(
        studentId,
        'quiz-completer',
        currentBadges
      )
      if (completer) unlockedBadges.push(completer)
    }

    // Save newly unlocked badges
    if (unlockedBadges.length > 0) {
      await saveBadges(studentId, unlockedBadges.map(u => u.badge.id))
    }

    return unlockedBadges
  } catch (error) {
    console.error('Error checking quiz badges:', error)
    return []
  }
}

/**
 * Check and unlock badges for a student after completing a lesson
 */
export async function checkLessonBadges(
  studentId: string,
  topicSlug: string,
  lessonId: string
): Promise<BadgeUnlock[]> {
  const unlockedBadges: BadgeUnlock[] = []

  try {
    // Get student's current badges
    const { data: student } = await supabase
      .from('students')
      .select('badges')
      .eq('id', studentId)
      .single()

    const currentBadges = student?.badges || []

    // Get all reading progress
    const { data: allProgress } = await supabase
      .from('reading_progress')
      .select('*')
      .eq('student_id', studentId)

    if (!allProgress) return []

    // Count completed lessons
    const completedLessons = allProgress.filter(
      p => p.status === 'completed'
    ).length

    // Check lesson milestone badges
    if (completedLessons >= 1) {
      const first = await checkAndUnlockBadge(
        studentId,
        'first-lesson',
        currentBadges
      )
      if (first) unlockedBadges.push(first)
    }

    if (completedLessons >= 5) {
      const five = await checkAndUnlockBadge(
        studentId,
        'lessons-5',
        currentBadges
      )
      if (five) unlockedBadges.push(five)
    }

    if (completedLessons >= 10) {
      const ten = await checkAndUnlockBadge(
        studentId,
        'lessons-10',
        currentBadges
      )
      if (ten) unlockedBadges.push(ten)
    }

    if (completedLessons >= 20) {
      const twenty = await checkAndUnlockBadge(
        studentId,
        'lessons-20',
        currentBadges
      )
      if (twenty) unlockedBadges.push(twenty)
    }

    // Check topic completion badges
    const topicProgress = allProgress.filter(p => p.topic_slug === topicSlug)
    const topicCompleted = topicProgress.every(p => p.status === 'completed')

    if (topicCompleted) {
      const badgeId = `${topicSlug}-complete`
      const topicBadge = await checkAndUnlockBadge(
        studentId,
        badgeId,
        currentBadges
      )
      if (topicBadge) unlockedBadges.push(topicBadge)
    }

    // Check time spent badges
    const totalTimeSpent = allProgress.reduce((sum, p) => sum + p.time_spent, 0)

    if (totalTimeSpent >= 3600) { // 1 hour
      const hour1 = await checkAndUnlockBadge(
        studentId,
        'time-spent-1h',
        currentBadges
      )
      if (hour1) unlockedBadges.push(hour1)
    }

    if (totalTimeSpent >= 18000) { // 5 hours
      const hour5 = await checkAndUnlockBadge(
        studentId,
        'time-spent-5h',
        currentBadges
      )
      if (hour5) unlockedBadges.push(hour5)
    }

    if (totalTimeSpent >= 36000) { // 10 hours
      const hour10 = await checkAndUnlockBadge(
        studentId,
        'time-spent-10h',
        currentBadges
      )
      if (hour10) unlockedBadges.push(hour10)
    }

    // Save newly unlocked badges
    if (unlockedBadges.length > 0) {
      await saveBadges(studentId, unlockedBadges.map(u => u.badge.id))
    }

    return unlockedBadges
  } catch (error) {
    console.error('Error checking lesson badges:', error)
    return []
  }
}

/**
 * Check and unlock streak badges
 */
export async function checkStreakBadges(
  studentId: string,
  streakDays: number
): Promise<BadgeUnlock[]> {
  const unlockedBadges: BadgeUnlock[] = []

  try {
    // Get student's current badges
    const { data: student } = await supabase
      .from('students')
      .select('badges')
      .eq('id', studentId)
      .single()

    const currentBadges = student?.badges || []

    // Check streak badges
    if (streakDays >= 3) {
      const streak3 = await checkAndUnlockBadge(
        studentId,
        'streak-3',
        currentBadges
      )
      if (streak3) unlockedBadges.push(streak3)
    }

    if (streakDays >= 7) {
      const streak7 = await checkAndUnlockBadge(
        studentId,
        'streak-7',
        currentBadges
      )
      if (streak7) unlockedBadges.push(streak7)
    }

    if (streakDays >= 14) {
      const streak14 = await checkAndUnlockBadge(
        studentId,
        'streak-14',
        currentBadges
      )
      if (streak14) unlockedBadges.push(streak14)
    }

    if (streakDays >= 30) {
      const streak30 = await checkAndUnlockBadge(
        studentId,
        'streak-30',
        currentBadges
      )
      if (streak30) unlockedBadges.push(streak30)
    }

    // Save newly unlocked badges
    if (unlockedBadges.length > 0) {
      await saveBadges(studentId, unlockedBadges.map(u => u.badge.id))
    }

    return unlockedBadges
  } catch (error) {
    console.error('Error checking streak badges:', error)
    return []
  }
}

/**
 * Check all badges for a student (comprehensive check)
 */
export async function checkAllBadges(
  studentId: string
): Promise<BadgeUnlock[]> {
  const allUnlocked: BadgeUnlock[] = []

  try {
    // Get student data
    const { data: student } = await supabase
      .from('students')
      .select('*')
      .eq('id', studentId)
      .single()

    if (!student) return []

    // Check lesson badges
    const lessonBadges = await checkLessonBadges(studentId, '', '')
    allUnlocked.push(...lessonBadges)

    // Check quiz badges
    const { data: attempts } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('student_id', studentId)
      .order('completed_at', { ascending: false })
      .limit(1)

    if (attempts && attempts.length > 0) {
      const lastAttempt = attempts[0]
      const quizBadges = await checkQuizBadges(
        studentId,
        lastAttempt.quiz_id,
        lastAttempt.percentage,
        lastAttempt.attempt_number === 1
      )
      allUnlocked.push(...quizBadges)
    }

    // Check streak badges
    const streakBadges = await checkStreakBadges(studentId, student.streak_days)
    allUnlocked.push(...streakBadges)

    return allUnlocked
  } catch (error) {
    console.error('Error checking all badges:', error)
    return []
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if a badge should be unlocked and return it if new
 */
async function checkAndUnlockBadge(
  studentId: string,
  badgeId: string,
  currentBadges: string[]
): Promise<BadgeUnlock | null> {
  // Check if badge already unlocked
  if (currentBadges.includes(badgeId)) {
    return null
  }

  // Get badge definition
  const badge = getBadgeById(badgeId)
  if (!badge) return null

  return {
    badge,
    unlockedAt: new Date(),
    isNew: true
  }
}

/**
 * Save badges to student record and award XP
 */
async function saveBadges(
  studentId: string,
  newBadgeIds: string[]
): Promise<void> {
  try {
    // Get current student data
    const { data: student } = await supabase
      .from('students')
      .select('badges, total_xp')
      .eq('id', studentId)
      .single()

    if (!student) return

    const currentBadges = student.badges || []
    const updatedBadges = [...new Set([...currentBadges, ...newBadgeIds])]

    // Calculate XP from new badges
    const xpToAdd = newBadgeIds.reduce((total, badgeId) => {
      const badge = getBadgeById(badgeId)
      return total + (badge?.xpReward || 0)
    }, 0)

    // Update student
    await supabase
      .from('students')
      .update({
        badges: updatedBadges,
        total_xp: student.total_xp + xpToAdd,
        updated_at: new Date().toISOString()
      })
      .eq('id', studentId)
  } catch (error) {
    console.error('Error saving badges:', error)
  }
}

/**
 * Get student's unlocked badges with full details
 */
export async function getStudentBadges(
  studentId: string
): Promise<Badge[]> {
  try {
    const { data: student } = await supabase
      .from('students')
      .select('badges')
      .eq('id', studentId)
      .single()

    if (!student || !student.badges) return []

    return student.badges
      .map((badgeId: string) => getBadgeById(badgeId))
      .filter((badge: Badge | undefined): badge is Badge => badge !== undefined)
  } catch (error) {
    console.error('Error getting student badges:', error)
    return []
  }
}

/**
 * Get badges grouped by category
 */
export function groupBadgesByCategory(badges: Badge[]) {
  return {
    learning: badges.filter(b => b.category === 'learning'),
    quiz: badges.filter(b => b.category === 'quiz'),
    achievement: badges.filter(b => b.category === 'achievement'),
    streak: badges.filter(b => b.category === 'streak')
  }
}

/**
 * Get badge progress (how close to unlocking)
 */
export async function getBadgeProgress(
  studentId: string,
  badgeId: string
): Promise<{
  badge: Badge
  current: number
  target: number
  percentage: number
  unlocked: boolean
} | null> {
  const badge = getBadgeById(badgeId)
  if (!badge) return null

  try {
    // Check if already unlocked
    const { data: student } = await supabase
      .from('students')
      .select('badges')
      .eq('id', studentId)
      .single()

    const unlocked = student?.badges?.includes(badgeId) || false

    if (unlocked) {
      return {
        badge,
        current: badge.unlockedBy.value || 1,
        target: badge.unlockedBy.value || 1,
        percentage: 100,
        unlocked: true
      }
    }

    // Calculate progress based on badge type
    let current = 0
    const target = badge.unlockedBy.value || 1

    switch (badge.unlockedBy.type) {
      case 'lessons_completed':
        const { data: progress } = await supabase
          .from('reading_progress')
          .select('status')
          .eq('student_id', studentId)
          .eq('status', 'completed')

        current = progress?.length || 0
        break

      case 'quiz_passed':
        const { data: attempts } = await supabase
          .from('quiz_attempts')
          .select('quiz_id, passed')
          .eq('student_id', studentId)
          .eq('passed', true)

        const uniqueQuizzes = new Set(attempts?.map(a => a.quiz_id))
        current = uniqueQuizzes.size
        break

      case 'quiz_perfect':
        const { data: perfectAttempts } = await supabase
          .from('quiz_attempts')
          .select('quiz_id, percentage')
          .eq('student_id', studentId)
          .eq('percentage', 100)

        const uniquePerfect = new Set(perfectAttempts?.map(a => a.quiz_id))
        current = uniquePerfect.size
        break

      case 'time_spent':
        const { data: allProgress } = await supabase
          .from('reading_progress')
          .select('time_spent')
          .eq('student_id', studentId)

        current = allProgress?.reduce((sum, p) => sum + p.time_spent, 0) || 0
        break

      case 'streak_days':
        const { data: studentData } = await supabase
          .from('students')
          .select('streak_days')
          .eq('id', studentId)
          .single()

        current = studentData?.streak_days || 0
        break
    }

    const percentage = Math.min(Math.round((current / target) * 100), 100)

    return {
      badge,
      current,
      target,
      percentage,
      unlocked: false
    }
  } catch (error) {
    console.error('Error getting badge progress:', error)
    return null
  }
}
