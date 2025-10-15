'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen, CheckCircle2, Clock, Trophy, ChevronRight } from 'lucide-react'
import { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardContent } from '@/components/ui/premium-card'
import { PremiumButton } from '@/components/ui/premium-button'
import { PremiumBadge } from '@/components/ui/premium-badge'
import { getModuleByWeek } from '@/lib/learning/weekly-modules'
import type { StudentWeekProgress } from '@/types/weekly-modules'

interface CurrentWeekProgressProps {
  studentId: string
  currentWeek?: number
}

export function CurrentWeekProgress({ studentId, currentWeek = 1 }: CurrentWeekProgressProps) {
  const [progress, setProgress] = useState<StudentWeekProgress | null>(null)
  const weekModule = getModuleByWeek(currentWeek)

  useEffect(() => {
    const mockProgress: StudentWeekProgress = {
      studentId: studentId,
      weekId: `week-${currentWeek}`,
      status: 'in_progress',
      theoryProgress: {
        sectionsCompleted: ['section-1', 'section-2'],
        readingTime: 45
      },
      challengesProgress: [
        { challengeId: 'c1', status: 'completed', attempts: 2, xpEarned: 50 },
        { challengeId: 'c2', status: 'completed', attempts: 1, xpEarned: 50 },
        { challengeId: 'c3', status: 'completed', attempts: 3, xpEarned: 50 },
        { challengeId: 'c4', status: 'in_progress', attempts: 1, xpEarned: 0 },
        { challengeId: 'c5', status: 'not_started', attempts: 0, xpEarned: 0 },
      ],
      projectProgress: {
        status: 'not_started',
      },
      preClassChecklistCompleted: false,
      readyForLiveClass: false,
      totalXPEarned: 150,
      totalTimeSpent: 180
    }
    setProgress(mockProgress)
  }, [studentId, currentWeek])

  if (!weekModule || !progress) return null

  const totalSections = weekModule.theoryContent.sections.length
  const theoryPercent = Math.round((progress.theoryProgress.sectionsCompleted.length / totalSections) * 100)
  
  const completedChallenges = progress.challengesProgress.filter(c => c.status === 'completed').length
  const totalChallenges = progress.challengesProgress.length
  const challengesPercent = Math.round((completedChallenges / totalChallenges) * 100)
  
  const checklistItems = weekModule.preClassChecklist.items.length
  const checklistCompleted = progress.preClassChecklistCompleted ? checklistItems : Math.floor(checklistItems * 0.7)
  const checklistPercent = Math.round((checklistCompleted / checklistItems) * 100)

  return (
    <PremiumCard hover>
      <PremiumCardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <PremiumCardTitle>Semana Atual - Semana {currentWeek}</PremiumCardTitle>
            </div>
            <p className="text-sm text-muted-foreground">{weekModule.title}</p>
          </div>
          <PremiumBadge variant={weekModule.difficulty === 'beginner' ? 'success' : weekModule.difficulty === 'intermediate' ? 'warning' : 'error'}>
            {weekModule.difficulty === 'beginner' ? 'Iniciante' : weekModule.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
          </PremiumBadge>
        </div>
      </PremiumCardHeader>
      
      <PremiumCardContent className="space-y-4">
        {/* Theory Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Teoria</span>
            <span className="text-foreground font-medium">{theoryPercent}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-premium from-violet-500 to-purple-600 transition-all duration-500"
              style={{ width: `${theoryPercent}%` }}
            />
          </div>
        </div>

        {/* Challenges Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Desafios</span>
            <span className="text-foreground font-medium">{completedChallenges}/{totalChallenges} completos</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-premium from-blue-500 to-cyan-600 transition-all duration-500"
              style={{ width: `${challengesPercent}%` }}
            />
          </div>
        </div>

        {/* Project Status */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-sm font-medium text-foreground">Projeto Semanal</p>
              <p className="text-xs text-muted-foreground">{weekModule.weeklyProject.title}</p>
            </div>
          </div>
          {progress.projectProgress.status === 'approved' ? (
            <CheckCircle2 className="h-5 w-5 text-green-400" />
          ) : progress.projectProgress.status === 'submitted' ? (
            <Clock className="h-5 w-5 text-yellow-400" />
          ) : (
            <PremiumBadge variant="warning" size="sm">Pendente</PremiumBadge>
          )}
        </div>

        {/* Checklist Progress */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Checklist Pré-Aula</span>
          <span className="text-foreground font-medium">{checklistCompleted}/{checklistItems}</span>
        </div>

        {/* Action Button */}
        <Link href={`/learn/week/${currentWeek}`} className="block">
          <PremiumButton variant="primary" className="w-full">
            Continuar Estudando
            <ChevronRight className="h-4 w-4 ml-2" />
          </PremiumButton>
        </Link>
      </PremiumCardContent>
    </PremiumCard>
  )
}
