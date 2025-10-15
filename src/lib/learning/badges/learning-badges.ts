/**
 * Learning Badges
 *
 * Badge definitions specific to the learning system
 */

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: 'learning' | 'quiz' | 'streak' | 'achievement'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xpReward: number
  unlockedBy: {
    type: 'quiz_perfect' | 'quiz_passed' | 'topic_completed' | 'lessons_completed' | 'time_spent' | 'streak_days' | 'all_quizzes_passed'
    value?: number
    topicSlug?: string
    quizId?: string
  }
}

// ============================================================================
// LEARNING BADGES - Topic Completion
// ============================================================================

export const LEARNING_BADGES: Badge[] = [
  // HTML Fundamentals
  {
    id: 'html-fundamentals-complete',
    name: 'Mestre do HTML Básico',
    description: 'Complete todas as lições de HTML Fundamentals',
    icon: '📘',
    category: 'learning',
    rarity: 'common',
    xpReward: 100,
    unlockedBy: {
      type: 'topic_completed',
      topicSlug: 'html-fundamentals'
    }
  },
  {
    id: 'html-advanced-complete',
    name: 'Ninja do HTML Avançado',
    description: 'Complete todas as lições de HTML Advanced',
    icon: '🥷',
    category: 'learning',
    rarity: 'rare',
    xpReward: 150,
    unlockedBy: {
      type: 'topic_completed',
      topicSlug: 'html-advanced'
    }
  },

  // CSS
  {
    id: 'css-fundamentals-complete',
    name: 'Estilista CSS',
    description: 'Complete todas as lições de CSS Fundamentals',
    icon: '🎨',
    category: 'learning',
    rarity: 'common',
    xpReward: 100,
    unlockedBy: {
      type: 'topic_completed',
      topicSlug: 'css-fundamentals'
    }
  },
  {
    id: 'css-advanced-complete',
    name: 'Arquiteto de Layout',
    description: 'Complete todas as lições de CSS Advanced',
    icon: '🏗️',
    category: 'learning',
    rarity: 'rare',
    xpReward: 150,
    unlockedBy: {
      type: 'topic_completed',
      topicSlug: 'css-advanced'
    }
  },

  // JavaScript
  {
    id: 'js-fundamentals-complete',
    name: 'Programador JavaScript',
    description: 'Complete todas as lições de JavaScript Fundamentals',
    icon: '💻',
    category: 'learning',
    rarity: 'common',
    xpReward: 100,
    unlockedBy: {
      type: 'topic_completed',
      topicSlug: 'javascript-fundamentals'
    }
  },
  {
    id: 'js-advanced-complete',
    name: 'Mestre do DOM',
    description: 'Complete todas as lições de JavaScript Advanced',
    icon: '🧙',
    category: 'learning',
    rarity: 'rare',
    xpReward: 150,
    unlockedBy: {
      type: 'topic_completed',
      topicSlug: 'javascript-advanced'
    }
  },

  // React
  {
    id: 'react-fundamentals-complete',
    name: 'React Developer',
    description: 'Complete todas as lições de React Fundamentals',
    icon: '⚛️',
    category: 'learning',
    rarity: 'epic',
    xpReward: 200,
    unlockedBy: {
      type: 'topic_completed',
      topicSlug: 'react-fundamentals'
    }
  },
  {
    id: 'react-advanced-complete',
    name: 'React Master',
    description: 'Complete todas as lições de React Advanced',
    icon: '🚀',
    category: 'learning',
    rarity: 'legendary',
    xpReward: 300,
    unlockedBy: {
      type: 'topic_completed',
      topicSlug: 'react-advanced'
    }
  }
]

// ============================================================================
// QUIZ BADGES - Quiz Performance
// ============================================================================

export const QUIZ_BADGES: Badge[] = [
  // Perfect Score Badges
  {
    id: 'quiz-perfectionist',
    name: 'Perfeccionista',
    description: 'Acerte 100% em qualquer quiz na primeira tentativa',
    icon: '🌟',
    category: 'quiz',
    rarity: 'rare',
    xpReward: 50,
    unlockedBy: {
      type: 'quiz_perfect'
    }
  },
  {
    id: 'quiz-master-5',
    name: 'Mestre dos Quizzes',
    description: 'Acerte 100% em 5 quizzes diferentes',
    icon: '🏆',
    category: 'quiz',
    rarity: 'epic',
    xpReward: 150,
    unlockedBy: {
      type: 'quiz_perfect',
      value: 5
    }
  },
  {
    id: 'quiz-master-10',
    name: 'Grande Mestre dos Quizzes',
    description: 'Acerte 100% em 10 quizzes diferentes',
    icon: '👑',
    category: 'quiz',
    rarity: 'legendary',
    xpReward: 300,
    unlockedBy: {
      type: 'quiz_perfect',
      value: 10
    }
  },

  // Quiz Completion
  {
    id: 'quiz-completer',
    name: 'Estudante Dedicado',
    description: 'Passe em 5 quizzes',
    icon: '📚',
    category: 'quiz',
    rarity: 'common',
    xpReward: 50,
    unlockedBy: {
      type: 'quiz_passed',
      value: 5
    }
  },
  {
    id: 'quiz-completer-all',
    name: 'Conquistador do Conhecimento',
    description: 'Passe em todos os quizzes disponíveis',
    icon: '🎓',
    category: 'quiz',
    rarity: 'legendary',
    xpReward: 500,
    unlockedBy: {
      type: 'all_quizzes_passed'
    }
  }
]

