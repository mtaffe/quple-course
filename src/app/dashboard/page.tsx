'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useTheme } from '@/hooks/useTheme'
import { DashboardLayout } from '@/components/navigation/DashboardLayout'
import { ContinueLearning } from '@/components/dashboard/ContinueLearning'
import { SocialActivity } from '@/components/dashboard/SocialActivity'
import { RecentAchievements } from '@/components/dashboard/RecentAchievements'
import { LevelAssessmentModal } from '@/components/assessment/LevelAssessmentModal'
import { ProgressService } from '@/lib/progress/progressService'

export default function DashboardPage() {
  const { student, loading, isAuthenticated } = useAuth()
  useAnalytics({
    studentId: student?.id || '',
    autoStart: !!student
  })
  useTheme(student?.id)
  const [showAssessment, setShowAssessment] = useState(false)
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(1)

  // Verificar se precisa mostrar avaliação de nível
  useEffect(() => {
    if (student && student.current_challenge === 0 && !hasCompletedAssessment) {
      const assessmentCompleted = localStorage.getItem(`assessment_completed_${student.id}`)
      if (!assessmentCompleted) {
        setShowAssessment(true)
      } else {
        setHasCompletedAssessment(true)
      }
    }

    if (student?.total_xp) {
      const levelInfo = ProgressService.calculateLevel(student.total_xp)
      setCurrentLevel(levelInfo.level)
    }
  }, [student, hasCompletedAssessment])

  // Função para completar avaliação
  const handleAssessmentComplete = (level: 'beginner' | 'intermediate' | 'advanced', score: number) => {
    try {
      console.log('🎯 Avaliação concluída:', { level, score })

      setHasCompletedAssessment(true)
      setShowAssessment(false)
      localStorage.setItem(`assessment_completed_${student?.id}`, 'true')

      const startingChallenge = level === 'beginner' ? 1 : level === 'intermediate' ? 3 : 5

      alert(`🎉 Avaliação concluída! Nível: ${level.toUpperCase()}\nPontuação: ${score}%\nVocê começará do Desafio ${startingChallenge}`)

    } catch (error) {
      console.error('Erro ao salvar avaliação:', error)
      alert('Erro ao salvar resultado da avaliação')
    }
  }

  // Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  // Não autenticado
  if (!isAuthenticated || !student) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground mb-6">Você precisa estar logado para acessar o dashboard.</p>
          <a
            href="/auth/login"
            className="btn-primary-gradient px-6 py-3 rounded-lg font-semibold"
          >
            Fazer Login
          </a>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      {/* Assessment Modal */}
      {showAssessment && (
        <LevelAssessmentModal
          isOpen={showAssessment}
          onClose={() => setShowAssessment(false)}
          onComplete={handleAssessmentComplete}
        />
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Olá, {student.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          Bem-vindo de volta! Continue sua jornada de aprendizado.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning - Main Section */}
        <div className="lg:col-span-2">
          <ContinueLearning
            studentId={student.id}
            currentChallenge={student.current_challenge || 0}
            totalXP={student.total_xp || 0}
          />
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Social Activity */}
          <SocialActivity studentId={student.id} />

          {/* Recent Achievements */}
          <RecentAchievements
            studentId={student.id}
            totalXP={student.total_xp || 0}
            currentLevel={currentLevel}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <a
          href="/challenges"
          className="glass-card p-4 rounded-lg hover:bg-muted/50 transition-colors group"
        >
          <div className="text-center">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📚</div>
            <div className="text-sm font-medium text-foreground">Todos os Desafios</div>
          </div>
        </a>

        <Link
          href="/learn"
          className="glass-card p-4 rounded-lg hover:bg-muted/50 transition-colors group"
        >
          <div className="text-center">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📖</div>
            <div className="text-sm font-medium text-foreground">Conteúdos</div>
          </div>
        </Link>

        <a
          href="/leaderboard"
          className="glass-card p-4 rounded-lg hover:bg-muted/50 transition-colors group"
        >
          <div className="text-center">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🏆</div>
            <div className="text-sm font-medium text-foreground">Ranking</div>
          </div>
        </a>

        <button
          onClick={() => setShowAssessment(true)}
          className="glass-card p-4 rounded-lg hover:bg-muted/50 transition-colors group"
        >
          <div className="text-center">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
            <div className="text-sm font-medium text-foreground">Nova Avaliação</div>
          </div>
        </button>
      </div>
    </DashboardLayout>
  )
}