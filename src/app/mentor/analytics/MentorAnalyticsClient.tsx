'use client'

// TODO: Add mentor role authentication middleware
// This page should only be accessible to users with mentor role
// Currently no role gating - security risk for production

import { useState, useEffect } from 'react'
import { MentorAnalyticsService, type ChallengeAnalytics } from '@/lib/supabase'
import { TrendingDown, TrendingUp, Users, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MentorAnalyticsClient() {
  const [analytics, setAnalytics] = useState<ChallengeAnalytics[]>([])
  const [strugglingStudents, setStrugglingStudents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    setIsLoading(true)
    try {
      // TODO: Pegar cohortId do mentor autenticado
      const cohortId = 'default-cohort'
      
      const [challengeData, struggling] = await Promise.all([
        MentorAnalyticsService.getChallengeAnalytics(),
        MentorAnalyticsService.getStrugglingStudents(cohortId, 3),
      ])

      setAnalytics(challengeData)
      setStrugglingStudents(struggling)
    } catch (err) {
      console.error('Erro ao carregar analytics:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 70) return 'text-green-600 dark:text-green-400'
    if (rate >= 40) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const difficultChallenges = analytics.filter(a => a.successRate < 50)
  const easyChallenges = analytics.filter(a => a.successRate >= 80)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Analytics de Desafios
          </h1>
          <p className="text-muted-foreground">
            Identifique padrões e dificuldades dos alunos
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
          </div>
        )}

        {!isLoading && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                  <h3 className="font-semibold text-foreground">Desafios Difíceis</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">{difficultChallenges.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Taxa de sucesso &lt; 50%</p>
              </div>

              <div className="glass-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold text-foreground">Desafios Fáceis</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">{easyChallenges.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Taxa de sucesso ≥ 80%</p>
              </div>

              <div className="glass-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold text-foreground">Alunos com Dificuldade</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">{strugglingStudents.length}</p>
                <p className="text-sm text-muted-foreground mt-1">3+ tentativas sem sucesso</p>
              </div>
            </div>

            {/* Struggling Students */}
            {strugglingStudents.length > 0 && (
              <div className="glass-card p-6 rounded-lg border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  Alunos Precisando de Suporte
                </h2>
                <div className="space-y-3">
                  {strugglingStudents.map((student, idx) => (
                    <div key={idx} className="bg-muted/30 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{student.studentName}</p>
                        <p className="text-sm text-muted-foreground">{student.challengeTitle}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-sm font-medium">
                        {student.attemptCount} tentativas
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenge Analytics Table */}
            <div className="glass-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Todos os Desafios
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Desafio</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Semana</th>
                      <th className="text-center py-3 px-4 font-semibold text-foreground">Alunos</th>
                      <th className="text-center py-3 px-4 font-semibold text-foreground">Tentativas</th>
                      <th className="text-center py-3 px-4 font-semibold text-foreground">Taxa de Sucesso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.map((challenge) => (
                      <tr key={challenge.challengeId} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="py-3 px-4 text-foreground">{challenge.challengeTitle}</td>
                        <td className="py-3 px-4 text-muted-foreground">Semana {challenge.weekNumber}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {challenge.uniqueStudents}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-muted-foreground">
                          {challenge.totalAttempts}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={cn('font-semibold', getSuccessRateColor(challenge.successRate))}>
                            {challenge.successRate.toFixed(0)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