// ============================================================================
// ACHIEVEMENT BADGES - Milestones
// ============================================================================

export const ACHIEVEMENT_BADGES: Badge[] = [
  {
    id: 'first-lesson',
    name: 'Primeira Lição',
    description: 'Complete sua primeira lição',
    icon: '🎯',
    category: 'achievement',
    rarity: 'common',
    xpReward: 25,
    unlockedBy: {
      type: 'lessons_completed',
      value: 1
    }
  },
  {
    id: 'lessons-5',
    name: 'Em Progresso',
    description: 'Complete 5 lições',
    icon: '📖',
    category: 'achievement',
    rarity: 'common',
    xpReward: 50,
    unlockedBy: {
      type: 'lessons_completed',
      value: 5
    }
  },
  {
    id: 'lessons-10',
    name: 'Aprendiz Ativo',
    description: 'Complete 10 lições',
    icon: '🔥',
    category: 'achievement',
    rarity: 'rare',
    xpReward: 100,
    unlockedBy: {
      type: 'lessons_completed',
      value: 10
    }
  },
  {
    id: 'lessons-20',
    name: 'Estudante Exemplar',
    description: 'Complete 20 lições',
    icon: '⭐',
    category: 'achievement',
    rarity: 'epic',
    xpReward: 200,
    unlockedBy: {
      type: 'lessons_completed',
      value: 20
    }
  },
  {
    id: 'time-spent-1h',
    name: 'Uma Hora de Estudo',
    description: 'Estude por 1 hora total',
    icon: '⏰',
    category: 'achievement',
    rarity: 'common',
    xpReward: 50,
    unlockedBy: {
      type: 'time_spent',
      value: 3600 // 1 hour in seconds
    }
  },
  {
    id: 'time-spent-5h',
    name: 'Cinco Horas de Dedicação',
    description: 'Estude por 5 horas total',
    icon: '📚',
    category: 'achievement',
    rarity: 'rare',
    xpReward: 150,
    unlockedBy: {
      type: 'time_spent',
      value: 18000 // 5 hours in seconds
    }
  },
  {
    id: 'time-spent-10h',
    name: 'Dez Horas de Maestria',
    description: 'Estude por 10 horas total',
    icon: '🏅',
    category: 'achievement',
    rarity: 'epic',
    xpReward: 300,
    unlockedBy: {
      type: 'time_spent',
      value: 36000 // 10 hours in seconds
    }
  }
]

// ============================================================================
// STREAK BADGES - Consistency
// ============================================================================

export const STREAK_BADGES: Badge[] = [
  {
    id: 'streak-3',
    name: 'Três Dias Seguidos',
    description: 'Estude por 3 dias consecutivos',
    icon: '🔥',
    category: 'streak',
    rarity: 'common',
    xpReward: 50,
    unlockedBy: {
      type: 'streak_days',
      value: 3
    }
  },
  {
    id: 'streak-7',
    name: 'Uma Semana Forte',
    description: 'Estude por 7 dias consecutivos',
    icon: '💪',
    category: 'streak',
    rarity: 'rare',
    xpReward: 100,
    unlockedBy: {
      type: 'streak_days',
      value: 7
    }
  },
  {
    id: 'streak-14',
    name: 'Duas Semanas Imparáveis',
    description: 'Estude por 14 dias consecutivos',
    icon: '🚀',
    category: 'streak',
    rarity: 'epic',
    xpReward: 200,
    unlockedBy: {
      type: 'streak_days',
      value: 14
    }
  },
  {
    id: 'streak-30',
    name: 'Um Mês de Dedicação',
    description: 'Estude por 30 dias consecutivos',
    icon: '👑',
    category: 'streak',
    rarity: 'legendary',
    xpReward: 500,
    unlockedBy: {
      type: 'streak_days',
      value: 30
    }
  }
]

// ============================================================================
// ALL BADGES COMBINED
// ============================================================================

export const ALL_LEARNING_BADGES: Badge[] = [
  ...LEARNING_BADGES,
  ...QUIZ_BADGES,
  ...ACHIEVEMENT_BADGES,
  ...STREAK_BADGES
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get badge by ID
 */
export function getBadgeById(badgeId: string): Badge | undefined {
  return ALL_LEARNING_BADGES.find(badge => badge.id === badgeId)
}

/**
 * Get badges by category
 */
export function getBadgesByCategory(category: Badge['category']): Badge[] {
  return ALL_LEARNING_BADGES.filter(badge => badge.category === category)
}

/**
 * Get badges by rarity
 */
export function getBadgesByRarity(rarity: Badge['rarity']): Badge[] {
  return ALL_LEARNING_BADGES.filter(badge => badge.rarity === rarity)
}

/**
 * Get total XP from badges
 */
export function calculateBadgesXP(badgeIds: string[]): number {
  return badgeIds.reduce((total, badgeId) => {
    const badge = getBadgeById(badgeId)
    return total + (badge?.xpReward || 0)
  }, 0)
}
