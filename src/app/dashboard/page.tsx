'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/lib/auth'
import { Button } from '@/components/ui/Button'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { ProgressMap } from '@/components/dashboard/ProgressMap'
import { AchievementShowcase } from '@/components/dashboard/AchievementShowcase'
import { WhatToDoNow } from '@/components/dashboard/WhatToDoNow'
import { DailyGoals } from '@/components/dashboard/DailyGoals'
import { OnboardingFlow } from '@/components/dashboard/OnboardingFlow'
import { useCelebration } from '@/components/dashboard/CelebrationToast'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useTheme } from '@/hooks/useTheme'
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard'
import { SocialDashboard } from '@/components/social/SocialDashboard'
import { PersonalizationSettings } from '@/components/settings/PersonalizationSettings'
import { ProgressService, BadgeInfo, AVAILABLE_BADGES } from '@/lib/progress/progressService'
import { challenges } from '@/lib/challenges'
import { LevelAssessmentModal } from '@/components/assessment/LevelAssessmentModal'
import { UserCircle, Settings, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const { student, loading, isAuthenticated, clearUser } = useAuth()
  const { celebrate, CelebrationComponent } = useCelebration()
  const { trackGoalCompletion, trackEvent } = useAnalytics({
    studentId: student?.id || '',
    autoStart: !!student
  })
  useTheme(student?.id)
  const [studentBadges, setStudentBadges] = useState<BadgeInfo[]>([])
  const [levelInfo, setLevelInfo] = useState<{level: number, xpForNext: number, xpInLevel: number} | null>(null)
  const [showAssessment, setShowAssessment] = useState(false)
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

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

  // Função para completar onboarding
  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true)
    setShowOnboarding(false)
    localStorage.setItem(`onboarding_completed_${student?.id}`, 'true')

    // Após onboarding, mostrar avaliação se necessário
    if (student?.current_challenge === 0) {
      setShowAssessment(true)
    }
  }

  // Função para pular onboarding
  const handleOnboardingSkip = () => {
    setHasCompletedOnboarding(true)
    setShowOnboarding(false)
    localStorage.setItem(`onboarding_completed_${student?.id}`, 'true')
  }

  // Carregar dados de progresso do estudante
  useEffect(() => {
    const loadStudentProgress = async () => {
      if (student?.id) {
        try {
          // Carregar badges do estudante
          const badges = await ProgressService.getStudentBadges(student.id)
          const previousBadges = studentBadges
          setStudentBadges(badges)

          // Verificar se ganhou novos badges
          if (previousBadges.length > 0 && badges.length > previousBadges.length) {
            const newBadges = badges.filter(badge =>
              !previousBadges.some(prev => prev.id === badge.id)
            )

            newBadges.forEach(badge => {
              celebrate({
                id: `badge_${badge.id}`,
                type: 'badge',
                title: badge.name,
                description: badge.description,
                value: 50,
                celebration: badge.category === 'special' ? 'epic' : 'special'
              })
            })
          }

          // Calcular informações de nível
          const level = ProgressService.calculateLevel(student.total_xp || 0)
          const previousLevel = levelInfo?.level || 1
          setLevelInfo(level)

          // Verificar se subiu de nível
          if (levelInfo && level.level > previousLevel) {
            celebrate({
              id: `level_${level.level}`,
              type: 'level',
              title: `Nível ${level.level}`,
              description: `Incrível! Você alcançou o nível ${level.level}!`,
              value: level.level * 100,
              celebration: level.level >= 5 ? 'epic' : 'special'
            })
          }

          console.log('📊 Progresso carregado:', { badges, level })
        } catch (error) {
          console.error('Erro ao carregar progresso:', error)
        }
      }
    }

    if (student) {
      loadStudentProgress()
    }
  }, [student, celebrate])

  // Verificar se é um novo usuário e precisa de onboarding
  useEffect(() => {
    if (student) {
      const onboardingCompleted = localStorage.getItem(`onboarding_completed_${student.id}`)

      if (!onboardingCompleted) {
        // Novo usuário - mostrar onboarding primeiro
        setShowOnboarding(true)
        setHasCompletedOnboarding(false)
      } else {
        setHasCompletedOnboarding(true)
      }
    }
  }, [student])

  // Verificar se precisa mostrar avaliação
  useEffect(() => {
    if (student && hasCompletedOnboarding && !hasCompletedAssessment) {
      // Verificar se já fez a avaliação (aqui você verificaria no Supabase)
      // Por enquanto, vamos considerar que se o current_challenge é 0, precisa fazer avaliação
      if (student.current_challenge === 0) {
        setShowAssessment(true)
      } else {
        setHasCompletedAssessment(true)
      }
    }
  }, [student, hasCompletedOnboarding, hasCompletedAssessment])

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-muted-foreground">Carregando seus dados...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated || !student) {
    return null // Vai redirecionar no useEffect
  }

  const handleStartChallenge = (challengeId: number) => {
    // Verificar se acabou de completar um desafio
    if (challengeId > student.current_challenge) {
      const completedChallenge = challenges.find(c => c.id === student.current_challenge)
      if (completedChallenge) {
        celebrate({
          id: `challenge_${student.current_challenge}`,
          type: 'challenge',
          title: completedChallenge.title,
          description: `Fantástico! Você dominou mais uma habilidade importante!`,
          value: 100,
          celebration: student.current_challenge >= 5 ? 'special' : 'normal'
        })
      }
    }

    window.location.href = `/challenge/${challengeId}`
  }

  const completedChallenges = Array.from({ length: student.current_challenge - 1 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header - Mobile Optimized */}
      <div className="glass-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="btn-primary-gradient rounded-full p-1.5 sm:p-2 flex-shrink-0">
                <UserCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">
                  Olá, {student.name}! 👋
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm">
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
              <Button
                onClick={() => setShowSettings(true)}
                variant="outline"
                size="sm"
                className="hidden sm:flex premium-hover"
                title="Personalização"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Mobile Optimized */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8">

        {/* Widget "O que fazer agora" - Direcionamento Personalizado */}
        <WhatToDoNow
          student={student}
          onStartChallenge={handleStartChallenge}
        />

        {/* Metas Diárias - Sistema Adaptável */}
        <DailyGoals
          studentId={student.id}
          onGoalComplete={(goal) => {
            // Analytics tracking
            trackGoalCompletion(goal.type, goal.targetValue)

            // Celebração
            celebrate({
              id: `goal_${goal.id}`,
              type: 'goal',
              title: goal.title,
              description: `Parabéns! Você completou sua meta de ${goal.targetValue} ${goal.unit}`,
              value: 25,
              celebration: goal.targetValue >= 60 ? 'special' : 'normal'
            })
          }}
        />

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

        {/* Analytics Dashboard */}
        <AnalyticsDashboard
          studentId={student.id}
        />

        {/* Social Dashboard */}
        <SocialDashboard
          studentId={student.id}
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
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-3">
            <span className="text-2xl">💡</span>
            <p className="text-foreground font-medium">
&quot;A jornada de mil milhas começa com um único passo&quot; - Continue programando!
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Onboarding */}
      {showOnboarding && (
        <OnboardingFlow
          studentName={student.name}
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}

      {/* Modal de Avaliação */}
      <LevelAssessmentModal
        isOpen={showAssessment}
        onComplete={handleAssessmentComplete}
        onClose={hasCompletedAssessment ? () => setShowAssessment(false) : undefined}
        canClose={hasCompletedAssessment}
      />

      {/* Modal de Personalização */}
      {showSettings && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowSettings(false)} />
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <PersonalizationSettings
                studentId={student.id}
                onClose={() => setShowSettings(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Sistema de Celebração */}
      <CelebrationComponent />
    </div>
  )
}