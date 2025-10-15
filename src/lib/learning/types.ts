/**
 * Learning System - Core Type Definitions
 *
 * This file contains the main TypeScript interfaces for the learning content system.
 * These types define the structure of topics, lessons, sections, and related entities.
 */

import { ReactNode } from 'react'
import { Quiz } from './quizzes/types'

// ============================================================================
// CORE TYPES
// ============================================================================

/**
 * Category of learning content
 */
export type CategoryType = 'html' | 'css' | 'javascript' | 'react'

/**
 * Difficulty level of content
 */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'

/**
 * Type of section content
 */
export type SectionType = 'theory' | 'example'

/**
 * Type of external resource
 */
export type ResourceType = 'article' | 'video' | 'interactive' | 'documentation'

// ============================================================================
// MAIN CONTENT STRUCTURES
// ============================================================================

/**
 * Topic - Highest level of content organization
 * Example: "HTML Fundamentals", "CSS Advanced", "React Introduction"
 */
export interface Topic {
  id: string                              // Unique slug: 'html-fundamentals'
  title: string                           // Display title: 'HTML Fundamentos'
  description: string                     // Brief description
  category: CategoryType                  // Content category
  totalTime: number                       // Total estimated time in minutes
  difficulty: DifficultyLevel             // Content difficulty
  lessons: Lesson[]                       // Array of lessons
  prerequisites?: string[]                // IDs of prerequisite topics
  icon?: ReactNode                        // Optional icon for display
}

/**
 * Lesson - A lesson within a topic
 * Example: "Estrutura Básica do HTML", "Flexbox Completo"
 */
export interface Lesson {
  id: string                              // Unique ID within topic: 'lesson-1'
  title: string                           // Display title
  description: string                     // Brief description
  estimatedTime: number                   // Estimated time in minutes
  sections: Section[]                     // Array of sections
  quiz?: Quiz                             // Optional quiz for assessment
  order?: number                          // Optional order for sorting
}

/**
 * Section - A section within a lesson
 * Example: "O que é HTML?", "Propriedades do Flexbox"
 */
export interface Section {
  id: string                              // Unique ID within lesson: 'intro'
  title: string                           // Display title
  type: SectionType                       // Section type (theory or example)
  content: string                         // Main content (markdown supported)
  codeExample?: string                    // Optional code example
  diagram?: unknown                       // Optional diagram (typed in diagrams/types.ts - will be typed in Day 6)
  exercise?: unknown                      // Optional exercise (typed in exercises/types.ts - will be typed in Day 5)
  resources?: ExternalResource[]          // Optional external resources
  order?: number                          // Optional order for sorting
}

/**
 * External Resource - Link to external learning material
 */
export interface ExternalResource {
  title: string                           // Resource title
  url: string                             // Resource URL
  type: ResourceType                      // Resource type
  estimatedTime: number                   // Estimated time in minutes
  difficulty: DifficultyLevel             // Resource difficulty
  description?: string                    // Optional description
}

// ============================================================================
// HELPER TYPES
// ============================================================================

/**
 * Metadata for a topic (used in listings)
 */
export interface TopicMetadata {
  id: string
  title: string
  description: string
  category: CategoryType
  estimatedTime: number
  difficulty: DifficultyLevel
  lessons: number                         // Number of lessons
  icon?: ReactNode
}

/**
 * Progress information for a topic/lesson
 */
export interface ContentProgress {
  topicId: string
  lessonId?: string
  sectionId?: string
  completed: boolean
  timeSpent: number                       // Seconds
  lastAccessed: Date
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Color mapping for categories
 */
export const CATEGORY_COLORS: Record<CategoryType, string> = {
  html: 'text-accent',
  css: 'text-primary',
  javascript: 'text-[hsl(var(--warning))]',
  react: 'text-[hsl(var(--purple))]'
}

/**
 * Background color mapping for categories
 */
export const CATEGORY_BG: Record<CategoryType, string> = {
  html: 'bg-accent/10',
  css: 'bg-primary/10',
  javascript: 'bg-[hsl(var(--warning))]/10',
  react: 'bg-[hsl(var(--purple))]/10'
}

/**
 * Difficulty labels in Portuguese
 */
export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado'
}

/**
 * Section type labels in Portuguese
 */
export const SECTION_TYPE_LABELS: Record<SectionType, string> = {
  theory: 'Teoria',
  example: 'Exemplo'
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Check if a value is a valid CategoryType
 */
export function isCategoryType(value: string): value is CategoryType {
  return ['html', 'css', 'javascript', 'react'].includes(value)
}

/**
 * Check if a value is a valid DifficultyLevel
 */
export function isDifficultyLevel(value: string): value is DifficultyLevel {
  return ['beginner', 'intermediate', 'advanced'].includes(value)
}

/**
 * Check if a value is a valid SectionType
 */
export function isSectionType(value: string): value is SectionType {
  return ['theory', 'example'].includes(value)
}
