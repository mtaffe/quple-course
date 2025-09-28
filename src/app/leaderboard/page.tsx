'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ProgressService } from '@/lib/progress/progressService'
import { LeaderboardCard } from '@/components/leaderboard/LeaderboardCard'
import { DashboardLayout } from '@/components/navigation/DashboardLayout'
import { Button } from '@/components/ui/Button'

interface LeaderboardEntry {
  rank: number
  id: string
  name: string
  total_xp: number
  level: number
  badgeCount: number
  current_challenge: number
}

export default function LeaderboardPage() {
  const { student, loading: authLoading, isAuthenticated } = useAuth()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await ProgressService.getLeaderboard()
        setLeaderboard(data)

        console.log('📊 Leaderboard carregado:', data)
      } catch (error) {
        console.error('Erro ao carregar leaderboard:', error)
        setError('Não foi possível carregar o ranking. Tente novamente.')
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      loadLeaderboard()
    }
  }, [isAuthenticated])

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!isAuthenticated) {
    return null // Vai redirecionar
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Ops! Algo deu errado</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Tentar Novamente
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Ranking 🏆
        </h1>
        <p className="text-muted-foreground">
          Veja como você está se saindo comparado a outros estudantes!
        </p>
      </div>

      <LeaderboardCard
        entries={leaderboard}
        currentStudentId={student?.id || ''}
      />
    </DashboardLayout>
  )
}