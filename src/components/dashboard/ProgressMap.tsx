'use client'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Challenge } from '@/types'
import {
  Map,
  Lock,
  CheckCircle,
  Play,
  Star,
  Flame,
  Trophy,
  Target,
  Zap
} from 'lucide-react'

interface ProgressMapProps {
  challenges: Challenge[]
  currentChallenge: number
  completedChallenges: number[]
  onStartChallenge: (challengeId: number) => void
}

const WORLD_THEMES = {
  1: { name: 'HTML Fundamentos', color: 'accent-gradient', icon: '🌱', bg: 'glass-card' },
  2: { name: 'CSS Styling', color: 'btn-primary-gradient', icon: '🎨', bg: 'glass-card' },
  3: { name: 'JavaScript Magic', color: 'bg-[hsl(var(--warning))]', icon: '⚡', bg: 'glass-card' },
  4: { name: 'React Universe', color: 'btn-primary-gradient', icon: '🚀', bg: 'glass-card' }
}

export function ProgressMap({ challenges, currentChallenge, completedChallenges, onStartChallenge }: ProgressMapProps) {

  const getChallengeStatus = (challengeId: number) => {
    if (completedChallenges.includes(challengeId)) return 'completed'
    if (challengeId === currentChallenge) return 'current'
    if (challengeId < currentChallenge) return 'available'
    return 'locked'
  }

  const getChallengeIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-accent" />
      case 'current':
        return <Play className="h-6 w-6 text-primary animate-pulse" />
      case 'available':
        return <Target className="h-6 w-6 text-[hsl(var(--warning))]" />
      default:
        return <Lock className="h-4 w-4 text-gray-400" />
    }
  }

  const getDifficultyStars = (difficulty: string) => {
    const count = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3
    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < count ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  // Group challenges by world
  const worlds = challenges.reduce((acc, challenge) => {
    const worldId = challenge.id <= 4 ? 1 : challenge.id <= 7 ? 2 : challenge.id <= 9 ? 3 : 4
    if (!acc[worldId]) acc[worldId] = []
    acc[worldId].push(challenge)
    return acc
  }, {} as Record<number, Challenge[]>)

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Map className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-gradient-primary">
            Mapa de Aventuras
          </h2>
        </div>
        <p className="text-muted-foreground">
          Sua jornada para se tornar um desenvolvedor React! 🚀
        </p>
      </div>

      <div className="space-y-12">
        {Object.entries(worlds).map(([worldId, worldChallenges]) => {
          const world = WORLD_THEMES[parseInt(worldId) as keyof typeof WORLD_THEMES]
          const worldProgress = worldChallenges.filter(c => completedChallenges.includes(c.id)).length
          const worldTotal = worldChallenges.length
          const isWorldUnlocked = worldChallenges.some(c => c.id <= currentChallenge)

          return (
            <div key={worldId} className={`relative ${world.bg} rounded-3xl p-8 border-2 border-opacity-20 ${isWorldUnlocked ? 'border-primary/30' : 'border-border'}`}>
              {/* World Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className={`text-6xl ${world.color} rounded-full w-20 h-20 flex items-center justify-center shadow-lg`}>
                    <span className="text-3xl">{world.icon}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{world.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <div className="glass-card rounded-full px-4 py-2 shadow-md">
                    <span className="text-sm font-semibold text-foreground">
                      {worldProgress}/{worldTotal} concluídos
                    </span>
                  </div>
                  {worldProgress === worldTotal && (
                    <div className="bg-[hsl(var(--warning))]/20 rounded-full px-3 py-2 shadow-md">
                      <Trophy className="h-4 w-4 text-[hsl(var(--warning))] inline mr-1" />
                      <span className="text-xs font-bold text-[hsl(var(--warning))]">COMPLETO!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Path - Responsive */}
              <div className="relative">
                {/* Desktop Path Line - Hidden on mobile */}
                <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 bg-border rounded-full z-0">
                  <div
                    className={`h-full ${world.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${(worldProgress / worldTotal) * 100}%` }}
                  />
                </div>

                {/* Desktop Layout - Horizontal */}
                <div className="hidden md:block relative z-10">
                  <div className="flex justify-between items-center">
                    {worldChallenges.map((challenge) => {
                      const status = getChallengeStatus(challenge.id)
                      const isLocked = status === 'locked'
                      const isCompleted = status === 'completed'
                      const isCurrent = status === 'current'

                      return (
                        <div key={challenge.id} className="flex flex-col items-center">
                          {/* Challenge Node */}
                          <div
                            className={`relative mb-4 transition-all duration-300 transform hover:scale-110 ${
                              isLocked
                                ? 'opacity-50 cursor-not-allowed'
                                : isCurrent
                                ? 'animate-bounce cursor-pointer'
                                : 'cursor-pointer hover:shadow-lg'
                            }`}
                            onClick={() => !isLocked && onStartChallenge(challenge.id)}
                          >
                            {/* Glow effect for current challenge */}
                            {isCurrent && (
                              <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30"></div>
                            )}

                            {/* Main circle */}
                            <div
                              className={`
                                w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 relative
                                ${isCompleted
                                  ? 'accent-gradient border-accent/30'
                                  : isCurrent
                                  ? 'btn-primary-gradient border-primary/30'
                                  : isLocked
                                  ? 'bg-muted border-border'
                                  : 'bg-[hsl(var(--warning))] border-[hsl(var(--warning))]/30'
                                }
                              `}
                            >
                              {getChallengeIcon(status)}

                              {/* XP Badge */}
                              {!isLocked && (
                                <div className="absolute -top-2 -right-2 bg-[hsl(var(--warning))] text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                                  {challenge.xpReward}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Desktop Challenge Info Card */}
                          <Card
                            className={`
                              w-48 p-4 transition-all duration-300 hover:shadow-xl
                              ${isCompleted ? 'bg-accent/10 border-accent/30' :
                                isCurrent ? 'bg-primary/10 border-primary/30 shadow-lg' :
                                isLocked ? 'bg-muted/10 border-border opacity-60' :
                                'bg-card hover:bg-[hsl(var(--warning))]/10'}
                            `}
                          >
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 mb-2">
                                {getDifficultyStars(challenge.difficulty)}
                              </div>

                              <h4 className={`font-bold text-sm mb-1 ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                                {challenge.title}
                              </h4>

                              <p className={`text-xs mb-3 ${isLocked ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                                {challenge.description.split('.')[0]}...
                              </p>

                              <div className="flex justify-between items-center text-xs">
                                <Badge variant="outline" className="text-xs">
                                  {challenge.estimatedTime}min
                                </Badge>

                                {!isLocked && (
                                  <Button
                                    size="sm"
                                    className={`
                                      h-6 text-xs px-3
                                      ${isCompleted
                                        ? 'bg-accent/20 text-accent hover:bg-accent/30'
                                        : isCurrent
                                        ? 'btn-primary-gradient text-white'
                                        : 'bg-[hsl(var(--warning))] hover:bg-[hsl(var(--warning))]/80 text-black'
                                      }
                                    `}
                                    onClick={() => onStartChallenge(challenge.id)}
                                  >
                                    {isCompleted ? 'Revisar' : isCurrent ? 'Continuar' : 'Começar'}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </Card>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Mobile Layout - Vertical Stack */}
                <div className="md:hidden space-y-4">
                  {worldChallenges.map((challenge, index) => {
                    const status = getChallengeStatus(challenge.id)
                    const isLocked = status === 'locked'
                    const isCompleted = status === 'completed'
                    const isCurrent = status === 'current'

                    return (
                      <div key={challenge.id} className="relative">
                        {/* Vertical connecting line */}
                        {index > 0 && (
                          <div className="absolute -top-4 left-8 w-0.5 h-4 bg-border">
                            {isCompleted && <div className={`w-0.5 h-full ${world.color}`}></div>}
                          </div>
                        )}

                        {/* Mobile Challenge Card */}
                        <Card
                          className={`
                            p-4 transition-all duration-300 hover:shadow-lg
                            ${isCompleted ? 'bg-accent/10 border-accent/30' :
                              isCurrent ? 'bg-primary/10 border-primary/30 ring-2 ring-primary/30' :
                              isLocked ? 'bg-muted/10 border-border opacity-60' :
                              'bg-card hover:bg-[hsl(var(--warning))]/10'}
                          `}
                        >
                          <div className="flex items-center space-x-4">
                            {/* Challenge Node - Smaller for mobile */}
                            <div
                              className={`relative flex-shrink-0 transition-all duration-300 ${
                                isLocked
                                  ? 'opacity-50 cursor-not-allowed'
                                  : 'cursor-pointer'
                              }`}
                              onClick={() => !isLocked && onStartChallenge(challenge.id)}
                            >
                              {/* Glow effect for current challenge */}
                              {isCurrent && (
                                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30"></div>
                              )}

                              {/* Main circle - Smaller */}
                              <div
                                className={`
                                  w-12 h-12 rounded-full flex items-center justify-center shadow-md border-3 relative
                                  ${isCompleted
                                    ? 'accent-gradient border-accent/30'
                                    : isCurrent
                                    ? 'btn-primary-gradient border-primary/30'
                                    : isLocked
                                    ? 'bg-muted border-border'
                                    : 'bg-[hsl(var(--warning))] border-[hsl(var(--warning))]/30'
                                  }
                                `}
                              >
                                {/* Smaller icons for mobile */}
                                <div className="scale-75">
                                  {getChallengeIcon(status)}
                                </div>

                                {/* XP Badge - Smaller */}
                                {!isLocked && (
                                  <div className="absolute -top-1 -right-1 bg-[hsl(var(--warning))] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                                    {challenge.xpReward}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Challenge Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className={`font-bold text-sm ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                                  {challenge.title}
                                </h4>
                                <div className="flex items-center gap-1">
                                  {getDifficultyStars(challenge.difficulty)}
                                </div>
                              </div>

                              <p className={`text-xs mb-3 leading-relaxed ${isLocked ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                                {challenge.description.split('.')[0]}...
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="text-xs">
                                    {challenge.estimatedTime}min
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {challenge.xpReward} XP
                                  </Badge>
                                </div>

                                {!isLocked && (
                                  <Button
                                    size="sm"
                                    className={`
                                      text-xs px-3 py-1
                                      ${isCompleted
                                        ? 'bg-accent/20 text-accent hover:bg-accent/30'
                                        : isCurrent
                                        ? 'btn-primary-gradient text-white'
                                        : 'bg-[hsl(var(--warning))] hover:bg-[hsl(var(--warning))]/80 text-black'
                                      }
                                    `}
                                    onClick={() => onStartChallenge(challenge.id)}
                                  >
                                    {isCompleted ? 'Revisar' : isCurrent ? 'Continuar' : 'Começar'}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Motivational Footer */}
      <div className="text-center btn-primary-gradient text-white rounded-2xl p-8">
        <Zap className="h-12 w-12 mx-auto mb-4 animate-pulse" />
        <h3 className="text-2xl font-bold mb-2">Continue Sua Jornada!</h3>
        <p className="text-white/80 mb-4">
          Cada desafio te deixa mais próximo de ser um desenvolvedor profissional 🚀
        </p>
        <div className="flex justify-center gap-4">
          <div className="bg-white/20 rounded-full px-4 py-2">
            <Flame className="h-4 w-4 inline mr-2" />
            <span className="font-semibold">Mantenha o foco!</span>
          </div>
          <div className="bg-white/20 rounded-full px-4 py-2">
            <Trophy className="h-4 w-4 inline mr-2" />
            <span className="font-semibold">Colete todas as conquistas!</span>
          </div>
        </div>
      </div>
    </div>
  )
}