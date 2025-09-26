'use client'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  Award,
  Code,
  Palette,
  Zap,
  Target,
  Crown,
  Flame,
  CheckCircle,
  type LucideIcon
} from 'lucide-react'

interface BadgeDisplayProps {
  badges: string[]
  className?: string
  layout?: 'grid' | 'row'
  showCount?: boolean
}

interface BadgeDisplayData {
  id: string
  name: string
  description: string
  icon: LucideIcon
  color: string
}

const badgeData: Record<string, BadgeDisplayData> = {
  'first-code': {
    id: 'first-code',
    name: 'Primeiro Código',
    description: 'Escreveu seu primeiro código!',
    icon: Code,
    color: 'bg-blue-500',
  },
  'html-master': {
    id: 'html-master',
    name: 'Mestre HTML',
    description: 'Dominou os fundamentos do HTML',
    icon: CheckCircle,
    color: 'bg-orange-500',
  },
  'css-wizard': {
    id: 'css-wizard',
    name: 'Mago CSS',
    description: 'Criou designs incríveis com CSS',
    icon: Palette,
    color: 'bg-pink-500',
  },
  'js-ninja': {
    id: 'js-ninja',
    name: 'Ninja JavaScript',
    description: 'Dominou a interatividade com JS',
    icon: Zap,
    color: 'bg-yellow-500',
  },
  'bug-hunter': {
    id: 'bug-hunter',
    name: 'Caçador de Bugs',
    description: 'Encontrou e corrigiu muitos bugs',
    icon: Target,
    color: 'bg-red-500',
  },
  'streak-warrior': {
    id: 'streak-warrior',
    name: 'Guerreiro Consistente',
    description: '7 dias consecutivos programando',
    icon: Flame,
    color: 'bg-orange-600',
  },
  'perfectionist': {
    id: 'perfectionist',
    name: 'Perfeccionista',
    description: 'Completou desafio com 100% de score',
    icon: Crown,
    color: 'bg-purple-500',
  },
  'speed-demon': {
    id: 'speed-demon',
    name: 'Demônio da Velocidade',
    description: 'Completou desafio em tempo recorde',
    icon: Award,
    color: 'bg-green-500',
  }
}

export function BadgeDisplay({
  badges,
  className = '',
  layout = 'grid',
  showCount = true
}: BadgeDisplayProps) {
  const earnedBadges = badges.map(id => badgeData[id]).filter(Boolean)
  const totalPossibleBadges = Object.keys(badgeData).length

  if (earnedBadges.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Badges</span>
            {showCount && (
              <Badge variant="outline">0 / {totalPossibleBadges}</Badge>
            )}
          </CardTitle>
          <CardDescription>
            Complete desafios para desbloquear badges!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Award className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Nenhuma badge desbloqueada ainda</p>
            <p className="text-sm">Continue praticando!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Badges Conquistadas</span>
          {showCount && (
            <Badge variant="secondary">
              {earnedBadges.length} / {totalPossibleBadges}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Suas conquistas no aprendizado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`${
          layout === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-3 gap-4'
            : 'flex flex-wrap gap-2'
        }`}>
          {earnedBadges.map((badge) => {
            const IconComponent = badge.icon
            return (
              <div
                key={badge.id}
                className={`${
                  layout === 'grid'
                    ? 'flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow'
                    : 'flex items-center space-x-2 px-3 py-2 bg-muted rounded-full'
                }`}
              >
                <div className={`${badge.color} p-2 rounded-full`}>
                  <IconComponent className="h-4 w-4 text-white" />
                </div>
                <div className={`${
                  layout === 'grid' ? 'text-center mt-2' : 'flex-1'
                }`}>
                  <h4 className={`font-medium ${
                    layout === 'grid' ? 'text-sm' : 'text-xs'
                  }`}>
                    {badge.name}
                  </h4>
                  {layout === 'grid' && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {badge.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {earnedBadges.length === totalPossibleBadges && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full animate-bounce-subtle">
              <Crown className="h-5 w-5" />
              <span className="font-bold">Todas as badges conquistadas! 🎉</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}