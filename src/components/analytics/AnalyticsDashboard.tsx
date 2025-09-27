'use client'

import { useState, useEffect } from 'react'
import { analyticsService } from '@/lib/analytics/analyticsService'
import { Clock, TrendingUp, Target, AlertTriangle, Lightbulb, BarChart3 } from 'lucide-react'

interface AnalyticsDashboardProps {
  studentId: string
  className?: string
}

export function AnalyticsDashboard({ studentId, className = '' }: AnalyticsDashboardProps) {
  const [stats, setStats] = useState<any>(null)
  const [heatmapData, setHeatmapData] = useState<any[]>([])
  const [timeRange, setTimeRange] = useState(7) // últimos 7 dias

  useEffect(() => {
    loadAnalytics()
  }, [studentId, timeRange])

  const loadAnalytics = async () => {
    try {
      const timeStats = await analyticsService.getTimeStatistics(studentId, timeRange)
      const heatmap = await analyticsService.getHeatmapData(studentId)

      setStats(timeStats)
      setHeatmapData(heatmap)
    } catch (error) {
      console.error('Erro ao carregar analytics:', error)
    }
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}min`
    }
    return `${minutes}min`
  }

  const getDifficultyColor = (score: number) => {
    if (score <= 3) return 'bg-green-500'
    if (score <= 6) return 'bg-yellow-500'
    if (score <= 8) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getDifficultyLabel = (score: number) => {
    if (score <= 3) return 'Fácil'
    if (score <= 6) return 'Médio'
    if (score <= 8) return 'Difícil'
    return 'Muito Difícil'
  }

  if (!stats) {
    return (
      <div className={`glass-card rounded-xl p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-8 bg-muted rounded"></div>
            <div className="h-8 bg-muted rounded"></div>
            <div className="h-8 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/20 p-2 rounded-lg">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Analytics de Aprendizado</h3>
            <p className="text-xs text-muted-foreground">
              Insights sobre seu progresso
            </p>
          </div>
        </div>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(Number(e.target.value))}
          className="text-xs bg-background border border-border rounded-lg px-3 py-1"
        >
          <option value={7}>Últimos 7 dias</option>
          <option value={14}>Últimos 14 dias</option>
          <option value={30}>Últimos 30 dias</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tempo Total */}
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tempo Total</p>
              <p className="font-semibold text-foreground">
                {formatTime(stats.totalTime)}
              </p>
            </div>
          </div>
        </div>

        {/* Sessões */}
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sessões</p>
              <p className="font-semibold text-foreground">
                {stats.sessionsCount}
              </p>
            </div>
          </div>
        </div>

        {/* Desafios Concluídos */}
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <Target className="h-4 w-4 text-purple-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Desafios</p>
              <p className="font-semibold text-foreground">
                {stats.challengesCompleted}
              </p>
            </div>
          </div>
        </div>

        {/* Dicas Usadas */}
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500/20 p-2 rounded-lg">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Dicas</p>
              <p className="font-semibold text-foreground">
                {stats.hintsUsed}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Horários Mais Produtivos */}
      <div className="glass-card rounded-xl p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Horários Mais Produtivos
        </h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Pico de atividade:</span>
            <span className="font-medium text-foreground">
              {stats.mostActiveHour}:00h
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tempo médio por sessão:</span>
            <span className="font-medium text-foreground">
              {formatTime(stats.avgSessionTime)}
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Top 3 horários:</span>
            <div className="flex space-x-2">
              {stats.productiveHours.map((hour: number, index: number) => (
                <div
                  key={hour}
                  className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium"
                >
                  {hour}:00h
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap de Dificuldade */}
      {heatmapData.length > 0 && (
        <div className="glass-card rounded-xl p-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Heatmap de Dificuldade
          </h4>

          <div className="space-y-3">
            {heatmapData.slice(-5).map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${getDifficultyColor(data.difficulty_score)}`}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Desafio {data.challenge_id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {data.error_count} erros • {formatTime(data.average_time)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-medium text-foreground">
                    {getDifficultyLabel(data.difficulty_score)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Score: {data.difficulty_score.toFixed(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Legenda */}
          <div className="mt-4 flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-muted-foreground">Fácil</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-muted-foreground">Médio</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-muted-foreground">Difícil</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-muted-foreground">Muito Difícil</span>
            </div>
          </div>
        </div>
      )}

      {/* Insights e Recomendações */}
      <div className="glass-card rounded-xl p-6 border-l-4 border-l-primary">
        <h4 className="font-semibold text-foreground mb-3">
          💡 Insights Personalizados
        </h4>

        <div className="space-y-2 text-sm">
          {stats.totalTime > 3600000 && (
            <p className="text-green-400">
              ✨ Excelente! Você já dedicou mais de 1 hora aos estudos.
            </p>
          )}

          {stats.hintsUsed > stats.challengesCompleted * 2 && (
            <p className="text-yellow-400">
              💡 Você está usando muitas dicas. Tente resolver mais autonomamente!
            </p>
          )}

          {stats.sessionsCount >= 3 && (
            <p className="text-blue-400">
              🔥 Ótima consistência! Continue mantendo o ritmo.
            </p>
          )}

          {stats.errorsCount < stats.challengesCompleted && (
            <p className="text-purple-400">
              🎯 Precisão impressionante! Você está programando com cuidado.
            </p>
          )}

          {stats.productiveHours.length > 0 && (
            <p className="text-indigo-400">
              ⏰ Seu horário mais produtivo é {stats.mostActiveHour}:00h. Aproveite!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}