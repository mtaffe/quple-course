'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { BadgeInfo } from '@/lib/progress/progressService'
import {
  Trophy,
  Award,
  Star,
  Crown,
  Zap,
  Target,
  ChevronLeft,
  ChevronRight,
  Lock
} from 'lucide-react'

interface AchievementShowcaseProps {
  badges: BadgeInfo[]
  allPossibleBadges?: BadgeInfo[]
}

export function AchievementShowcase({ badges, allPossibleBadges = [] }: AchievementShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3 // Desktop

  // Combine earned and unearned badges for showcase
  const earnedBadgeIds = badges.map(b => b.id)
  const unearnedBadges = allPossibleBadges.filter(b => !earnedBadgeIds.includes(b.id))
  const allBadges = [...badges, ...unearnedBadges.slice(0, 6)] // Show max 6 upcoming badges

  const totalPages = Math.ceil(allBadges.length / itemsPerPage)
  const startIndex = currentIndex * itemsPerPage
  const visibleBadges = allBadges.slice(startIndex, startIndex + itemsPerPage)

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const getBadgeStyle = (badge: BadgeInfo, isEarned: boolean) => {
    const baseStyle = "relative transition-all duration-500 transform hover:scale-105"

    if (!isEarned) {
      return `${baseStyle} opacity-50 grayscale`
    }

    switch (badge.category) {
      case 'achievement':
        return `${baseStyle} bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300`
      case 'skill':
        return `${baseStyle} bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300`
      case 'streak':
        return `${baseStyle} bg-gradient-to-br from-orange-100 to-red-200 border-orange-300`
      case 'special':
        return `${baseStyle} bg-gradient-to-br from-purple-100 to-pink-200 border-purple-300`
      default:
        return `${baseStyle} bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300`
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'achievement':
        return <Trophy className="h-4 w-4 text-yellow-600" />
      case 'skill':
        return <Target className="h-4 w-4 text-blue-600" />
      case 'streak':
        return <Zap className="h-4 w-4 text-orange-600" />
      case 'special':
        return <Crown className="h-4 w-4 text-purple-600" />
      default:
        return <Award className="h-4 w-4 text-gray-600" />
    }
  }

  if (allBadges.length === 0) {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            🏆 Vitrine de Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-bounce">🎯</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Suas Primeiras Conquistas Te Aguardam!
            </h3>
            <p className="text-gray-500 mb-4">
              Complete desafios e colete badges incríveis para mostrar suas habilidades
            </p>
            <div className="flex justify-center gap-4">
              <div className="bg-yellow-100 rounded-full px-4 py-2">
                <Trophy className="h-4 w-4 inline mr-2 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-700">Primeira Página</span>
              </div>
              <div className="bg-blue-100 rounded-full px-4 py-2">
                <Target className="h-4 w-4 inline mr-2 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">Mestre Semântico</span>
              </div>
              <div className="bg-green-100 rounded-full px-4 py-2">
                <Zap className="h-4 w-4 inline mr-2 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Aprendiz Rápido</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            🏆 Vitrine de Conquistas
            <Badge variant="secondary" className="ml-2">
              {badges.length} {badges.length === 1 ? 'conquistada' : 'conquistadas'}
            </Badge>
          </CardTitle>
          {totalPages > 1 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={prevPage}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextPage}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {visibleBadges.map((badge) => {
            const isEarned = earnedBadgeIds.includes(badge.id)
            return (
              <Card
                key={badge.id}
                className={getBadgeStyle(badge, isEarned)}
              >
                <CardContent className="p-6 text-center">
                  {!isEarned && (
                    <div className="absolute top-2 right-2">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                  )}

                  {isEarned && (
                    <div className="absolute top-2 right-2">
                      <div className="bg-green-500 rounded-full p-1">
                        <Star className="h-3 w-3 text-white fill-current" />
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <div className={`text-4xl mb-2 ${isEarned ? 'animate-pulse' : ''}`}>
                      {badge.icon}
                    </div>
                    <div className="flex justify-center mb-2">
                      {getCategoryIcon(badge.category)}
                    </div>
                  </div>

                  <h4 className={`font-bold text-sm mb-2 ${isEarned ? 'text-gray-800' : 'text-gray-500'}`}>
                    {badge.name}
                  </h4>

                  <p className={`text-xs leading-relaxed ${isEarned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {badge.description}
                  </p>

                  {isEarned && (
                    <div className="mt-4">
                      <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs">
                        ✓ Conquistado!
                      </Badge>
                    </div>
                  )}

                  {!isEarned && (
                    <div className="mt-4">
                      <Badge variant="outline" className="text-xs border-dashed">
                        🎯 Em breve...
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Mobile Single Badge View */}
        <div className="md:hidden">
          {allBadges.length > 0 && (
            <div className="relative">
              {allBadges.map((badge, index) => {
                const isEarned = earnedBadgeIds.includes(badge.id)
                const isVisible = index === currentIndex

                return (
                  <Card
                    key={badge.id}
                    className={`
                      ${getBadgeStyle(badge, isEarned)}
                      ${isVisible ? 'block' : 'hidden'}
                    `}
                  >
                    <CardContent className="p-6 text-center">
                      {!isEarned && (
                        <div className="absolute top-2 right-2">
                          <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                      )}

                      {isEarned && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-green-500 rounded-full p-1">
                            <Star className="h-3 w-3 text-white fill-current" />
                          </div>
                        </div>
                      )}

                      <div className="mb-4">
                        <div className={`text-5xl mb-3 ${isEarned ? 'animate-pulse' : ''}`}>
                          {badge.icon}
                        </div>
                        <div className="flex justify-center mb-2">
                          {getCategoryIcon(badge.category)}
                        </div>
                      </div>

                      <h4 className={`font-bold text-lg mb-3 ${isEarned ? 'text-gray-800' : 'text-gray-500'}`}>
                        {badge.name}
                      </h4>

                      <p className={`text-sm leading-relaxed mb-4 ${isEarned ? 'text-gray-600' : 'text-gray-400'}`}>
                        {badge.description}
                      </p>

                      {isEarned && (
                        <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white text-sm">
                          ✓ Conquistado!
                        </Badge>
                      )}

                      {!isEarned && (
                        <Badge variant="outline" className="text-sm border-dashed">
                          🎯 Em breve...
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Pagination Dots - Mobile & Desktop */}
        {allBadges.length > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex gap-2">
              {Array.from({ length: allBadges.length }, (_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
          </div>
        )}

        {badges.length > 0 && (
          <div className="mt-6 text-center bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">🎉 Parabéns pela dedicação!</h4>
            <p className="text-sm text-gray-600">
              Continue completando desafios para desbloquear mais conquistas incríveis!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}