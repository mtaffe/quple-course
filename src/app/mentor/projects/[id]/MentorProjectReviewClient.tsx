'use client'

// TODO: Add mentor role authentication middleware
// This page should only be accessible to users with mentor role
// Currently no role gating - security risk for production

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ProjectSubmissionService, type ProjectSubmission, supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Github, ExternalLink, CheckCircle2, AlertCircle, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface MentorProjectReviewClientProps {
  submissionId: string
}

export function MentorProjectReviewClient({ submissionId }: MentorProjectReviewClientProps) {
  const router = useRouter()
  const [submission, setSubmission] = useState<ProjectSubmission | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [status, setStatus] = useState<'approved' | 'needs_revision'>('approved')
  const [grade, setGrade] = useState<'excellent' | 'good' | 'needs_improvement'>('good')
  const [mentorFeedback, setMentorFeedback] = useState('')
  const [xpEarned, setXpEarned] = useState(200)

  useEffect(() => {
    loadSubmission()
  }, [submissionId])

  const loadSubmission = async () => {
    setIsLoading(true)
    try {
      // Buscar submissão diretamente
      const { data, error } = await supabase
        .from('project_submissions')
        .select('*')
        .eq('id', submissionId)
        .single()

      if (error) throw error

      const mapped: ProjectSubmission = {
        id: data.id,
        studentId: data.student_id,
        weekId: data.week_id,
        repositoryUrl: data.repository_url,
        liveUrl: data.live_url,
        description: data.description,
        status: data.status,
        grade: data.grade,
        mentorFeedback: data.mentor_feedback,
        xpEarned: data.xp_earned,
        submittedAt: new Date(data.submitted_at),
        reviewedAt: data.reviewed_at ? new Date(data.reviewed_at) : undefined,
      }

      setSubmission(mapped)

      // Pré-preencher formulário se já foi revisado
      if (mapped.status !== 'submitted') {
        setStatus(mapped.status)
        setGrade(mapped.grade || 'good')
        setMentorFeedback(mapped.mentorFeedback || '')
        setXpEarned(mapped.xpEarned)
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar submissão')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!mentorFeedback.trim()) {
      setError('Feedback é obrigatório')
      return
    }

    if (status === 'approved' && xpEarned <= 0) {
      setError('XP deve ser maior que 0 para projetos aprovados')
      return
    }

    setIsSubmitting(true)

    try {
      await ProjectSubmissionService.updateMentorFeedback(submissionId, {
        status,
        grade,
        mentorFeedback,
        xpEarned: status === 'approved' ? xpEarned : 0,
      })

      // Redirecionar para lista de projetos
      router.push('/mentor/projects')
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar feedback')
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <p className="text-muted-foreground">{error || 'Submissão não encontrada'}</p>
          <Link href="/mentor/projects">
            <Button className="mt-4">Voltar para Projetos</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/mentor/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Projetos
        </Link>

        {/* Submission Info */}
        <div className="glass-card p-6 rounded-lg border border-border mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Projeto - Semana {submission.weekId.replace('week-', '')}
          </h1>

          <div className="space-y-4">
            {/* Links */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Links do Projeto:</h3>
              <div className="space-y-2">
                {submission.repositoryUrl && (
                  <a
                    href={submission.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Github className="w-5 h-5" />
                    {submission.repositoryUrl}
                  </a>
                )}
                {submission.liveUrl && (
                  <a
                    href={submission.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="w-5 h-5" />
                    {submission.liveUrl}
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            {submission.description && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Descrição do Aluno:</h3>
                <p className="text-foreground bg-muted/30 rounded-lg p-4">
                  {submission.description}
                </p>
              </div>
            )}

            {/* Submitted At */}
            <p className="text-sm text-muted-foreground">
              Enviado em: {submission.submittedAt.toLocaleDateString('pt-BR')} às {submission.submittedAt.toLocaleTimeString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="glass-card p-6 rounded-lg border border-border space-y-6">
          <h2 className="text-xl font-bold text-foreground">Avaliar Projeto</h2>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Decisão *
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStatus('approved')}
                className={cn(
                  'flex-1 px-4 py-3 rounded-lg border-2 transition-colors flex items-center justify-center gap-2',
                  status === 'approved'
                    ? 'border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300'
                    : 'border-border hover:border-green-500/50'
                )}
              >
                <CheckCircle2 className="w-5 h-5" />
                Aprovar
              </button>
              <button
                type="button"
                onClick={() => setStatus('needs_revision')}
                className={cn(
                  'flex-1 px-4 py-3 rounded-lg border-2 transition-colors flex items-center justify-center gap-2',
                  status === 'needs_revision'
                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300'
                    : 'border-border hover:border-yellow-500/50'
                )}
              >
                <AlertCircle className="w-5 h-5" />
                Pedir Revisão
              </button>
            </div>
          </div>

          {/* Grade */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nota
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value as any)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="excellent">Excelente</option>
              <option value="good">Bom</option>
              <option value="needs_improvement">Precisa Melhorar</option>
            </select>
          </div>

          {/* XP */}
          {status === 'approved' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                XP a Creditar *
              </label>
              <input
                type="number"
                value={xpEarned}
                onChange={(e) => setXpEarned(parseInt(e.target.value) || 0)}
                min="1"
                max="500"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Sugestão: 150-250 XP para projetos completos
              </p>
            </div>
          )}

          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Feedback para o Aluno *
            </label>
            <textarea
              value={mentorFeedback}
              onChange={(e) => setMentorFeedback(e.target.value)}
              placeholder={status === 'approved' 
                ? 'Parabéns! Seu projeto está excelente. Destaque os pontos fortes...'
                : 'Por favor, revise os seguintes pontos antes de reenviar...'
              }
              rows={6}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                Salvando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar Feedback
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
