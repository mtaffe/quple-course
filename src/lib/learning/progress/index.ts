/**
 * Progress Tracking - Index
 *
 * Central export for all progress tracking functionality
 */

// Reading Progress
export {
  trackReadingProgress,
  markLessonCompleted,
  updateTimeSpent,
  getReadingProgress,
  getTopicProgress,
  getTopicStats,
  getRecentlyAccessed,
  getAllProgress,
  formatTimeSpent,
  type ReadingProgress,
  type ReadingProgressUpdate,
  type TopicStats
} from './reading-progress'

// Quiz Attempts
export {
  saveQuizAttempt,
  getQuizAttempts,
  getBestQuizAttempt,
  hasPassedQuiz,
  getQuizHistory,
  getRecentQuizAttempts,
  getQuizStats,
  getTopicQuizAttempts,
  calculateQuizXP,
  formatQuizScore,
  getPerformanceMessage,
  type QuizAttempt,
  type QuizStats,
  type QuizHistory
} from './quiz-attempts'
