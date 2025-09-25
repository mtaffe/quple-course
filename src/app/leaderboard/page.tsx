'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ProgressService } from '@/lib/progress/progressService'
import { LeaderboardCard } from '@/components/leaderboard/LeaderboardCard'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Home, Users } from 'lucide-react'

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
        console.log('🏆 Carregando ranking...')

        const data = await ProgressService.getLeaderboard(10)
        setLeaderboard(data)

        console.log('📊 Ranking carregado:', data)
      } catch (err) {
        console.error('❌ Erro ao carregar ranking:', err)
        setError('Erro ao carregar ranking. Tente novamente.')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  // Verificar autenticação
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      alert('🔐 Você precisa estar logado para ver o ranking!')
      window.location.href = '/auth/login'
    }
  }, [authLoading, isAuthenticated])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Vai redirecionar
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold mb-2">Ops! Algo deu errado</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Tentar Novamente
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                🏆 Ranking dos Estudantes
              </h1>
              <p className="text-gray-600 mt-1">
                Veja como você está se saindo comparado a outros estudantes!
              </p>
            </div>

            <div className="flex space-x-3">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Estatísticas rápidas */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              📊 Estatísticas da Comunidade
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{leaderboard.length}</div>
                <div className="text-sm text-gray-600">Estudantes Ativos</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {leaderboard.reduce((acc, entry) => acc + entry.total_xp, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">XP Total da Comunidade</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {leaderboard.length > 0 ? Math.max(...leaderboard.map(e => e.current_challenge)) : 0}
                </div>
                <div className="text-sm text-gray-600">Desafio Mais Avançado</div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <LeaderboardCard
            entries={leaderboard}
            currentStudentId={student?.id}
            loading={loading}
          />

          {/* Call to Action */}
          {student && leaderboard.length > 0 && (
            <div className="mt-6 text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2">
                  🚀 Continue Programando!
                </h3>
                <p className="text-blue-100 mb-4">
                  Complete mais desafios para subir no ranking e desbloquear novas conquistas!
                </p>
                <Link href="/dashboard">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    Voltar aos Desafios
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}