'use client'

import { Trophy, Star } from 'lucide-react'
import { Progress } from '@/components/ui/Progress'
import { Badge } from '@/components/ui/Badge'
import { calculateLevel } from '@/lib/utils'

interface XpDisplayProps {
  currentXp: number
  className?: string
  showLevel?: boolean
  animated?: boolean
}

export function XpDisplay({
  currentXp,
  className = '',
  showLevel = true,
  animated = true
}: XpDisplayProps) {
  const { level, xpToNext } = calculateLevel(currentXp)
  const xpInCurrentLevel = currentXp % 1000
  const progressPercentage = (xpInCurrentLevel / 1000) * 100

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-semibold text-lg">
            {currentXp.toLocaleString()} XP
          </span>
        </div>
        {showLevel && (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <Star className="h-3 w-3 mr-1" />
            Nível {level}
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progresso para nível {level + 1}</span>
          <span>{xpToNext} XP restantes</span>
        </div>
        <Progress
          value={progressPercentage}
          className={`h-3 ${animated ? 'transition-all duration-500' : ''}`}
        />
      </div>

      <div className="text-xs text-muted-foreground text-center">
        {xpInCurrentLevel} / 1000 XP neste nível
      </div>
    </div>
  )
}