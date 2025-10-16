'use client'

// TODO: Add mentor role authentication middleware
// This page should only be accessible to users with mentor role
// Currently no role gating - security risk for production

import { useState, useEffect } from 'react'
import { MentorAnalyticsService, type PendingSubmission, type ReviewedSubmission } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, Clock, AlertCircle, ExternalLink, Github, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function MentorProjectsClient() {
  const [activeTab, setActiveTab] = useState<'pending' | 'reviewed'>('pending')
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingSubmission[]>([])
  const [reviewedSubmissions, setReviewedSubmissions] = useState<ReviewedSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterWeek, setFilterWeek] = useState<number | null>(null)

  useEffect(() => {
    loadSubmissions()
  }, [])

  const loadSubmissions = async () => {
    setIsLoading(true)
    try {
      const [pending, reviewed] = await Promise.all([
        MentorAnalyticsService.getPendingSubmissions(),
        MentorAnalyticsService.getReviewedSubmissions(),
      ])
      setPendingSubmissions(pending)
      setReviewedSubmissions(reviewed)
    } catch (err) {
      console.error('Erro ao carregar submissões:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredPending = filterWeek
    ? pendingSubmissions.filter(s => s.weekNumber === filterWeek)
    : pendingSubmissions

  const filteredReviewed = filterWeek
    ? reviewedSubmissions.filter(s => s.weekNumber === filterWeek)
    : reviewedSubmissions

  const uniqueWeeks = Array.from(
    new Set([...pendingSubmissions, ...reviewedSubmissions].map(s => s.weekNumber))
  ).sort((a, b) => a - b)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Projetos para Revisar
          </h1>
          <p className="text-muted-foreground">
            Avalie os projetos semanais dos seus alunos
          </p>
        </div>

        {/* Tabs + Filter */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('pending')}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-colors',
                activeTab === 'pending'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Pendentes ({pendingSubmissions.length})
            </button>
            <button
              onClick={() => setActiveTab('reviewed')}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-colors',
                activeTab === 'reviewed'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              <CheckCircle2 className="w-4 h-4 inline mr-2" />
              Revisados ({reviewedSubmissions.length})
            </button>
          </div>

          {/* Week Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={filterWeek || ''}
              onChange={(e) => setFilterWeek(e.target.value ? parseInt(e.target.value) : null)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="">Todas as Semanas</option>
              {uniqueWeeks.map(week => (
                <option key={week} value={week}>Semana {week}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
          </div>
        )}

        {/* Pending Submissions */}
        {!isLoading && activeTab === 'pending' && (
          <div className="space-y-4">
            {filteredPending.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {filterWeek 
                    ? `Nenhum projeto pendente na Semana ${filterWeek}`
                    : 'Nenhum projeto pendente de review'}
                </p>
              </div>
            ) : (
              filteredPending.map(submission => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))
            )}
          </div>
        )}

        {/* Reviewed Submissions */}
        {!isLoading && activeTab === 'reviewed' && (
          <div className="space-y-4">
            {filteredReviewed.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {filterWeek 
                    ? `Nenhum projeto revisado na Semana ${filterWeek}`
                    : 'Nenhum projeto revisado ainda'}
                </p>
              </div>
            ) : (
              filteredReviewed.map(submission => (
                <ReviewedSubmissionCard key={submission.id} submission={submission} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function SubmissionCard({ submission }: { submission: PendingSubmission }) {
  return (
    <div className="glass-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {submission.studentName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {submission.weekTitle} • Enviado {new Date(submission.submittedAt).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300">
          Aguardando Review
        </span>
      </div>

      {/* Links */}
      <div className="space-y-2 mb-4">
        {submission.repositoryUrl && (
          <a
            href={submission.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Github className="w-4 h-4" />
            {submission.repositoryUrl}
          </a>
        )}
        {submission.liveUrl && (
          <a
            href={submission.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            {submission.liveUrl}
          </a>
        )}
      </div>

      {/* Description */}
      {submission.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {submission.description}
        </p>
      )}

      {/* Action */}
      <Link href={`/mentor/projects/${submission.id}`}>
        <Button className="w-full">
          Revisar Projeto
        </Button>
      </Link>
    </div>
  )
}

function ReviewedSubmissionCard({ submission }: { submission: ReviewedSubmission }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
      case 'needs_revision':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprovado'
      case 'needs_revision':
        return 'Precisa Revisão'
      default:
        return 'Revisado'
    }
  }

  return (
    <div className="glass-card p-6 rounded-lg border border-border">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {submission.studentName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {submission.weekTitle} • Revisado {new Date(submission.reviewedAt).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn('px-3 py-1 rounded-full text-xs font-medium', getStatusColor(submission.status))}>
            {getStatusText(submission.status)}
          </span>
          {submission.status === 'approved' && (
            <span className="text-sm font-semibold text-primary">
              +{submission.xpEarned} XP
            </span>
          )}
        </div>
      </div>

      {/* Grade */}
      {submission.grade && (
        <p className="text-sm text-muted-foreground mb-2">
          Nota: {submission.grade === 'excellent' ? 'Excelente' : submission.grade === 'good' ? 'Bom' : 'Precisa Melhorar'}
        </p>
      )}

      {/* Feedback */}
      {submission.mentorFeedback && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          "{submission.mentorFeedback}"
        </p>
      )}

      {/* Links */}
      <div className="flex gap-3">
        {submission.repositoryUrl && (
          <a
            href={submission.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        )}
        {submission.liveUrl && (
          <a
            href={submission.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <ExternalLink className="w-4 h-4" />
            Live
          </a>
        )}
      </div>
    </div>
  )
}
