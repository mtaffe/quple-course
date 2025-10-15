/**
 * Quiz System - Functions and Utilities
 *
 * This module provides functions to create, validate, and score quizzes.
 */

import { Quiz, QuizQuestion, QuizAttempt, QuizAnswer } from './types'

// ============================================================================
// QUIZ VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate a quiz attempt
 * @param quiz - The quiz definition
 * @param answers - User's answers
 * @returns QuizAttempt with results
 */
export function validateQuiz(
  quiz: Quiz,
  answers: QuizAnswer[],
  studentId: string,
  timeSpent?: number
): QuizAttempt {
  const results: QuizAnswer[] = []
  let totalPoints = 0
  let earnedPoints = 0

  // Validate each answer
  quiz.questions.forEach((question) => {
    const userAnswer = answers.find((a) => a.questionId === question.id)

    if (!userAnswer) {
      // Question not answered
      results.push({
        questionId: question.id,
        answer: '',
        correct: false,
        pointsEarned: 0
      })
      totalPoints += question.points
      return
    }

    // Check if answer is correct
    const isCorrect = checkAnswer(question, userAnswer.answer)

    if (isCorrect) {
      earnedPoints += question.points
    }

    totalPoints += question.points

    results.push({
      questionId: question.id,
      answer: userAnswer.answer,
      correct: isCorrect,
      pointsEarned: isCorrect ? question.points : 0
    })
  })

  // Calculate percentage
  const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0

  // Check if passed
  const passingScore = quiz.passingScore || 70
  const passed = percentage >= passingScore

  // Calculate XP earned
  const baseXP = 50
  const xpEarned = passed ? Math.round(baseXP * (percentage / 100)) : 0

  return {
    quizId: quiz.id,
    lessonId: quiz.lessonId,
    studentId,
    answers: results,
    score: earnedPoints,
    maxScore: totalPoints,
    percentage: Math.round(percentage),
    passed,
    xpEarned,
    completedAt: new Date(),
    timeSpent
  }
}

/**
 * Check if an answer is correct
 * @param question - The question
 * @param answer - User's answer
 * @returns boolean
 */
function checkAnswer(question: QuizQuestion, answer: string | number | null): boolean {
  if (answer === null || answer === undefined) {
    return false
  }

  // For multiple choice, compare the selected option index or value
  if (question.type === 'multiple-choice' || question.type === 'true-false') {
    // Normalize both to strings for comparison
    return String(answer).toLowerCase() === String(question.correctAnswer).toLowerCase()
  }

  // For code completion, allow some flexibility in whitespace
  if (question.type === 'code-completion') {
    const userAnswer = String(answer).trim().replace(/\s+/g, ' ')
    const correctAnswer = String(question.correctAnswer).trim().replace(/\s+/g, ' ')
    return userAnswer.toLowerCase() === correctAnswer.toLowerCase()
  }

  return false
}

/**
 * Get quiz by ID
 * @param quizzes - Array of quizzes
 * @param quizId - Quiz ID to find
 * @returns Quiz or null
 */
export function getQuizById(quizzes: Quiz[], quizId: string): Quiz | null {
  return quizzes.find((q) => q.id === quizId) || null
}

/**
 * Get quizzes by lesson ID
 * @param quizzes - Array of quizzes
 * @param lessonId - Lesson ID
 * @returns Array of quizzes
 */
export function getQuizzesByLesson(quizzes: Quiz[], lessonId: string): Quiz[] {
  return quizzes.filter((q) => q.lessonId === lessonId)
}

/**
 * Calculate XP for quiz performance
 * @param percentage - Score percentage (0-100)
 * @param baseXP - Base XP reward (default: 50)
 * @param perfectBonus - Bonus for 100% (default: 25)
 * @returns XP earned
 */
export function calculateQuizXP(
  percentage: number,
  baseXP: number = 50,
  perfectBonus: number = 25
): number {
  if (percentage < 70) {
    // Didn't pass
    return 0
  }

  let xp = Math.round(baseXP * (percentage / 100))

  // Perfect score bonus
  if (percentage === 100) {
    xp += perfectBonus
  }

  return xp
}

/**
 * Generate feedback message based on score
 * @param percentage - Score percentage (0-100)
 * @returns Feedback message
 */
