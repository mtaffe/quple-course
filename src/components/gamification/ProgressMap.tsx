'use client'

import Link from 'next/link'
import { challenges } from '@/lib/challenges'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import {
  CheckCircle,
  Lock,
  Play,
  Trophy,
  Clock,
  Code,
  Palette,
  Zap,
  Layers,
  Target
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProgressMapProps {
  completedChallenges: number[]
  currentChallenge?: number
  className?: string
}

const categoryIcons = {
  html: Code,
  css: Palette,
  javascript: Zap,
  react: Layers,
  assessment: Target
}

const categoryColors = {
  html: 'bg-orange-500',
  css: 'bg-blue-500',
  javascript: 'bg-yellow-500',
  react: 'bg-cyan-500',
  assessment: 'bg-purple-500'
}

function getChallengeStatus(
  challengeId: number,
  completedChallenges: number[],
  currentChallenge?: number
): 'completed' | 'current' | 'available' | 'locked' {
  if (completedChallenges.includes(challengeId)) {
    return 'completed'
  }
  if (currentChallenge === challengeId) {
    return 'current'
  }

  const challenge = challenges.find(c => c.id === challengeId)
  if (!challenge) return 'locked'

  const canAccess = challenge.prerequisites.every(prereq =>
    completedChallenges.includes(prereq)
  )

  return canAccess ? 'available' : 'locked'
}

export function ProgressMap({
  completedChallenges,
  currentChallenge,
  className
}: ProgressMapProps) {
  const totalXp = challenges
    .filter(c => completedChallenges.includes(c.id))
    .reduce((sum, c) => sum + c.xpReward, 0)

  const completionPercentage = (completedChallenges.length / challenges.length) * 100

  return (
    <div className={cn('space-y-6', className)}>
      {/* Progress Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Mapa de Progresso</h2>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                <Trophy className="h-4 w-4 mr-1" />
                {totalXp} XP
              </Badge>
              <Badge
                variant={completionPercentage === 100 ? 'default' : 'outline'}
                className="text-sm"
              >
                {completedChallenges.length}/{challenges.length} Completos
              </Badge>
            </div>
          </div>

          <div className="w-full bg-muted rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {Math.round(completionPercentage)}% concluído
          </p>
        </CardContent>
      </Card>

      {/* Challenge Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => {
          const status = getChallengeStatus(
            challenge.id,
            completedChallenges,
            currentChallenge
          )
          const CategoryIcon = categoryIcons[challenge.category]
          const isLocked = status === 'locked'
          const isCompleted = status === 'completed'
          const isCurrent = status === 'current'

          return (
            <Card
              key={challenge.id}
              className={cn(
                'transition-all duration-200 hover:shadow-lg',
                isCompleted && 'ring-2 ring-green-500/20 bg-green-50/50',
                isCurrent && 'ring-2 ring-blue-500/20 bg-blue-50/50',
                isLocked && 'opacity-60'
              )}
            >
              <CardContent className="p-6">
                {/* Challenge Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={cn(
                        'p-2 rounded-lg text-white',
                        categoryColors[challenge.category]
                      )}
                    >
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg">
                          {challenge.title}
                        </h3>
                        {isCompleted && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        {isLocked && (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs mt-1',
                          challenge.difficulty === 'easy' && 'border-green-500 text-green-700',
                          challenge.difficulty === 'medium' && 'border-yellow-500 text-yellow-700',
                          challenge.difficulty === 'hard' && 'border-red-500 text-red-700'
                        )}
                      >
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Challenge Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {challenge.description}
                </p>

                {/* Challenge Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{challenge.estimatedTime}min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-4 w-4" />
                    <span>{challenge.xpReward} XP</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="w-full">
                  {isLocked ? (
                    <Button
                      variant="ghost"
                      className="w-full"
                      disabled
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Bloqueado
                    </Button>
                  ) : isCompleted ? (
                    <Link href={`/challenge/${challenge.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Revisar
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/challenge/${challenge.id}`} className="w-full">
                      <Button
                        className={cn(
                          'w-full',
                          isCurrent && 'bg-blue-600 hover:bg-blue-700'
                        )}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {isCurrent ? 'Continuar' : 'Começar'}
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Prerequisites */}
                {challenge.prerequisites.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-muted-foreground mb-2">
                      Pré-requisitos:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {challenge.prerequisites.map(prereqId => {
                        const prereq = challenges.find(c => c.id === prereqId)
                        const isPrereqCompleted = completedChallenges.includes(prereqId)
                        return (
                          <Badge
                            key={prereqId}
                            variant={isPrereqCompleted ? 'default' : 'outline'}
                            className="text-xs"
                          >
                            {prereq?.title || `Desafio ${prereqId}`}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Completion Message */}
      {completionPercentage === 100 && (
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-8 text-center">
            <Trophy className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">
              🎉 Parabéns! 🎉
            </h3>
            <p className="text-lg">
              Você completou todos os desafios do React Learning Playground!
            </p>
            <p className="mt-2 opacity-90">
              Você está pronto para projetos mais avançados!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}