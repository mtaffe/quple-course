'use client'

import { useAuth } from '@/hooks/useAuth'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useTheme } from '@/hooks/useTheme'
import { DashboardLayout } from '@/components/navigation/DashboardLayout'
import { NextLiveClass } from '@/components/dashboard/NextLiveClass'
import { CurrentWeekProgress } from '@/components/dashboard/CurrentWeekProgress'
import { ContinueFromWhereYouLeft } from '@/components/dashboard/ContinueFromWhereYouLeft'
import { RecentAchievements } from '@/components/dashboard/RecentAchievements'
import { Trophy, Sparkles, TrendingUp } from 'lucide-react'
import { PremiumCard, PremiumCardContent } from '@/components/ui/premium-card'
import { calculateLevel } from '@/lib/utils'

export default function DashboardPage() {
  const { student, loading, isAuthenticated } = useAuth()
  useAnalytics({
    studentId: student?.id || '',
    autoStart: !!student
  })
  useTheme(student?.id)

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!isAuthenticated || !student) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <PremiumCard className="max-w-md w-full text-center">
            <PremiumCardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-premium from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3">Acesso Restrito</h1>
              <p className="text-muted-foreground mb-6">Você precisa estar logado para acessar o hub do aluno.</p>
              <a
                href="/auth/login"
                className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-gradient-premium from-violet-500 to-purple-600 text-white font-medium shadow-premium hover:shadow-premium-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Fazer Login
              </a>
            </PremiumCardContent>
          </PremiumCard>
        </div>
      </DashboardLayout>
    )
  }

  const levelInfo = calculateLevel(student.total_xp || 0)

  return (
    <DashboardLayout>
      {/* Header with Welcome Message */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            Bem-vindo de volta, {student.name?.split(' ')[0]}!
          </h1>
          <Sparkles className="h-7 w-7 text-yellow-400 animate-pulse" />
        </div>
        <p className="text-muted-foreground text-lg">
          Continue sua jornada rumo ao desenvolvimento fullstack profissional
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-fade-in">
        <PremiumCard className="bg-gradient-to-br from-violet-500/10 to-transparent">
          <PremiumCardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nível Atual</p>
                <p className="text-2xl font-bold text-foreground">{levelInfo.level}</p>
              </div>
              <Trophy className="h-8 w-8 text-violet-400" />
            </div>
          </PremiumCardContent>
        </PremiumCard>

        <PremiumCard className="bg-gradient-to-br from-purple-500/10 to-transparent">
          <PremiumCardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total XP</p>
                <p className="text-2xl font-bold text-foreground">{student.total_xp || 0}</p>
              </div>
              <Sparkles className="h-8 w-8 text-purple-400" />
            </div>
          </PremiumCardContent>
        </PremiumCard>

        <PremiumCard className="bg-gradient-to-br from-blue-500/10 to-transparent">
          <PremiumCardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Sequência</p>
                <p className="text-2xl font-bold text-foreground">0 dias</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </PremiumCardContent>
        </PremiumCard>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Live Class */}
          <div className="animate-fade-in-up animation-delay-100">
            <NextLiveClass />
          </div>

          {/* Current Week Progress */}
          <div className="animate-fade-in-up animation-delay-200">
            <CurrentWeekProgress studentId={student.id} currentWeek={1} />
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Continue From Where You Left */}
          <div className="animate-fade-in-up animation-delay-150">
            <ContinueFromWhereYouLeft />
          </div>

          {/* Recent Achievements */}
          <div className="animate-fade-in-up animation-delay-250">
            <RecentAchievements
              studentId={student.id}
              totalXP={student.total_xp || 0}
              currentLevel={levelInfo.level}
            />
          </div>
        </div>
      </div>

      {/* Quick Access Info Card */}
      <div className="animate-fade-in-up animation-delay-300">
        <PremiumCard className="bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-blue-500/5">
          <PremiumCardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-premium from-violet-500 to-purple-600 flex items-center justify-center shadow-glow-sm">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Dica do Dia</h3>
                <p className="text-sm text-muted-foreground">
                  Complete o checklist pré-aula antes da próxima sessão ao vivo para aproveitar ao máximo a mentoria. 
                  Isso garante que você chegue preparado e possa tirar dúvidas mais avançadas!
                </p>
              </div>
            </div>
          </PremiumCardContent>
        </PremiumCard>
      </div>
    </DashboardLayout>
  )
}