export function getQuizFeedback(percentage: number): {
  title: string
  message: string
  emoji: string
} {
  if (percentage === 100) {
    return {
      title: 'Perfeito! 🎉',
      message: 'Você acertou todas as questões! Dominou completamente este conteúdo.',
      emoji: '🌟'
    }
  }

  if (percentage >= 90) {
    return {
      title: 'Excelente! 🚀',
      message: 'Quase perfeito! Você demonstrou ótimo entendimento do conteúdo.',
      emoji: '🔥'
    }
  }

  if (percentage >= 80) {
    return {
      title: 'Muito Bom! 👏',
      message: 'Você teve um ótimo desempenho. Continue assim!',
      emoji: '💪'
    }
  }

  if (percentage >= 70) {
    return {
      title: 'Bom trabalho! ✅',
      message: 'Você passou! Considere revisar os pontos que errou.',
      emoji: '👍'
    }
  }

  if (percentage >= 50) {
    return {
      title: 'Quase lá! 💪',
      message: 'Você está no caminho certo. Revise o conteúdo e tente novamente.',
      emoji: '📚'
    }
  }

  return {
    title: 'Continue tentando! 🎯',
    message: 'Não desista! Revise o conteúdo e tente novamente. Você consegue!',
    emoji: '💡'
  }
}

/**
 * Get hint for a question (progressive disclosure)
 * @param question - The question
 * @param hintLevel - Hint level (0 = no hint shown yet)
 * @returns Hint text or null
 */
export function getQuestionHint(question: QuizQuestion, hintLevel: number): string | null {
  if (!question.hint) {
    return null
  }

  // For now, return the hint if requested
  // In the future, could implement progressive hints
  return hintLevel > 0 ? question.hint : null
}

/**
 * Format quiz time spent
 * @param seconds - Time in seconds
 * @returns Formatted string
 */
export function formatQuizTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (remainingSeconds === 0) {
    return `${minutes}min`
  }

  return `${minutes}min ${remainingSeconds}s`
}

/**
 * Check if quiz time limit exceeded
 * @param quiz - The quiz
 * @param timeSpent - Time spent in seconds
 * @returns boolean
 */
export function isQuizTimeExceeded(quiz: Quiz, timeSpent: number): boolean {
  if (!quiz.timeLimit) {
    return false
  }

  return timeSpent > quiz.timeLimit * 60 // timeLimit is in minutes
}

/**
 * Get quiz statistics
 * @param attempts - Array of quiz attempts
 * @returns Statistics object
 */
export function getQuizStatistics(attempts: QuizAttempt[]) {
  if (attempts.length === 0) {
    return {
      totalAttempts: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      passRate: 0,
      averageTime: 0
    }
  }

  const totalAttempts = attempts.length
  const scores = attempts.map((a) => a.percentage)
  const times = attempts.filter((a) => a.timeSpent).map((a) => a.timeSpent!)

  return {
    totalAttempts,
    averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / totalAttempts),
    highestScore: Math.max(...scores),
    lowestScore: Math.min(...scores),
    passRate: Math.round(
      (attempts.filter((a) => a.passed).length / totalAttempts) * 100
    ),
    averageTime: times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0
  }
}

// ============================================================================
// QUIZ CREATION HELPERS
// ============================================================================

/**
 * Create a quiz question
 * Helper function for creating quiz questions with defaults
 */
export function createQuizQuestion(
  id: string,
  question: string,
  type: QuizQuestion['type'],
  correctAnswer: string | number,
  options?: string[],
  explanation?: string,
  points: number = 10,
  difficulty?: QuizQuestion['difficulty'],
  hint?: string
): QuizQuestion {
  return {
    id,
    question,
    type,
    options,
    correctAnswer,
    explanation: explanation || '',
    points,
    difficulty,
    hint
  }
}

/**
 * Create a quiz
 * Helper function for creating quizzes
 */
export function createQuiz(
  id: string,
  lessonId: string,
  title: string,
  questions: QuizQuestion[],
  passingScore?: number,
  timeLimit?: number
): Quiz {
  return {
    id,
    lessonId,
    title,
    questions,
    passingScore,
    timeLimit
  }
}
