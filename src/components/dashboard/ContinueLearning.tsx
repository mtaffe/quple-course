'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Play, Clock, Trophy, ChevronRight } from 'lucide-react'
import { challenges } from '@/lib/challenges'
import { cn } from '@/lib/utils'

interface ContinueLearningProps {
  studentId: string
  currentChallenge: number
  totalXP: number
  className?: string
}

export function ContinueLearning({
  currentChallenge,
  totalXP,
  className = ''
}: ContinueLearningProps) {
  const [nextChallenge, setNextChallenge] = useState<typeof challenges[0] | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Encontrar o próximo desafio
    const next = challenges.find(c => c.id === currentChallenge + 1) || challenges[0]
    setNextChallenge(next)

    // Calcular progresso geral
    const completedChallenges = currentChallenge
    const totalChallenges = challenges.length
    setProgress((completedChallenges / totalChallenges) * 100)
  }, [currentChallenge])

  if (!nextChallenge) {
    return (
      <div className={`glass-card rounded-xl p-8 ${className}`}>
        <div className="text-center">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            🎉 Parabéns! Você completou todos os desafios!
          </h2>
          <p className="text-muted-foreground">
            Que tal explorar conteúdos avançados ou ajudar outros estudantes?
          </p>
        </div>
      </div>
    )
  }

  const estimatedTime = nextChallenge.difficulty === 'easy' ? '15-20 min' :
                       nextChallenge.difficulty === 'medium' ? '25-30 min' : '35-45 min'

  return (
    <div className={`glass-card rounded-xl p-8 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Continue Aprendendo
          </h2>
          <p className="text-muted-foreground">
            Você está no desafio {currentChallenge} de {challenges.length}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{Math.round(progress)}%</div>
          <div className="text-xs text-muted-foreground">Concluído</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-3 mb-8">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Next Challenge Card */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-medium text-primary bg-primary/20 px-2 py-1 rounded-full">
                Desafio {nextChallenge.id}
              </span>
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                nextChallenge.difficulty === 'easy' ? "bg-green-500/20 text-green-600" :
                nextChallenge.difficulty === 'medium' ? "bg-yellow-500/20 text-yellow-600" :
                "bg-red-500/20 text-red-600"
              )}>
                {nextChallenge.difficulty === 'easy' ? 'Fácil' :
                 nextChallenge.difficulty === 'medium' ? 'Médio' : 'Difícil'}
              </span>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-2">
              {nextChallenge.title}
            </h3>

            <p className="text-muted-foreground mb-4 line-clamp-2">
              {nextChallenge.description}
            </p>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{estimatedTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4" />
                <span>{nextChallenge.xpReward} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/challenge/${nextChallenge.id}`}
          className="flex items-center justify-center space-x-2 w-full btn-primary-gradient py-4 rounded-lg font-semibold premium-hover group"
        >
          <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
          <span>Continuar Aprendendo</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{currentChallenge}</div>
          <div className="text-xs text-muted-foreground">Completados</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{totalXP}</div>
          <div className="text-xs text-muted-foreground">XP Total</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{challenges.length - currentChallenge}</div>
          <div className="text-xs text-muted-foreground">Restantes</div>
        </div>
      </div>
    </div>
  )
}