'use client'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import {
  Map,
  MapPin,
  Lock,
  CheckCircle,
  Play,
  Star,
  Flame,
  Trophy,
  Target,
  Zap
} from 'lucide-react'

interface Challenge {
  id: number
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  xpReward: number
  estimatedTime: number
  category: string
}

interface ProgressMapProps {
  challenges: Challenge[]
  currentChallenge: number
  completedChallenges: number[]
  onStartChallenge: (challengeId: number) => void
}

const WORLD_THEMES = {
  1: { name: 'HTML Fundamentos', color: 'from-green-400 to-blue-500', icon: '🌱', bg: 'bg-green-50' },
  2: { name: 'CSS Styling', color: 'from-purple-400 to-pink-500', icon: '🎨', bg: 'bg-purple-50' },
  3: { name: 'JavaScript Magic', color: 'from-yellow-400 to-orange-500', icon: '⚡', bg: 'bg-yellow-50' },
  4: { name: 'React Universe', color: 'from-blue-400 to-indigo-500', icon: '🚀', bg: 'bg-blue-50' }
}

export function ProgressMap({ challenges, currentChallenge, completedChallenges, onStartChallenge }: ProgressMapProps) {
  const getWorldTheme = (challengeId: number) => {
    if (challengeId <= 4) return WORLD_THEMES[1]
    if (challengeId <= 7) return WORLD_THEMES[2]
    if (challengeId <= 9) return WORLD_THEMES[3]
    return WORLD_THEMES[4]
  }

  const getChallengeStatus = (challengeId: number) => {
    if (completedChallenges.includes(challengeId)) return 'completed'
    if (challengeId === currentChallenge) return 'current'
    if (challengeId < currentChallenge) return 'available'
    return 'locked'
  }

  const getChallengeIcon = (status: string, difficulty: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-600" />
      case 'current':
        return <Play className="h-6 w-6 text-blue-600 animate-pulse" />
      case 'available':
        return <Target className="h-6 w-6 text-orange-600" />
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
          <Map className="h-8 w-8 text-blue-600" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mapa de Aventuras
          </h2>
        </div>
        <p className="text-gray-600">
          Sua jornada para se tornar um desenvolvedor React! 🚀
        </p>
      </div>

      <div className="space-y-12">
        {Object.entries(worlds).map(([worldId, worldChallenges]) => {
          const world = WORLD_THEMES[parseInt(worldId)]
          const worldProgress = worldChallenges.filter(c => completedChallenges.includes(c.id)).length
          const worldTotal = worldChallenges.length
          const isWorldUnlocked = worldChallenges.some(c => c.id <= currentChallenge)

          return (
            <div key={worldId} className={`relative ${world.bg} rounded-3xl p-8 border-2 border-opacity-20 ${isWorldUnlocked ? 'border-blue-300' : 'border-gray-300'}`}>
              {/* World Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className={`text-6xl bg-gradient-to-br ${world.color} rounded-full w-20 h-20 flex items-center justify-center shadow-lg`}>
                    <span className="text-3xl">{world.icon}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{world.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <div className="bg-white rounded-full px-4 py-2 shadow-md">
                    <span className="text-sm font-semibold text-gray-700">
                      {worldProgress}/{worldTotal} concluídos
                    </span>
                  </div>
                  {worldProgress === worldTotal && (
                    <div className="bg-yellow-100 rounded-full px-3 py-2 shadow-md">
                      <Trophy className="h-4 w-4 text-yellow-600 inline mr-1" />
                      <span className="text-xs font-bold text-yellow-700">COMPLETO!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Path - Responsive */}
              <div className="relative">
                {/* Desktop Path Line - Hidden on mobile */}
                <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-gray-300 to-gray-300 rounded-full z-0">
                  <div
                    className={`h-full bg-gradient-to-r ${world.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${(worldProgress / worldTotal) * 100}%` }}
                  />
                </div>

                {/* Desktop Layout - Horizontal */}
                <div className="hidden md:block relative z-10">
                  <div className="flex justify-between items-center">
                    {worldChallenges.map((challenge, index) => {
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
                              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-30"></div>
                            )}

                            {/* Main circle */}
                            <div
                              className={`
                                w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 relative
                                ${isCompleted
                                  ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-300'
                                  : isCurrent
                                  ? 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300'
                                  : isLocked
                                  ? 'bg-gray-300 border-gray-400'
                                  : 'bg-gradient-to-br from-orange-400 to-orange-600 border-orange-300'
                                }
                              `}
                            >
                              {getChallengeIcon(status, challenge.difficulty)}

                              {/* XP Badge */}
                              {!isLocked && (
                                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-800 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                                  {challenge.xpReward}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Desktop Challenge Info Card */}
                          <Card
                            className={`
                              w-48 p-4 transition-all duration-300 hover:shadow-xl
                              ${isCompleted ? 'bg-green-50 border-green-200' :
                                isCurrent ? 'bg-blue-50 border-blue-200 shadow-lg' :
                                isLocked ? 'bg-gray-50 border-gray-200 opacity-60' :
                                'bg-white hover:bg-orange-50'}
                            `}
                          >
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 mb-2">
                                {getDifficultyStars(challenge.difficulty)}
                              </div>

                              <h4 className={`font-bold text-sm mb-1 ${isLocked ? 'text-gray-500' : 'text-gray-800'}`}>
                                {challenge.title}
                              </h4>

                              <p className={`text-xs mb-3 ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
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
                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                        : isCurrent
                                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                        : 'bg-orange-500 hover:bg-orange-600 text-white'
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
                    const isNextInLine = index > 0 && worldChallenges[index - 1] && getChallengeStatus(worldChallenges[index - 1].id) === 'completed'

                    return (
                      <div key={challenge.id} className="relative">
                        {/* Vertical connecting line */}
                        {index > 0 && (
                          <div className="absolute -top-4 left-8 w-0.5 h-4 bg-gray-300">
                            {isCompleted && <div className={`w-0.5 h-full bg-gradient-to-b ${world.color}`}></div>}
                          </div>
                        )}

                        {/* Mobile Challenge Card */}
                        <Card
                          className={`
                            p-4 transition-all duration-300 hover:shadow-lg
                            ${isCompleted ? 'bg-green-50 border-green-200' :
                              isCurrent ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-200' :
                              isLocked ? 'bg-gray-50 border-gray-200 opacity-60' :
                              'bg-white hover:bg-orange-50'}
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
                                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-30"></div>
                              )}

                              {/* Main circle - Smaller */}
                              <div
                                className={`
                                  w-12 h-12 rounded-full flex items-center justify-center shadow-md border-3 relative
                                  ${isCompleted
                                    ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-300'
                                    : isCurrent
                                    ? 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300'
                                    : isLocked
                                    ? 'bg-gray-300 border-gray-400'
                                    : 'bg-gradient-to-br from-orange-400 to-orange-600 border-orange-300'
                                  }
                                `}
                              >
                                {/* Smaller icons for mobile */}
                                <div className="scale-75">
                                  {getChallengeIcon(status, challenge.difficulty)}
                                </div>

                                {/* XP Badge - Smaller */}
                                {!isLocked && (
                                  <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                                    {challenge.xpReward}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Challenge Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className={`font-bold text-sm ${isLocked ? 'text-gray-500' : 'text-gray-800'}`}>
                                  {challenge.title}
                                </h4>
                                <div className="flex items-center gap-1">
                                  {getDifficultyStars(challenge.difficulty)}
                                </div>
                              </div>

                              <p className={`text-xs mb-3 leading-relaxed ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
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
                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                        : isCurrent
                                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                        : 'bg-orange-500 hover:bg-orange-600 text-white'
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
      <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8">
        <Zap className="h-12 w-12 mx-auto mb-4 animate-pulse" />
        <h3 className="text-2xl font-bold mb-2">Continue Sua Jornada!</h3>
        <p className="text-blue-100 mb-4">
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