/**
 * Learning System - Main Entry Point
 *
 * This is the central export file for the learning content system.
 * Import everything you need from '@/lib/learning' instead of individual files.
 */

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  // Core types
  CategoryType,
  DifficultyLevel,
  SectionType,
  ResourceType,

  // Main structures
  Topic,
  Lesson,
  Section,
  ExternalResource,

  // Helper types
  TopicMetadata,
  ContentProgress
} from './types'

// Export constants
export {
  CATEGORY_COLORS,
  CATEGORY_BG,
  DIFFICULTY_LABELS,
  SECTION_TYPE_LABELS,

  // Type guards
  isCategoryType,
  isDifficultyLevel,
  isSectionType
} from './types'

// ============================================================================
// TOPIC EXPORTS
// ============================================================================

// Export individual topics
export { htmlFundamentals } from './topics/html/fundamentals'
export { htmlAdvanced } from './topics/html/advanced'
export { cssBasics } from './topics/css/basics'
export { cssAdvanced } from './topics/css/advanced' // ✅ Day 2 complete!
export { jsFundamentals } from './topics/javascript/fundamentals'
export { jsAdvanced } from './topics/javascript/advanced' // ✅ Day 3 complete!
export { reactIntroduction } from './topics/react/introduction' // ✅ Day 4 complete!
export { reactComponents } from './topics/react/components' // ✅ Day 4 complete!
export { reactHooks } from './topics/react/hooks' // ✅ Day 5 complete!
export { reactAdvancedHooks } from './topics/react/advanced-hooks' // ✅ Day 6 complete!
export { reactForms } from './topics/react/forms' // ✅ Day 7 complete!
export { reactBestPractices } from './topics/react/best-practices' // ✅ Day 8 complete!

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

import { Topic, TopicMetadata, CategoryType } from './types'
import { htmlFundamentals } from './topics/html/fundamentals'
import { htmlAdvanced } from './topics/html/advanced'
import { cssBasics } from './topics/css/basics'
import { cssAdvanced } from './topics/css/advanced'
import { jsFundamentals } from './topics/javascript/fundamentals'
import { jsAdvanced } from './topics/javascript/advanced'
import { reactIntroduction } from './topics/react/introduction'
import { reactComponents } from './topics/react/components'
import { reactHooks } from './topics/react/hooks'
import { reactAdvancedHooks } from './topics/react/advanced-hooks'
import { reactForms } from './topics/react/forms'
import { reactBestPractices } from './topics/react/best-practices'

/**
 * Get all available topics
 */
export function getAllTopics(): Topic[] {
  return [
    htmlFundamentals,
    htmlAdvanced,
    cssBasics,
    cssAdvanced, // ✅ Day 2 complete!
    jsFundamentals,
    jsAdvanced, // ✅ Day 3 complete!
    reactIntroduction, // ✅ Day 4 complete!
    reactComponents, // ✅ Day 4 complete!
    reactHooks, // ✅ Day 5 complete!
    reactAdvancedHooks, // ✅ Day 6 complete!
    reactForms, // ✅ Day 7 complete!
    reactBestPractices, // ✅ Day 8 complete!
  ]
}

/**
 * Get a specific topic by its slug
 * @param slug - The topic slug (e.g., 'html-fundamentals')
 */
export function getTopicBySlug(slug: string): Topic | null {
  const topics = getAllTopics()
  return topics.find(topic => topic.id === slug) || null
}

/**
 * Get topics by category
 * @param category - The category to filter by
 */
export function getTopicsByCategory(category: CategoryType): Topic[] {
  return getAllTopics().filter(topic => topic.category === category)
}

/**
 * Get topic metadata (lightweight version without full content)
 * @param slug - The topic slug
 */
export function getTopicMetadata(slug: string): TopicMetadata | null {
  const topic = getTopicBySlug(slug)
  if (!topic) return null

  return {
    id: topic.id,
    title: topic.title,
    description: topic.description,
    category: topic.category,
    estimatedTime: topic.totalTime,
    difficulty: topic.difficulty,
    lessons: topic.lessons.length,
    icon: topic.icon
  }
}

/**
 * Get all topics metadata (for listings)
 */
export function getAllTopicsMetadata(): TopicMetadata[] {
  return getAllTopics().map(topic => ({
    id: topic.id,
    title: topic.title,
    description: topic.description,
    category: topic.category,
    estimatedTime: topic.totalTime,
    difficulty: topic.difficulty,
    lessons: topic.lessons.length,
    icon: topic.icon
  }))
}

/**
 * Check if a topic exists
 * @param slug - The topic slug
 */
export function topicExists(slug: string): boolean {
  return getTopicBySlug(slug) !== null
}

/**
 * Get total number of topics
 */
export function getTotalTopics(): number {
  return getAllTopics().length
}

/**
 * Get total number of lessons across all topics
 */
export function getTotalLessons(): number {
  return getAllTopics().reduce((total, topic) => total + topic.lessons.length, 0)
}

/**
 * Get total estimated time across all topics (in minutes)
 */
export function getTotalEstimatedTime(): number {
  return getAllTopics().reduce((total, topic) => total + topic.totalTime, 0)
}

// ============================================================================
// FEATURE MODULE EXPORTS (will be added as we implement them)
// ============================================================================

// Quizzes
export * from './quizzes/types'
export * from './quizzes'
export { htmlQuizzes } from './quizzes/html-quizzes'

// Exercises
// export * from './exercises'

// Diagrams
// export * from './diagrams'

// Glossary
// export * from './glossary'

// Progress tracking
// export * from './progress'
