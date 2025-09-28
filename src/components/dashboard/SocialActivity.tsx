'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trophy, Users, Flame, ChevronRight, Crown } from 'lucide-react'

interface SocialActivityProps {
  studentId: string
  className?: string
}

interface Activity {
  id: string
  type: 'challenge_complete' | 'badge_earned' | 'level_up'
  studentName: string
  message: string
  timestamp: string
  icon: 'trophy' | 'crown' | 'flame'
}

export function SocialActivity({ studentId, className = '' }: SocialActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [userRank, setUserRank] = useState<number>(0)
  const [topFriends, setTopFriends] = useState<{name: string; xp: number; position: number}[]>([])
  const [streak, setStreak] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSocialData()
  }, [studentId])

  const loadSocialData = async () => {
    try {
      setLoading(true)

      // Mock data por enquanto - seria substituído por calls reais
      const mockActivities: Activity[] = [
        {
          id: '1',
          type: 'challenge_complete',
          studentName: 'Maria Silva',
          message: 'completou o Desafio 5: CSS Styling',
          timestamp: '2 min atrás',
          icon: 'trophy'
        },
        {
          id: '2',
          type: 'badge_earned',
          studentName: 'João Santos',
          message: 'conquistou a badge "Mestre HTML"',
          timestamp: '5 min atrás',
          icon: 'crown'
        },
        {
          id: '3',
          type: 'level_up',
          studentName: 'Ana Costa',
          message: 'subiu para o Nível 3',
          timestamp: '15 min atrás',
          icon: 'flame'
        },
        {
          id: '4',
          type: 'challenge_complete',
          studentName: 'Pedro Lima',
          message: 'completou o Desafio 3: Lista HTML',
          timestamp: '23 min atrás',
          icon: 'trophy'
        }
      ]

      // Simular dados do usuário
      setActivities(mockActivities)
      setUserRank(42)
      setStreak(7)
      setTopFriends([
        { name: 'Maria Silva', xp: 1250, position: 1 },
        { name: 'João Santos', xp: 980, position: 2 },
        { name: 'Ana Costa', xp: 875, position: 3 }
      ])

    } catch (error) {
      console.error('Erro ao carregar dados sociais:', error)
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (icon: string) => {
    switch (icon) {
      case 'trophy': return <Trophy className="h-4 w-4 text-yellow-500" />
      case 'crown': return <Crown className="h-4 w-4 text-purple-500" />
      case 'flame': return <Flame className="h-4 w-4 text-orange-500" />
      default: return <Trophy className="h-4 w-4 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <div className={`glass-card rounded-xl p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`glass-card rounded-xl p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Atividade Social</h3>
        </div>
        <Link
          href="/social"
          className="text-xs text-primary hover:text-primary/80 flex items-center space-x-1"
        >
          <span>Ver tudo</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-foreground">#{userRank}</div>
          <div className="text-xs text-muted-foreground">Seu Ranking</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-orange-500 flex items-center justify-center space-x-1">
            <Flame className="h-4 w-4" />
            <span>{streak}</span>
          </div>
          <div className="text-xs text-muted-foreground">Dias Seguidos</div>
        </div>
      </div>

      {/* Top Friends */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">🏆 Top Amigos</h4>
        <div className="space-y-2">
          {topFriends.map((friend) => (
            <div key={friend.name} className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-muted-foreground w-4">#{friend.position}</span>
                <span className="text-sm font-medium text-foreground">{friend.name}</span>
              </div>
              <span className="text-xs text-primary font-medium">{friend.xp} XP</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">📢 Atividades Recentes</h4>
        <div className="space-y-3">
          {activities.slice(0, 4).map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="bg-muted/30 p-1.5 rounded-lg flex-shrink-0">
                {getActivityIcon(activity.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.studentName}</span>{' '}
                  <span className="text-muted-foreground">{activity.message}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <Link
          href="/social"
          className="flex items-center justify-center space-x-2 w-full glass-card px-4 py-2 rounded-lg text-sm font-medium premium-hover group"
        >
          <span>Ver Mais Atividades</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}