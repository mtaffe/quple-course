'use client'

import { Play, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardContent } from '@/components/ui/premium-card'
import { PremiumButton } from '@/components/ui/premium-button'

interface ContinueFromWhereYouLeftProps {
  lastActivity?: {
    type: 'theory' | 'challenge' | 'project'
    title: string
    weekNumber: number
    progress?: number
  }
}

export function ContinueFromWhereYouLeft({ 
  lastActivity = {
    type: 'challenge',
    title: 'Desafio 4: Grid de Habilidades',
    weekNumber: 3,
    progress: 60
  }
}: ContinueFromWhereYouLeftProps) {
  const activityIcons = {
    theory: '📖',
    challenge: '💻',
    project: '🚀'
  }

  const activityLabels = {
    theory: 'Teoria',
    challenge: 'Desafio',
    project: 'Projeto'
  }

  return (
    <PremiumCard hover className="bg-gradient-to-br from-violet-500/10 to-purple-600/5">
      <PremiumCardHeader>
        <div className="flex items-center gap-2">
          <Play className="h-5 w-5 text-primary" />
          <PremiumCardTitle>Continue de Onde Parou</PremiumCardTitle>
        </div>
      </PremiumCardHeader>
      
      <PremiumCardContent>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-premium from-violet-500 to-purple-600 flex items-center justify-center text-2xl shadow-glow-sm">
            {activityIcons[lastActivity.type]}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-1">
              Semana {lastActivity.weekNumber} • {activityLabels[lastActivity.type]}
            </p>
            <p className="text-sm font-medium text-foreground mb-3">
              {lastActivity.title}
            </p>
            
            {lastActivity.progress !== undefined && (
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="text-foreground font-medium">{lastActivity.progress}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-premium from-violet-500 to-purple-600 transition-all duration-500"
                    style={{ width: `${lastActivity.progress}%` }}
                  />
                </div>
              </div>
            )}

            <Link href={`/learn/week/${lastActivity.weekNumber}`}>
              <PremiumButton variant="ghost" size="sm" className="w-full justify-between">
                <span>Continuar</span>
                <ArrowRight className="h-4 w-4" />
              </PremiumButton>
            </Link>
          </div>
        </div>
      </PremiumCardContent>
    </PremiumCard>
  )
}
