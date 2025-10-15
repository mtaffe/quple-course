'use client'

import { CheckCircle, XCircle, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { QuizQuestion as QuizQuestionType } from '@/lib/learning/quizzes/types'

interface QuizQuestionProps {
  question: QuizQuestionType
  questionNumber: number
  selectedAnswer?: string | number
  onAnswerChange: (answer: string | number) => void
  submitted: boolean
  isCorrect?: boolean
}

export function QuizQuestion({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerChange,
  submitted,
  isCorrect
}: QuizQuestionProps) {
  const renderOptions = () => {
    if (question.type === 'true-false') {
      return (
        <div className="space-y-3">
          {['true', 'false'].map((option) => {
            const isSelected = selectedAnswer === option
            const isCorrectAnswer = String(question.correctAnswer) === option
            const showCorrect = submitted && isCorrectAnswer
            const showWrong = submitted && isSelected && !isCorrectAnswer

            return (
              <button
                key={option}
                onClick={() => !submitted && onAnswerChange(option)}
                disabled={submitted}
                className={cn(
                  "w-full text-left p-4 rounded-lg transition-all font-medium",
                  "border-2 flex items-center justify-between",
                  !submitted && !isSelected && "border-border hover:border-primary hover:bg-primary/5",
                  !submitted && isSelected && "border-primary bg-primary/10",
                  showCorrect && "border-accent bg-accent/10",
                  showWrong && "border-[hsl(var(--warning))] bg-[hsl(var(--warning))]/10",
                  submitted && !isSelected && !isCorrectAnswer && "border-border opacity-50"
                )}
              >
                <span className="text-foreground">
                  {option === 'true' ? 'Verdadeiro' : 'Falso'}
                </span>
                {submitted && (
                  <>
                    {showCorrect && <CheckCircle className="h-5 w-5 text-accent" />}
                    {showWrong && <XCircle className="h-5 w-5 text-[hsl(var(--warning))]" />}
                  </>
                )}
              </button>
            )
          })}
        </div>
      )
    }

    // Multiple choice
    return (
      <div className="space-y-3">
        {question.options?.map((option, index) => {
          const optionValue = String(index)
          const isSelected = String(selectedAnswer) === optionValue
          const isCorrectAnswer = String(question.correctAnswer) === optionValue
          const showCorrect = submitted && isCorrectAnswer
          const showWrong = submitted && isSelected && !isCorrectAnswer

          return (
            <button
              key={index}
              onClick={() => !submitted && onAnswerChange(index)}
              disabled={submitted}
              className={cn(
                "w-full text-left p-4 rounded-lg transition-all",
                "border-2 flex items-start space-x-3",
                !submitted && !isSelected && "border-border hover:border-primary hover:bg-primary/5",
                !submitted && isSelected && "border-primary bg-primary/10",
                showCorrect && "border-accent bg-accent/10",
                showWrong && "border-[hsl(var(--warning))] bg-[hsl(var(--warning))]/10",
                submitted && !isSelected && !isCorrectAnswer && "border-border opacity-50"
              )}
            >
              <div className={cn(
                "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5",
                isSelected && !submitted && "border-primary bg-primary",
                !isSelected && !submitted && "border-muted-foreground",
                showCorrect && "border-accent bg-accent",
                showWrong && "border-[hsl(var(--warning))] bg-[hsl(var(--warning))]"
              )}>
                <span className={cn(
                  "text-xs font-bold",
                  isSelected && !submitted && "text-white",
                  !isSelected && !submitted && "text-muted-foreground",
                  showCorrect && "text-white",
                  showWrong && "text-white"
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
              </div>

              <div className="flex-1 flex items-center justify-between">
                <span className="text-foreground">{option}</span>
                {submitted && (
                  <>
                    {showCorrect && <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 ml-2" />}
                    {showWrong && <XCircle className="h-5 w-5 text-[hsl(var(--warning))] flex-shrink-0 ml-2" />}
                  </>
                )}
              </div>
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="glass-card rounded-xl p-6 space-y-4">
      {/* Question header */}
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">{questionNumber}</span>
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-foreground leading-relaxed">
            {question.question}
          </p>
          {question.points && question.points > 1 && (
            <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">
              {question.points} pontos
            </span>
          )}
        </div>
      </div>

      {/* Options */}
      {renderOptions()}

      {/* Explanation (shown after submission) */}
      {submitted && question.explanation && (
        <div className={cn(
          "p-4 rounded-lg border-l-4",
          isCorrect
            ? "bg-accent/10 border-accent"
            : "bg-[hsl(var(--warning))]/10 border-[hsl(var(--warning))]"
        )}>
          <div className="flex items-start space-x-2">
            <HelpCircle className={cn(
              "h-5 w-5 flex-shrink-0 mt-0.5",
              isCorrect ? "text-accent" : "text-[hsl(var(--warning))]"
            )} />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                {isCorrect ? 'Correto!' : 'Explicação:'}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
