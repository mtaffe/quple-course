'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Trophy, Star, ChevronRight, Zap } from 'lucide-react'
import { ProgressService, BadgeInfo } from '@/lib/progress/progressService'

interface RecentAchievementsProps {
  studentId: string
  totalXP: number
  currentLevel: number
  className?: string
}

export function RecentAchievements({
  studentId,
  totalXP,
  className = ''
}: RecentAchievementsProps) {
  const [recentBadges, setRecentBadges] = useState<BadgeInfo[]>([])
  const [levelProgress, setLevelProgress] = useState({
    current: 0,
    next: 0,
    progress: 0,
    xpToNext: 0
  })
  const [todayXP, setTodayXP] = useState(0)
  const [weeklyXP, setWeeklyXP] = useState(0)

  const loadAchievements = useCallback(async () => {
    try {
      // Calcular progresso do nível
      const levelInfo = ProgressService.calculateLevel(totalXP)
      setLevelProgress({
        current: levelInfo.level,
        next: levelInfo.level + 1,
        progress: (levelInfo.xpInLevel / levelInfo.xpForNext) * 100,
        xpToNext: levelInfo.xpForNext - levelInfo.xpInLevel
      })

      // Mock de badges recentes - seria substituído por dados reais
      const mockRecentBadges: BadgeInfo[] = [
        {
          id: 'html-master',
          name: 'Mestre HTML',
          description: 'Completou todos os desafios HTML básicos',
          icon: '🏗️',
          category: 'achievement'
        },
        {
          id: 'first-streak',
          name: 'Primeira Sequência',
          description: 'Estudou por 3 dias consecutivos',
          icon: '🔥',
          category: 'streak'
        }
      ]

      setRecentBadges(mockRecentBadges)

      // Mock de XP recente
      setTodayXP(120)
      setWeeklyXP(480)

    } catch (error) {
      console.error('Erro ao carregar conquistas:', error)
    }
  }, [totalXP])

  useEffect(() => {
    loadAchievements()
  }, [studentId, totalXP, loadAchievements])


  return (
    <div className={`glass-card rounded-xl p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold text-foreground">Conquistas</h3>
        </div>
        <Link
          href="/achievements"
          className="text-xs text-primary hover:text-primary/80 flex items-center space-x-1"
        >
          <span>Ver todas</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Level Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Nível {levelProgress.current} → {levelProgress.next}
          </span>
          <span className="text-xs text-muted-foreground">
            {levelProgress.xpToNext} XP restantes
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${levelProgress.progress}%` }}
          />
        </div>
        <div className="text-xs text-muted-foreground">
          {Math.round(levelProgress.progress)}% para o próximo nível
        </div>
      </div>

      {/* XP Today/Week */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-3 border border-blue-500/20">
          <div className="flex items-center space-x-2 mb-1">
            <Zap className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-medium text-blue-600">Hoje</span>
          </div>
          <div className="text-lg font-bold text-foreground">{todayXP} XP</div>
        </div>
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-3 border border-green-500/20">
          <div className="flex items-center space-x-2 mb-1">
            <Star className="h-4 w-4 text-green-500" />
            <span className="text-xs font-medium text-green-600">Esta Semana</span>
          </div>
          <div className="text-lg font-bold text-foreground">{weeklyXP} XP</div>
        </div>
      </div>

      {/* Recent Badges */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">🏆 Badges Recentes</h4>
        {recentBadges.length > 0 ? (
          <div className="space-y-3">
            {recentBadges.map((badge) => (
              <div key={badge.id} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                <div className="text-2xl">{badge.icon}</div>
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-foreground">
                    {badge.name}
                  </h5>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-primary font-medium">+50 XP</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      2h atrás
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-sm text-muted-foreground">
              Continue aprendendo para conquistar suas primeiras badges!
            </p>
          </div>
        )}
      </div>

      {/* Motivation */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-3 border border-purple-500/20">
          <div className="text-xs font-medium text-purple-600 mb-1">💪 Meta Diária</div>
          <div className="text-sm text-foreground">
            Faltam apenas <span className="font-bold text-primary">30 XP</span> para completar sua meta hoje!
          </div>
        </div>
      </div>
    </div>
  )
}