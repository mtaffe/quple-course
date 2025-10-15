/**
 * Glossary System - Type Definitions
 *
 * Types for the technical glossary with contextual tooltips.
 */

import { CategoryType, DifficultyLevel, ExternalResource } from '../types'

// ============================================================================
// GLOSSARY TYPES
// ============================================================================

/**
 * A glossary term with definition and metadata
 */
export interface GlossaryTerm {
  term: string                            // The term: 'DOM', 'Flexbox', etc.
  definition: string                      // Clear, concise definition (100-200 words)
  category: CategoryType                  // Category (html, css, javascript, react)
  difficulty?: DifficultyLevel            // Optional difficulty level
  relatedTerms?: string[]                 // Related terms (term strings)
  aliases?: string[]                      // Alternative names/spellings
  exampleUsage?: string                   // Example of usage
  codeExample?: string                    // Optional code example
  links?: ExternalResource[]              // Links for deeper learning
  tags?: string[]                         // Optional tags for search
  addedDate?: Date                        // When term was added
}

/**
 * Glossary search result
 */
export interface GlossarySearchResult {
  term: GlossaryTerm                      // The matched term
  score: number                           // Relevance score (0-1)
  matchType: 'exact' | 'alias' | 'partial' | 'related'  // How it matched
}

/**
 * Glossary statistics
 */
export interface GlossaryStats {
  totalTerms: number                      // Total number of terms
  termsByCategory: Record<CategoryType, number>  // Terms per category
  termsByDifficulty: Record<DifficultyLevel, number>  // Terms per difficulty
  mostSearched: Array<{                   // Most searched terms
    term: string
    searches: number
  }>
  recentlyAdded: GlossaryTerm[]           // Recently added terms
}

// ============================================================================
// GLOSSARY TOOLTIP TYPES
// ============================================================================

/**
 * Props for glossary tooltip component
 */
export interface GlossaryTooltipProps {
  term: string                            // Term to look up
  children: React.ReactNode               // Content to wrap
  placement?: 'top' | 'bottom' | 'left' | 'right'  // Tooltip placement
  showOnHover?: boolean                   // Show on hover (default: true)
  showOnClick?: boolean                   // Show on click (default: false)
  delay?: number                          // Delay before showing (ms)
  className?: string                      // Optional CSS class
}

/**
 * Detected term in content (for auto-detection)
 */
export interface DetectedTerm {
  term: string                            // The term found
  start: number                           // Start index in text
  end: number                             // End index in text
  glossaryTerm: GlossaryTerm              // Associated glossary term
}

// ============================================================================
// GLOSSARY INDEX TYPES (for fast search)
// ============================================================================

/**
 * Glossary index for fast lookups
 */
export interface GlossaryIndex {
  byTerm: Map<string, GlossaryTerm>       // Index by term (case-insensitive)
  byAlias: Map<string, GlossaryTerm>      // Index by alias
  byCategory: Map<CategoryType, GlossaryTerm[]>  // Index by category
  byTag: Map<string, GlossaryTerm[]>      // Index by tag
  allTerms: GlossaryTerm[]                // All terms
}

/**
 * Glossary search options
 */
export interface GlossarySearchOptions {
  query: string                           // Search query
  categories?: CategoryType[]             // Filter by categories
  difficulties?: DifficultyLevel[]        // Filter by difficulties
  tags?: string[]                         // Filter by tags
  limit?: number                          // Max results (default: 10)
  fuzzy?: boolean                         // Enable fuzzy matching (default: true)
}
