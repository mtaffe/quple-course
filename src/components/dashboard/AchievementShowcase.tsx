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
        return `${baseStyle} bg-[hsl(var(--warning))]/10 border-[hsl(var(--warning))]/30`
      case 'skill':
        return `${baseStyle} bg-primary/10 border-primary/30`
      case 'streak':
        return `${baseStyle} bg-accent/10 border-accent/30`
      case 'special':
        return `${baseStyle} bg-[hsl(var(--purple))]/10 border-[hsl(var(--purple))]/30`
      default:
        return `${baseStyle} glass-card`
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'achievement':
        return <Trophy className="h-4 w-4 text-[hsl(var(--warning))]" />
      case 'skill':
        return <Target className="h-4 w-4 text-primary" />
      case 'streak':
        return <Zap className="h-4 w-4 text-accent" />
      case 'special':
        return <Crown className="h-4 w-4 text-[hsl(var(--purple))]" />
      default:
        return <Award className="h-4 w-4 text-muted-foreground" />
    }
  }

  if (allBadges.length === 0) {
    return (
      <Card className="glass-card premium-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-[hsl(var(--warning))]" />
            🏆 Vitrine de Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-bounce">🎯</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Suas Primeiras Conquistas Te Aguardam!
            </h3>
            <p className="text-muted-foreground mb-4">
              Complete desafios e colete badges incríveis para mostrar suas habilidades
            </p>
            <div className="flex justify-center gap-4">
              <div className="bg-[hsl(var(--warning))]/20 rounded-full px-4 py-2">
                <Trophy className="h-4 w-4 inline mr-2 text-[hsl(var(--warning))]" />
                <span className="text-sm font-semibold text-[hsl(var(--warning))]">Primeira Página</span>
              </div>
              <div className="bg-primary/20 rounded-full px-4 py-2">
                <Target className="h-4 w-4 inline mr-2 text-primary" />
                <span className="text-sm font-semibold text-primary">Mestre Semântico</span>
              </div>
              <div className="bg-accent/20 rounded-full px-4 py-2">
                <Zap className="h-4 w-4 inline mr-2 text-accent" />
                <span className="text-sm font-semibold text-accent">Aprendiz Rápido</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-card premium-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="bg-[hsl(var(--warning))] rounded-full p-2">
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
                      <div className="accent-gradient rounded-full p-1">
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

                  <h4 className={`font-bold text-sm mb-2 ${isEarned ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {badge.name}
                  </h4>

                  <p className={`text-xs leading-relaxed ${isEarned ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                    {badge.description}
                  </p>

                  {isEarned && (
                    <div className="mt-4">
                      <Badge className="accent-gradient text-white text-xs">
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
                          <div className="accent-gradient rounded-full p-1">
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

                      <h4 className={`font-bold text-lg mb-3 ${isEarned ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {badge.name}
                      </h4>

                      <p className={`text-sm leading-relaxed mb-4 ${isEarned ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                        {badge.description}
                      </p>

                      {isEarned && (
                        <Badge className="accent-gradient text-white text-sm">
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
                    i === currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
          </div>
        )}

        {badges.length > 0 && (
          <div className="mt-6 text-center bg-[hsl(var(--warning))]/10 rounded-lg p-4">
            <h4 className="font-bold text-foreground mb-2">🎉 Parabéns pela dedicação!</h4>
            <p className="text-sm text-muted-foreground">
              Continue completando desafios para desbloquear mais conquistas incríveis!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}