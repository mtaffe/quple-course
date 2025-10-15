/**
 * Exercise System - Type Definitions
 *
 * Types for the inline practical exercise system with code validation.
 */

// ============================================================================
// EXERCISE TYPES
// ============================================================================

/**
 * Programming language for the exercise
 */
export type ExerciseLanguage = 'html' | 'css' | 'javascript'

/**
 * Validation feedback type
 */
export type ValidationFeedbackType = 'success' | 'error' | 'warning' | 'info'

/**
 * An inline practical exercise
 */
export interface Exercise {
  id: string                              // Unique ID: 'html-ex-1'
  title: string                           // Exercise title
  description: string                     // Exercise description (what to do)
  language: ExerciseLanguage              // Programming language
  starterCode: string                     // Initial code provided
  solution: string                        // Expected solution (for reference)
  validation: ValidationCriteria          // Validation criteria
  hints: string[]                         // Array of progressive hints
  estimatedTime: number                   // Estimated time in minutes
  difficulty?: 'easy' | 'medium' | 'hard' // Optional difficulty
  relatedConcepts?: string[]              // Related concepts/topics
}

/**
 * Validation criteria for an exercise
 */
export interface ValidationCriteria {
  requiredElements?: string[]             // Required HTML elements: ['html', 'head', 'body']
  requiredAttributes?: Record<string, string[]>  // Required attributes: {html: ['lang'], img: ['alt']}
  forbiddenElements?: string[]            // Forbidden HTML elements
  requiredCSSProperties?: string[]        // Required CSS properties: ['color', 'font-size']
  forbiddenCSSProperties?: string[]       // Forbidden CSS properties
  minLines?: number                       // Minimum number of lines
  maxLines?: number                       // Maximum number of lines
  requiredPatterns?: RegExp[]             // Required regex patterns
  forbiddenPatterns?: RegExp[]            // Forbidden regex patterns
  customValidation?: (code: string) => ValidationResult  // Custom validation function
}

/**
 * Result of code validation
 */
export interface ValidationResult {
  passed: boolean                         // Whether validation passed
  score: number                           // Score (0-100)
  feedback: ValidationFeedback[]          // Detailed feedback
  xpEarned: number                        // XP earned (0 if not passed)
  suggestions?: string[]                  // Suggestions for improvement
}

/**
 * Feedback item from validation
 */
export interface ValidationFeedback {
  type: ValidationFeedbackType            // Feedback type
  message: string                         // Feedback message
  line?: number                           // Optional line number
  column?: number                         // Optional column number
  code?: string                           // Optional code snippet
  severity?: 'low' | 'medium' | 'high'    // Severity level
}

/**
 * Exercise submission by a student
 */
export interface ExerciseSubmission {
  id?: string                             // Database ID (optional)
  exerciseId: string                      // Exercise ID
  studentId: string                       // Student UUID
  code: string                            // Submitted code
  passed: boolean                         // Whether validation passed
  score: number                           // Score obtained (0-100)
  attempts: number                        // Number of attempts
  hintsUsed: number                       // Number of hints used
  xpEarned: number                        // XP earned
  timeSpent?: number                      // Time spent (seconds)
  completedAt?: Date                      // Completion timestamp (null if not passed)
  createdAt: Date                         // First attempt timestamp
  feedback?: ValidationFeedback[]         // Last validation feedback
}

/**
 * Exercise progress for a student
 */
export interface ExerciseProgress {
  exerciseId: string                      // Exercise ID
  studentId: string                       // Student UUID
  started: boolean                        // Whether exercise was started
  completed: boolean                      // Whether exercise was completed
  attempts: number                        // Number of attempts
  bestScore: number                       // Best score achieved
  hintsUsed: number                       // Total hints used
  totalTime: number                       // Total time spent (seconds)
  lastAttemptAt: Date                     // Last attempt timestamp
}

// ============================================================================
// EXERCISE STATISTICS
// ============================================================================

/**
 * Statistics for a specific exercise
 */
export interface ExerciseStatistics {
  exerciseId: string                      // Exercise ID
  totalAttempts: number                   // Total attempts by all students
  completionRate: number                  // Percentage of students who completed
  averageAttempts: number                 // Average number of attempts to complete
  averageTime: number                     // Average time to complete (seconds)
  averageHintsUsed: number                // Average hints used
  averageScore: number                    // Average final score
}
