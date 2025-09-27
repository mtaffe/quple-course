export interface Student {
  id: string
  name: string
  email: string
  currentChallenge: number
  totalXp: number
  streakDays: number
  badges: string[]
  createdAt: string
}

export interface Challenge {
  id: number
  title: string
  description: string
  difficulty: 'beginner' | 'easy' | 'medium' | 'hard' | 'assessment'
  xpReward: number
  estimatedTime: number
  prerequisites: number[]
  starterCode: string
  solutionCode: string
  category: 'html' | 'css' | 'javascript' | 'react' | 'assessment'

  // Conteúdo educativo expandido
  learningObjectives?: string[]
  concepts?: Array<{
    title: string
    description: string
  }>
  resources?: Array<{
    title: string
    url: string
    type: 'documentation' | 'video' | 'tutorial' | 'tool'
    description: string
  }>

  // Sistema de dicas melhorado
  hints?: Array<{
    level: number
    title: string
    content: string
    example?: string
  }> | string[] // Mantém compatibilidade com formato antigo

  // Sistema de validação
  validationRules?: Array<{
    type: string
    message: string
    weight?: number
  }>

  // Conquistas do desafio
  achievements?: Array<{
    id: string
    title: string
    description: string
    icon?: string
    condition?: string
  }>
}

export interface Submission {
  id: string
  studentId: string
  challengeId: number
  code: string
  status: 'pending' | 'completed' | 'failed'
  attempts: number
  timeSpent: number
  createdAt: string
  completedAt?: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
}

export interface ValidationResult {
  isValid: boolean
  score: number // 0-100
  errors: Array<{
    rule: string
    message: string
    line?: number
    suggestion?: string
  }>
  warnings: Array<{
    message: string
    suggestion?: string
  }>
  achievements: string[] // IDs das conquistas desbloqueadas
}

export interface GameProgress {
  currentLevel: number
  xpToNextLevel: number
  unlockedChallenges: number[]
  completedChallenges: number[]
  achievements: Badge[]
}

export interface ChallengeState {
  code: string
  isRunning: boolean
  output: string
  errors: string[]
  currentHint: number
  attempts: number
}