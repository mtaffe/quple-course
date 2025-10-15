/**
 * Progress Tracking System - Type Definitions
 *
 * Types for tracking student reading progress, achievements, and XP.
 */

import { CategoryType } from '../types'

// ============================================================================
// READING PROGRESS TYPES
// ============================================================================

/**
 * Reading progress for a section
 */
export interface ReadingProgress {
  id?: string                             // Database ID (optional)
  studentId: string                       // Student UUID
  topicSlug: string                       // Topic slug: 'html-fundamentals'
  lessonId: string                        // Lesson ID: 'lesson-1'
  sectionId: string                       // Section ID: 'intro'
  completed: boolean                      // Whether section was completed
  timeSpent: number                       // Time spent reading (seconds)
  lastReadAt: Date                        // Last read timestamp
  createdAt: Date                         // First read timestamp
}

/**
 * Topic completion status
 */
export interface TopicProgress {
  topicSlug: string                       // Topic slug
  studentId: string                       // Student UUID
  totalSections: number                   // Total sections in topic
  completedSections: number               // Sections completed
  completionPercentage: number            // Percentage (0-100)
  timeSpent: number                       // Total time spent (seconds)
  quizzesPassed: number                   // Number of quizzes passed
  exercisesCompleted: number              // Number of exercises completed
  startedAt: Date                         // When topic was started
  completedAt?: Date                      // When topic was completed (optional)
}

/**
 * Lesson completion status
 */
export interface LessonProgress {
  lessonId: string                        // Lesson ID
  studentId: string                       // Student UUID
  totalSections: number                   // Total sections in lesson
  completedSections: number               // Sections completed
  completionPercentage: number            // Percentage (0-100)
  timeSpent: number                       // Total time spent (seconds)
  quizPassed: boolean                     // Whether quiz was passed
  startedAt: Date                         // When lesson was started
  completedAt?: Date                      // When lesson was completed (optional)
}

// ============================================================================
// ACHIEVEMENT TYPES
// ============================================================================

/**
 * Type of achievement criteria
 */
export type AchievementCriteriaType =
  | 'sections-read'                       // Read X sections
  | 'quizzes-passed'                      // Pass X quizzes
  | 'exercises-completed'                 // Complete X exercises
  | 'topic-completed'                     // Complete a topic
  | 'category-completed'                  // Complete all topics in category
  | 'perfect-quiz'                        // Get 100% on a quiz
  | 'perfect-exercise'                    // Complete exercise on first try
  | 'streak-days'                         // Maintain X day streak
  | 'time-spent'                          // Spend X minutes learning
  | 'custom'                              // Custom criteria

/**
 * Achievement criteria
 */
export interface AchievementCriteria {
  type: AchievementCriteriaType           // Criteria type
  threshold: number                       // Required amount
  category?: CategoryType                 // Optional category filter
  topicSlug?: string                      // Optional specific topic
  customCheck?: (studentProgress: StudentProgress) => boolean  // Custom validation
}

/**
 * An achievement/badge definition
 */
export interface Achievement {
  id: string                              // Unique ID: 'estudioso'
  title: string                           // Display title: 'Estudioso'
  description: string                     // Description: 'Leia 10 lições'
  icon: string                            // Emoji or icon: '📚'
  category: 'learning' | 'skill' | 'streak' | 'special'  // Achievement category
  xpReward: number                        // XP reward for earning
  criteria: AchievementCriteria           // How to earn it
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'  // Optional rarity
  secret?: boolean                        // Whether achievement is hidden
}

/**
 * Student's earned achievement
 */
export interface EarnedAchievement {
  achievementId: string                   // Achievement ID
  studentId: string                       // Student UUID
  earnedAt: Date                          // When it was earned
  progress?: number                       // Progress towards achievement (0-100)
  notified?: boolean                      // Whether student was notified
}

// ============================================================================
// XP AND LEVEL TYPES
// ============================================================================

/**
 * XP breakdown for an activity
 */
export interface XPBreakdown {
  baseXP: number                          // Base XP for activity
  bonuses: XPBonus[]                      // Array of bonuses applied
  penalties: XPPenalty[]                  // Array of penalties applied
  totalXP: number                         // Final XP earned
}

/**
 * XP bonus
 */
export interface XPBonus {
  type: 'streak' | 'perfect-score' | 'first-try' | 'speed' | 'custom'
  amount: number                          // Bonus amount
  reason: string                          // Human-readable reason
}

/**
 * XP penalty
 */
export interface XPPenalty {
  type: 'multiple-attempts' | 'hints-used' | 'slow' | 'custom'
  amount: number                          // Penalty amount (positive number)
  reason: string                          // Human-readable reason
}

/**
 * Level system
 */
export interface LevelInfo {
  level: number                           // Current level
  currentXP: number                       // XP in current level
  xpForNextLevel: number                  // XP needed for next level
  totalXP: number                         // Total XP ever earned
  percentage: number                      // Progress to next level (0-100)
}

// ============================================================================
// STUDENT OVERALL PROGRESS
// ============================================================================

/**
 * Complete student progress overview
 */
export interface StudentProgress {
  studentId: string                       // Student UUID

  // Reading stats
  totalSectionsRead: number               // Total sections read
  totalLessonsCompleted: number           // Total lessons completed
  totalTopicsCompleted: number            // Total topics completed
  readingXP: number                       // XP from reading
  totalReadingTime: number                // Total time reading (seconds)

  // Quiz stats
  totalQuizzesPassed: number              // Total quizzes passed
  totalQuizAttempts: number               // Total quiz attempts
  averageQuizScore: number                // Average quiz score (0-100)
  quizXP: number                          // XP from quizzes

  // Exercise stats
  totalExercisesCompleted: number         // Total exercises completed
  totalExerciseAttempts: number           // Total exercise attempts
  averageExerciseScore: number            // Average exercise score (0-100)
  exerciseXP: number                      // XP from exercises

  // Achievements
  earnedAchievements: string[]            // Array of achievement IDs
  achievementXP: number                   // XP from achievements

  // Overall
  totalXP: number                         // Total XP (reading + quiz + exercise + achievements)
  level: number                           // Current level
  streakDays: number                      // Current streak
  lastActiveDate: Date                    // Last activity date

  // Progress by category
  progressByCategory: Record<CategoryType, CategoryProgress>
}

/**
 * Progress within a specific category
 */
export interface CategoryProgress {
  category: CategoryType                  // Category
  topicsCompleted: number                 // Topics completed in category
  totalTopics: number                     // Total topics in category
  sectionsRead: number                    // Sections read in category
  quizzesPassed: number                   // Quizzes passed in category
  exercisesCompleted: number              // Exercises completed in category
  xpEarned: number                        // XP earned in category
  timeSpent: number                       // Time spent in category (seconds)
}

// ============================================================================
// TRACKING FUNCTIONS (to be implemented)
// ============================================================================

/**
 * Options for marking section as read
 */
export interface MarkSectionReadOptions {
  studentId: string
  topicSlug: string
  lessonId: string
  sectionId: string
  timeSpent: number                       // Seconds spent
}

/**
 * Result of marking section as read
 */
export interface MarkSectionReadResult {
  progress: ReadingProgress               // Updated progress
  xpEarned: number                        // XP earned
  newAchievements: Achievement[]          // Newly unlocked achievements
  levelUp: boolean                        // Whether student leveled up
  newLevel?: number                       // New level (if leveled up)
}
