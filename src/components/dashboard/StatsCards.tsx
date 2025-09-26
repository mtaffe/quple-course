'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import {
  Trophy,
  Zap,
  Target,
  Award,
  Star,
  Flame,
  BookOpen,
} from 'lucide-react'

interface StatsCardsProps {
  student: {
    name: string
    total_xp: number
    current_challenge: number
    streak_days: number
    badges?: string[]
  }
  levelInfo: {
    level: number
    xpForNext: number
    xpInLevel: number
  }
  badgeCount: number
  completedChallenges: number
}

export function StatsCards({ student, levelInfo, badgeCount, completedChallenges }: StatsCardsProps) {
  const xpProgress = (levelInfo.xpInLevel / (levelInfo.xpInLevel + levelInfo.xpForNext)) * 100

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      {/* Level & XP Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 col-span-2 sm:col-span-1">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-sm sm:text-lg flex items-center gap-2">
            <div className="bg-blue-500 rounded-full p-1.5 sm:p-2">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <span className="truncate">Nível {levelInfo.level}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-medium text-blue-700">XP:</span>
              <span className="font-bold text-blue-900">{student.total_xp.toLocaleString()}</span>
            </div>
            <Progress
              value={xpProgress}
              className="h-2 sm:h-3"
            />
            <div className="text-center">
              <p className="text-xs text-blue-600">
                <Zap className="h-3 w-3 inline mr-1" />
                <span className="hidden sm:inline">Faltam {levelInfo.xpForNext} XP para o nível {levelInfo.level + 1}!</span>
                <span className="sm:hidden">{levelInfo.xpForNext} XP p/ próximo nível</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Streak Card */}
      <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-sm sm:text-lg flex items-center gap-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-1.5 sm:p-2">
              <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <span className="hidden sm:inline">Sequência</span>
            <span className="sm:hidden">Fogo</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 sm:space-y-3">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">
                {student.streak_days}
              </div>
              <p className="text-xs sm:text-sm text-orange-700 font-medium">
                {student.streak_days === 0
                  ? 'Comece hoje!'
                  : student.streak_days === 1
                  ? 'dia seguido 🔥'
                  : 'dias seguidos 🔥'
                }
              </p>
            </div>

            {student.streak_days >= 3 && (
              <div className="bg-orange-200 rounded-lg p-1 sm:p-2 text-center">
                <Badge className="bg-orange-500 text-white text-xs">
                  <Trophy className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Você está pegando fogo! 🔥</span>
                  <span className="sm:hidden">On fire! 🔥</span>
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress Card */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-sm sm:text-lg flex items-center gap-2">
            <div className="bg-green-500 rounded-full p-1.5 sm:p-2">
              <Target className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <span>Progresso</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 sm:space-y-3">
            <div className="grid grid-cols-3 gap-1">
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-green-600">{completedChallenges}</div>
                <p className="text-xs text-green-700">Done</p>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-blue-600">{student.current_challenge}</div>
                <p className="text-xs text-blue-700">Atual</p>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-purple-600">11</div>
                <p className="text-xs text-purple-700">Total</p>
              </div>
            </div>

            <div className="bg-green-200 rounded-lg p-1.5 sm:p-2 text-center">
              <p className="text-xs text-green-800 font-medium">
                <BookOpen className="h-3 w-3 inline mr-1" />
                <span className="hidden sm:inline">{Math.round((completedChallenges / 11) * 100)}% da jornada concluída</span>
                <span className="sm:hidden">{Math.round((completedChallenges / 11) * 100)}% completo</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-sm sm:text-lg flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1.5 sm:p-2">
              <Award className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <span>Badges</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 sm:space-y-3">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">
                {badgeCount}
              </div>
              <p className="text-xs sm:text-sm text-purple-700 font-medium">
                {badgeCount === 0
                  ? 'Primeiro badge em breve!'
                  : badgeCount === 1
                  ? 'conquista 🏆'
                  : 'conquistas 🏆'
                }
              </p>
            </div>

            {badgeCount >= 3 && (
              <div className="bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-lg p-1 sm:p-2 text-center">
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                  <Trophy className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Colecionador!</span>
                  <span className="sm:hidden">Pro!</span>
                </Badge>
              </div>
            )}

            {badgeCount === 0 && (
              <div className="text-center">
                <p className="text-xs text-purple-600">
                  <span className="hidden sm:inline">Complete seu primeiro desafio! 🎯</span>
                  <span className="sm:hidden">Complete um desafio! 🎯</span>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}