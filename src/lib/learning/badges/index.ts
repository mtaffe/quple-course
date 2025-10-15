/**
 * Badges - Index
 *
 * Central export for all badge functionality
 */

// Badge definitions
export {
  ALL_LEARNING_BADGES,
  LEARNING_BADGES,
  QUIZ_BADGES,
  ACHIEVEMENT_BADGES,
  STREAK_BADGES,
  getBadgeById,
  getBadgesByCategory,
  getBadgesByRarity,
  calculateBadgesXP,
  type Badge
} from './learning-badges'

// Badge service
export {
  checkQuizBadges,
  checkLessonBadges,
  checkStreakBadges,
  checkAllBadges,
  getStudentBadges,
  groupBadgesByCategory,
  getBadgeProgress,
  type BadgeUnlock
} from './badge-service'
