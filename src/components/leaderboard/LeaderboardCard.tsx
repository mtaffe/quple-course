'use client'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Trophy, Medal, Award } from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  id: string
  name: string
  total_xp: number
  level: number
  badgeCount: number
  current_challenge: number
}

interface LeaderboardCardProps {
  entries: LeaderboardEntry[]
  currentStudentId?: string
  loading?: boolean
}

export function LeaderboardCard({ entries, currentStudentId, loading }: LeaderboardCardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />
      default:
        return <span className="text-sm font-bold text-gray-500">#{rank}</span>
    }
  }

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300'
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300'
      case 3:
        return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300'
      default:
        return 'bg-white border-gray-200'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            🏆 Ranking dos Estudantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg animate-pulse">
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            🏆 Ranking dos Estudantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum estudante encontrado ainda!</p>
            <p className="text-sm">Seja o primeiro a completar um desafio 🚀</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          🏆 Ranking dos Estudantes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md ${
                getRankBg(entry.rank)
              } ${
                entry.id === currentStudentId ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(entry.rank)}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">
                      {entry.name}
                      {entry.id === currentStudentId && (
                        <span className="text-blue-600 text-sm ml-2">(Você)</span>
                      )}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      Nível {entry.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Desafio {entry.current_challenge} • {entry.badgeCount} conquistas
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">
                  {entry.total_xp.toLocaleString()} XP
                </div>
              </div>
            </div>
          ))}
        </div>

        {entries.length >= 10 && (
          <div className="text-center mt-4 text-sm text-gray-500">
            Mostrando top 10 estudantes
          </div>
        )}
      </CardContent>
    </Card>
  )
}