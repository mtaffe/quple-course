'use client'

import { DashboardLayout } from '@/components/navigation/DashboardLayout'
import { ProgressMap } from '@/components/dashboard/ProgressMap'
import { useAuth } from '@/hooks/useAuth'
import { challenges } from '@/lib/challenges'

export default function ChallengesPage() {
  const { student, loading } = useAuth()

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Desafios 📚
        </h1>
        <p className="text-muted-foreground">
          Explore todos os desafios disponíveis e acompanhe seu progresso.
        </p>
      </div>

      <ProgressMap
        challenges={challenges}
        currentChallenge={student?.current_challenge || 0}
        completedChallenges={[]}
        onStartChallenge={(id) => window.location.href = `/challenge/${id}`}
      />
    </DashboardLayout>
  )
}