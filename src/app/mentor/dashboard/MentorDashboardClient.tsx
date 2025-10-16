'use client'

// TODO: Add mentor role authentication middleware
// This page should only be accessible to users with mentor role
// Currently no role gating - security risk for production

import { useState, useEffect } from 'react'
import { MentorAnalyticsService, type StudentProgress } from '@/lib/supabase'
import { Trophy, Target, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MentorDashboardClient() {
  const [students, setStudents] = useState<StudentProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = async () => {
    setIsLoading(true)
    try {
      // TODO: Pegar cohortId do mentor autenticado
      const cohortId = 'default-cohort'
      const data = await MentorAnalyticsService.getStudentsProgress(cohortId)
      setStudents(data)
    } catch (err) {
      console.error('Erro ao carregar progresso:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const totalStudents = students.length
  const avgXP = students.reduce((sum, s) => sum + s.totalXP, 0) / (totalStudents || 1)
  const avgChallenges = students.reduce((sum, s) => sum + s.completedChallenges, 0) / (totalStudents || 1)
  const avgProjects = students.reduce((sum, s) => sum + s.completedProjects, 0) / (totalStudents || 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard do Mentor
          </h1>
          <p className="text-muted-foreground">
            Acompanhe o progresso do seu cohort
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
          </div>
        )}

        {!isLoading && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">XP Médio</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">{Math.round(avgXP)}</p>
              </div>

              <div className="glass-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-foreground">Desafios Médios</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">{Math.round(avgChallenges)}</p>
              </div>

              <div className="glass-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold text-foreground">Projetos Médios</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">{avgProjects.toFixed(1)}</p>
              </div>

              <div className="glass-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold text-foreground">Total Alunos</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">{totalStudents}</p>
              </div>
            </div>

            {/* Students Progress Cards */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Progresso Individual
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.map((student) => (
                  <StudentProgressCard key={student.studentId} student={student} />
                ))}
              </div>
            </div>

            {/* Weekly Progress Grid */}
            <div className="glass-card p-6 rounded-lg border border-border overflow-x-auto">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Progresso Semanal (Grid)
              </h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground sticky left-0 bg-background">
                      Aluno
                    </th>
                    {Array.from({ length: 12 }, (_, i) => (
                      <th key={i} className="text-center py-3 px-2 font-semibold text-foreground text-sm">
                        S{i + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.studentId} className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium text-foreground sticky left-0 bg-background">
                        {student.studentName}
                      </td>
                      {student.weeklyProgress.map((week) => (
                        <td key={week.weekNumber} className="py-3 px-2 text-center">
                          <WeekStatusBadge
                            challengesCompleted={week.challengesCompleted}
                            projectStatus={week.projectStatus}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StudentProgressCard({ student }: { student: StudentProgress }) {
  const completedWeeks = student.weeklyProgress.filter(
    w => w.projectStatus === 'approved'
  ).length

  return (
    <div className="glass-card p-6 rounded-lg border border-border">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">{student.studentName}</h3>
          <p className="text-sm text-muted-foreground">{student.studentEmail}</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
          {student.totalXP} XP
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Semanas Completas:</span>
          <span className="font-semibold text-foreground">{completedWeeks}/12</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Desafios:</span>
          <span className="font-semibold text-foreground">{student.completedChallenges}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Projetos Aprovados:</span>
          <span className="font-semibold text-foreground">{student.completedProjects}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${(completedWeeks / 12) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1 text-center">
          {Math.round((completedWeeks / 12) * 100)}% completo
        </p>
      </div>
    </div>
  )
}

function WeekStatusBadge({
  challengesCompleted,
  projectStatus,
}: {
  challengesCompleted: number
  projectStatus: string
}) {
  if (projectStatus === 'approved') {
    return (
      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
      </div>
    )
  }

  if (projectStatus === 'submitted' || projectStatus === 'needs_revision') {
    return (
      <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mx-auto">
        <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
      </div>
    )
  }

  if (challengesCompleted > 0) {
    return (
      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto">
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
          {challengesCompleted}
        </span>
      </div>
    )
  }

  return (
    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mx-auto">
      <span className="text-xs text-muted-foreground">-</span>
    </div>
  )
}
