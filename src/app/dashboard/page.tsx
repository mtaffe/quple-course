'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/lib/auth'
import { Button } from '@/components/ui/Button'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { ProgressMap } from '@/components/dashboard/ProgressMap'
import { AchievementShowcase } from '@/components/dashboard/AchievementShowcase'
import { ProgressService, BadgeInfo, AVAILABLE_BADGES } from '@/lib/progress/progressService'
import { challenges } from '@/lib/challenges'
import { LevelAssessmentModal } from '@/components/assessment/LevelAssessmentModal'
import { UserCircle, Settings, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const { user, student, loading, isAuthenticated, clearUser } = useAuth()
  const [studentBadges, setStudentBadges] = useState<BadgeInfo[]>([])
  const [levelInfo, setLevelInfo] = useState<{level: number, xpForNext: number, xpInLevel: number} | null>(null)
  const [showAssessment, setShowAssessment] = useState(false)
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false)

  // Função de logout simples e educativa
  const handleLogout = async () => {
    const confirmLogout = confirm('Tem certeza que deseja sair?')
    if (!confirmLogout) return

    try {
      await signOut()
      clearUser()
      alert('👋 Logout realizado com sucesso!')
      window.location.href = '/'
    } catch (error) {
      console.error('Erro no logout:', error)
      alert('Erro ao fazer logout. Tente novamente.')
    }
  }

  // Função para completar avaliação
  const handleAssessmentComplete = async (level: 'beginner' | 'intermediate' | 'advanced', score: number) => {
    try {
      // Determinar o desafio inicial baseado no nível
      let startingChallenge = 1
      if (level === 'intermediate') {
        startingChallenge = 4
      } else if (level === 'advanced') {
        startingChallenge = 7
      }

      // Aqui você salvaria no Supabase o resultado da avaliação
      // Por agora, vamos apenas simular
      console.log('🎯 Avaliação concluída:', { level, score, startingChallenge })

      // Atualizar estados
      setHasCompletedAssessment(true)
      setShowAssessment(false)

      // Mostrar resultado
      alert(`🎉 Avaliação concluída! Nível: ${level.toUpperCase()}\nPontuação: ${score}%\nVocê começará do Desafio ${startingChallenge}`)

    } catch (error) {
      console.error('Erro ao salvar avaliação:', error)
      alert('Erro ao salvar resultado da avaliação')
    }
  }

  // Função para refazer avaliação
  const handleRetakeAssessment = () => {
    setShowAssessment(true)
  }

  // Carregar dados de progresso do estudante
  useEffect(() => {
    const loadStudentProgress = async () => {
      if (student?.id) {
        try {
          // Carregar badges do estudante
          const badges = await ProgressService.getStudentBadges(student.id)
          setStudentBadges(badges)

          // Calcular informações de nível
          const level = ProgressService.calculateLevel(student.total_xp || 0)
          setLevelInfo(level)

          console.log('📊 Progresso carregado:', { badges, level })
        } catch (error) {
          console.error('Erro ao carregar progresso:', error)
        }
      }
    }

    if (student) {
      loadStudentProgress()
    }
  }, [student])

  // Verificar se precisa mostrar avaliação
  useEffect(() => {
    if (student && !hasCompletedAssessment) {
      // Verificar se já fez a avaliação (aqui você verificaria no Supabase)
      // Por enquanto, vamos considerar que se o current_challenge é 0, precisa fazer avaliação
      if (student.current_challenge === 0) {
        setShowAssessment(true)
      } else {
        setHasCompletedAssessment(true)
      }
    }
  }, [student, hasCompletedAssessment])

  // Verificar se está logado - educativo para jovens entenderem
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      alert('🔐 Você precisa estar logado para acessar o dashboard!')
      window.location.href = '/auth/login'
    }
  }, [loading, isAuthenticated])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Carregando seus dados...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated || !student) {
    return null // Vai redirecionar no useEffect
  }

  const handleStartChallenge = (challengeId: number) => {
    window.location.href = `/challenge/${challengeId}`
  }

  const completedChallenges = Array.from({ length: student.current_challenge - 1 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Modern Header - Mobile Optimized */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-1.5 sm:p-2 flex-shrink-0">
                <UserCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent truncate">
                  Olá, {student.name}! 👋
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {levelInfo ? `Nível ${levelInfo.level} • ${student.total_xp} XP` : 'Carregando...'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <a href="/leaderboard">
                <Button variant="outline" className="hidden sm:flex">
                  🏆 Ranking
                </Button>
                <Button variant="outline" size="sm" className="sm:hidden">
                  🏆
                </Button>
              </a>
              <Button
                onClick={handleRetakeAssessment}
                variant="outline"
                size="sm"
                className="hidden sm:flex"
                title="Refazer Avaliação de Nível"
              >
                🎯
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Mobile Optimized */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8">

        {/* Welcome Hero Section - Mobile Optimized */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Continue Sua Jornada de Aprendizado! 🚀
              </h2>
              <p className="text-base sm:text-xl text-blue-100 mb-4 sm:mb-6 leading-relaxed">
                Você está progredindo muito bem! Cada desafio te deixa mais próximo de ser um desenvolvedor profissional.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold w-full sm:w-auto"
                  onClick={() => handleStartChallenge(student.current_challenge)}
                >
                  🎯 Continuar Desafio {student.current_challenge}
                </Button>
                <a href="/leaderboard" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 w-full"
                  >
                    🏆 Ver Ranking
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Decorative elements - Hidden on mobile for performance */}
          <div className="hidden sm:block absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="hidden sm:block absolute top-1/2 -right-8 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
          <div className="hidden sm:block absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        </div>

        {/* Stats Cards */}
        {levelInfo && (
          <StatsCards
            student={student}
            levelInfo={levelInfo}
            badgeCount={studentBadges.length}
            completedChallenges={completedChallenges.length}
          />
        )}

        {/* Achievement Showcase */}
        <AchievementShowcase
          badges={studentBadges}
          allPossibleBadges={Object.values(AVAILABLE_BADGES)}
        />

        {/* Progress Map */}
        <ProgressMap
          challenges={challenges}
          currentChallenge={student.current_challenge}
          completedChallenges={completedChallenges}
          onStartChallenge={handleStartChallenge}
        />

        {/* Motivational Footer */}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-3">
            <span className="text-2xl">💡</span>
            <p className="text-gray-700 font-medium">
              "A jornada de mil milhas começa com um único passo" - Continue programando!
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Avaliação */}
      <LevelAssessmentModal
        isOpen={showAssessment}
        onComplete={handleAssessmentComplete}
        onClose={hasCompletedAssessment ? () => setShowAssessment(false) : undefined}
        canClose={hasCompletedAssessment}
      />
    </div>
  )
}