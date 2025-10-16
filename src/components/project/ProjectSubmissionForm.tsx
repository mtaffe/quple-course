'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Send, ExternalLink, Github, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProjectSubmissionService, type ProjectSubmission } from '@/lib/supabase/project-submission-service'

interface ProjectSubmissionFormProps {
  weekId: string
  studentId?: string
  projectTitle: string
  projectXP: number
  onSuccess?: () => void
}

export function ProjectSubmissionForm({
  weekId,
  studentId,
  projectTitle,
  projectXP,
  onSuccess,
}: ProjectSubmissionFormProps) {
  const [repositoryUrl, setRepositoryUrl] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [existingSubmission, setExistingSubmission] = useState<ProjectSubmission | null>(null)

  // Carregar submissão existente
  useEffect(() => {
    if (!studentId) return

    const loadSubmission = async () => {
      try {
        const submission = await ProjectSubmissionService.getProjectSubmission(studentId, weekId)
        if (submission) {
          setExistingSubmission(submission)
          setRepositoryUrl(submission.repositoryUrl || '')
          setLiveUrl(submission.liveUrl || '')
          setDescription(submission.description || '')
        }
      } catch (err) {
        console.error('Erro ao carregar submissão:', err)
      }
    }

    loadSubmission()
  }, [studentId, weekId])

  const validateUrl = (url: string): boolean => {
    if (!url) return true // URL opcional
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const validateGithubUrl = (url: string): boolean => {
    if (!url) return true // URL opcional
    return url.includes('github.com')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validações
    if (!repositoryUrl && !liveUrl) {
      setError('Adicione pelo menos um link (GitHub ou URL ao vivo)')
      return
    }

    if (repositoryUrl && !validateUrl(repositoryUrl)) {
      setError('URL do repositório inválida')
      return
    }

    if (repositoryUrl && !validateGithubUrl(repositoryUrl)) {
      setError('Use um link do GitHub para o repositório')
      return
    }

    if (liveUrl && !validateUrl(liveUrl)) {
      setError('URL ao vivo inválida')
      return
    }

    if (!studentId) {
      setError('Você precisa estar autenticado para enviar projetos')
      return
    }

    setIsSubmitting(true)

    try {
      const submission = await ProjectSubmissionService.submitProject(studentId, {
        weekId,
        repositoryUrl: repositoryUrl || undefined,
        liveUrl: liveUrl || undefined,
        description: description || undefined,
      })

      setExistingSubmission(submission)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar projeto. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'needs_revision':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-4 h-4" />
      case 'needs_revision':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprovado'
      case 'needs_revision':
        return 'Precisa Revisão'
      default:
        return 'Aguardando Review'
    }
  }

  return (
    <div className="space-y-4">
      {/* Status da Submissão Existente */}
      {existingSubmission && (
        <div
          className={cn(
            'border rounded-lg p-4',
            getStatusColor(existingSubmission.status)
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              {getStatusIcon(existingSubmission.status)}
              <div>
                <p className="font-semibold">
                  {getStatusText(existingSubmission.status)}
                </p>
                {existingSubmission.grade && (
                  <p className="text-sm mt-1">
                    Nota: {existingSubmission.grade === 'excellent' ? 'Excelente' : existingSubmission.grade === 'good' ? 'Bom' : 'Precisa Melhorar'}
                  </p>
                )}
              </div>
            </div>
            {existingSubmission.status === 'approved' && (
              <span className="text-sm font-semibold">
                +{existingSubmission.xpEarned} XP
              </span>
            )}
          </div>

          {existingSubmission.mentorFeedback && (
            <div className="mt-3 pt-3 border-t border-current/20">
              <p className="text-sm font-medium mb-1">Feedback do Mentor:</p>
              <p className="text-sm">{existingSubmission.mentorFeedback}</p>
            </div>
          )}

          {existingSubmission.status === 'needs_revision' && (
            <p className="text-sm mt-3">
              💡 Revise seu projeto conforme o feedback e reenvie abaixo.
            </p>
          )}
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Repository URL */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Github className="w-4 h-4 inline mr-1" />
            Link do Repositório GitHub (opcional)
          </label>
          <input
            type="url"
            value={repositoryUrl}
            onChange={(e) => setRepositoryUrl(e.target.value)}
            placeholder="https://github.com/seu-usuario/projeto"
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Live URL */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <ExternalLink className="w-4 h-4 inline mr-1" />
            Link do Projeto ao Vivo (opcional)
          </label>
          <input
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="https://seu-projeto.vercel.app"
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Descrição (opcional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Conte sobre seu projeto: o que você aprendeu, desafios enfrentados, próximos passos..."
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        {/* Preview das URLs */}
        {(repositoryUrl || liveUrl) && (
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <p className="text-sm font-medium text-foreground mb-2">Preview:</p>
            <div className="space-y-2">
              {repositoryUrl && validateUrl(repositoryUrl) && (
                <a
                  href={repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Github className="w-4 h-4" />
                  {repositoryUrl}
                </a>
              )}
              {liveUrl && validateUrl(liveUrl) && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  {liveUrl}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || (!repositoryUrl && !liveUrl)}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {existingSubmission ? 'Atualizar Projeto' : 'Enviar Projeto'}
            </>
          )}
        </Button>

        {!studentId && (
          <p className="text-sm text-muted-foreground text-center">
            Faça login para enviar seu projeto
          </p>
        )}
      </form>
    </div>
  )
}
