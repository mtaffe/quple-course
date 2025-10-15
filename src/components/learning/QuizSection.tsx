'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Trophy, Zap } from 'lucide-react'
import { QuizQuestion } from './QuizQuestion'
import { useAuth } from '@/hooks/useAuth'
import { saveQuizAttempt } from '@/lib/learning/progress'
import type { Quiz, QuizAnswer } from '@/lib/learning/quizzes/types'

interface QuizSectionProps {
  quiz: Quiz
  topicSlug: string
  lessonId: string
  onComplete?: (score: number, xpEarned: number) => void
}

export function QuizSection({ quiz, topicSlug, lessonId, onComplete }: QuizSectionProps) {
  const { user } = useAuth()
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [xpEarned, setXpEarned] = useState(0)
  const [saving, setSaving] = useState(false)

  const handleAnswerChange = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleSubmit = async () => {
    if (!user) {
      console.error('User not authenticated')
      return
    }

    setSaving(true)

    try {
      // Calcular score e criar array de QuizAnswer
      const quizAnswers: QuizAnswer[] = []
      let correctCount = 0

      quiz.questions.forEach(question => {
        const userAnswer = answers[question.id]
        const isCorrect = String(userAnswer) === String(question.correctAnswer)
        if (isCorrect) correctCount++

        quizAnswers.push({
          questionId: question.id,
          answer: userAnswer,
          correct: isCorrect,
          pointsEarned: isCorrect ? question.points : 0
        })
      })

      const calculatedScore = correctCount
      const maxScore = quiz.questions.length
      const percentage = Math.round((correctCount / maxScore) * 100)
      const passed = percentage >= (quiz.passingScore || 70)

      // Calcular XP
      // Base: 20 XP por quiz
      // +2 XP por questão correta
      // +10 XP se acertar tudo
      // +20 XP se acertar tudo na primeira tentativa
      let calculatedXP = 20 // base
      calculatedXP += correctCount * 2
      if (correctCount === maxScore) {
        calculatedXP += 10 // perfect score
        if (!submitted) {
          calculatedXP += 20 // first try perfect
        }
      }

      // Salvar no banco de dados
      const { error } = await saveQuizAttempt(
        user.id,
        quiz.id,
        topicSlug,
        lessonId,
        calculatedScore,
        maxScore,
        percentage,
        passed,
        calculatedXP,
        quizAnswers
      )

      if (error) {
        console.error('Error saving quiz attempt:', error)
        // Continue anyway - don't block UI on save error
      }

      setScore(calculatedScore)
      setXpEarned(calculatedXP)
      setSubmitted(true)

      // Callback para salvar progresso
      if (onComplete) {
        onComplete(calculatedScore, calculatedXP)
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error)
    } finally {
      setSaving(false)
    }
  }

  const getQuestionCorrect = (questionId: string): boolean => {
    const question = quiz.questions.find(q => q.id === questionId)
    if (!question) return false

    const userAnswer = answers[questionId]
    return String(userAnswer) === String(question.correctAnswer)
  }

  const allAnswered = quiz.questions.every(q => answers[q.id] !== undefined)
  const percentage = quiz.questions.length > 0 ? (score / quiz.questions.length) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 rounded-lg bg-primary/20">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">{quiz.title}</h3>
            <p className="text-sm text-muted-foreground">
              {quiz.questions.length} {quiz.questions.length === 1 ? 'questão' : 'questões'}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        {submitted && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Seu desempenho</span>
              <span className="font-semibold text-foreground">
                {score} de {quiz.questions.length}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {quiz.questions.map((question, index) => (
          <QuizQuestion
            key={question.id}
            question={question}
            questionNumber={index + 1}
            selectedAnswer={answers[question.id]}
            onAnswerChange={(answer) => handleAnswerChange(question.id, answer)}
            submitted={submitted}
            isCorrect={submitted ? getQuestionCorrect(question.id) : undefined}
          />
        ))}
      </div>

      {/* Submit button or results */}
      {!submitted ? (
        <div className="glass-card rounded-xl p-6 text-center">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered || saving}
            className={`btn-primary-gradient px-8 py-3 rounded-lg font-semibold premium-hover transition-all ${
              (!allAnswered || saving) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {saving ? 'Salvando...' : allAnswered ? 'Verificar Respostas' : `Responda todas as ${quiz.questions.length} questões`}
          </button>
          {!allAnswered && (
            <p className="text-sm text-muted-foreground mt-2">
              Faltam {quiz.questions.filter(q => answers[q.id] === undefined).length} {quiz.questions.filter(q => answers[q.id] === undefined).length === 1 ? 'questão' : 'questões'}
            </p>
          )}
        </div>
      ) : (
        <div className="glass-card rounded-xl p-8 text-center space-y-4">
          {/* Score visual */}
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${
            percentage === 100 ? 'bg-accent/20' :
            percentage >= 70 ? 'bg-primary/20' :
            'bg-[hsl(var(--warning))]/20'
          }`}>
            {percentage === 100 ? (
              <Trophy className="h-12 w-12 text-accent" />
            ) : percentage >= 70 ? (
              <CheckCircle className="h-12 w-12 text-primary" />
            ) : (
              <XCircle className="h-12 w-12 text-[hsl(var(--warning))]" />
            )}
          </div>

          {/* Message */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {percentage === 100 ? 'Perfeito! 🎉' :
               percentage >= 70 ? 'Ótimo trabalho!' :
               'Continue praticando!'}
            </h3>
            <p className="text-muted-foreground">
              Você acertou {score} de {quiz.questions.length} {quiz.questions.length === 1 ? 'questão' : 'questões'}
            </p>
          </div>

          {/* XP earned */}
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border border-primary/30">
            <Zap className="h-5 w-5 text-accent" />
            <span className="font-bold text-lg text-foreground">+{xpEarned} XP</span>
          </div>

          {/* Retry button */}
          <button
            onClick={() => {
              setAnswers({})
              setSubmitted(false)
              setScore(0)
              setXpEarned(0)
            }}
            className="glass-card text-foreground px-6 py-2 rounded-lg font-medium premium-hover"
          >
            Tentar Novamente
          </button>
        </div>
      )}
    </div>
  )
}
