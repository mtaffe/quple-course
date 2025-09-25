'use client'

import { useState, useEffect } from 'react'
import { Challenge, ChallengeState, ValidationResult } from '@/types'
import { CodeEditor } from './CodeEditor'
import { Preview } from './Preview'
import { HintSystem } from './HintSystem'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { HTMLValidator } from '@/lib/validation/htmlValidator'
import { ProgressService } from '@/lib/progress/progressService'
import { useAuth } from '@/hooks/useAuth'
import { debounce } from '@/lib/utils'
import {
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  Download,
  ExternalLink,
  BookOpen,
  Video,
  Code
} from 'lucide-react'

interface ChallengeLayoutProps {
  challenge: Challenge
  onComplete?: (result: ValidationResult) => void
  onSaveProgress?: (state: ChallengeState) => void
}

export function ChallengeLayout({
  challenge,
  onComplete,
  onSaveProgress
}: ChallengeLayoutProps) {
  const { student } = useAuth()
  const [state, setState] = useState<ChallengeState>({
    code: challenge.starterCode,
    isRunning: false,
    output: '',
    errors: [],
    currentHint: 0,
    attempts: 0
  })

  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [timeSpent, setTimeSpent] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)
  const [completionReward, setCompletionReward] = useState<{
    earnedXP: number
    newBadges: string[]
    unlockedNextChallenge: boolean
  } | null>(null)

  // Timer for tracking time spent
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Debounced validation
  const debouncedValidate = debounce((code: string) => {
    const result = HTMLValidator.validate(code, challenge.id)
    setValidation(result)

    // Não mais auto-complete - agora apenas validação em tempo real
    // O usuário precisa clicar em "Submeter" conscientemente
  }, 1000)

  // Função para completar o desafio e ganhar recompensas
  const handleChallengeComplete = async (result: ValidationResult) => {
    if (!student?.id || isCompleting) return

    setIsCompleting(true)

    try {
      console.log('🎯 Completando desafio:', challenge.id)

      const reward = await ProgressService.completeChallenge(
        student.id,
        challenge.id,
        result,
        state.currentHint,
        state.attempts,
        timeSpent
      )

      setCompletionReward(reward)
      console.log('🎉 Desafio completado! Recompensas:', reward)

      // Chamar callback original se fornecido
      onComplete?.(result)

    } catch (error) {
      console.error('❌ Erro ao completar desafio:', error)
      alert('Erro ao salvar progresso. Tente novamente.')
    } finally {
      setIsCompleting(false)
    }
  }

  useEffect(() => {
    if (state.code !== challenge.starterCode) {
      debouncedValidate(state.code)
    }
  }, [state.code, challenge.id, challenge.starterCode, debouncedValidate])

  // Save progress periodically
  useEffect(() => {
    const saveTimer = setInterval(() => {
      onSaveProgress?.(state)
    }, 30000) // Save every 30 seconds

    return () => clearInterval(saveTimer)
  }, [state, onSaveProgress])

  const handleCodeChange = (newCode: string) => {
    setState(prev => ({
      ...prev,
      code: newCode
    }))
  }

  const handleRunCode = () => {
    setState(prev => ({
      ...prev,
      isRunning: true,
      attempts: prev.attempts + 1
    }))

    // Simulate running the code
    setTimeout(() => {
      const result = HTMLValidator.validate(state.code, challenge.id)
      setValidation(result)

      setState(prev => ({
        ...prev,
        isRunning: false,
        output: result.isValid ?
          '✅ Código executado com sucesso!' :
          HTMLValidator.generateFeedback(result),
        errors: result.errors.map(err => err.message)
      }))
    }, 1000)
  }

  // Nova função para submeter desafio para avaliação
  const handleSubmitChallenge = async () => {
    if (!validation) {
      alert('⚠️ Execute o código primeiro para ver a validação!')
      return
    }

    if (!validation.isValid) {
      const confirm = window.confirm(
        `⚠️ Seu código ainda tem ${validation.errors.length} erro(s).

Deseja submeter mesmo assim? Você receberá menos XP por não ter completado perfeitamente.`
      )
      if (!confirm) return
    }

    // Proceder com a submissão
    await handleChallengeComplete(validation)
  }

  const handleReset = () => {
    setState({
      code: challenge.starterCode,
      isRunning: false,
      output: '',
      errors: [],
      currentHint: 0,
      attempts: state.attempts
    })
    setValidation(null)
  }

  const handleDownload = () => {
    const blob = new Blob([state.code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `challenge-${challenge.id}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleHintUsed = (hintIndex: number) => {
    setState(prev => ({
      ...prev,
      currentHint: Math.max(prev.currentHint, hintIndex + 1)
    }))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'hard':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge
                className={`${getDifficultyColor(challenge.difficulty)} text-white`}
              >
                {challenge.difficulty}
              </Badge>
              <h1 className="text-2xl font-bold">{challenge.title}</h1>
              <Badge variant="outline">
                <Trophy className="h-3 w-3 mr-1" />
                {challenge.xpReward} XP
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {formatTime(timeSpent)}
              </div>
              <Badge variant="secondary">
                Tentativas: {state.attempts}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        {/* Left Column - Challenge Description & Hints */}
        <div className="lg:col-span-1 space-y-4 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Descrição do Desafio</CardTitle>
              <CardDescription>
                Tempo estimado: {challenge.estimatedTime} minutos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                {challenge.description}
              </p>

              {validation && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progresso:</span>
                    <span className="text-sm">{validation.score}/100</span>
                  </div>
                  <Progress value={validation.score} />

                  {validation.errors.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-destructive">🚨 O que precisa ser corrigido:</p>
                      {validation.errors.map((error, index) => (
                        <div key={index} className="text-xs bg-red-50 border border-red-200 p-3 rounded-lg">
                          <p className="text-red-700 font-medium">{error.message}</p>
                          {error.suggestion && (
                            <p className="text-red-600 mt-1">
                              💡 <strong>Sugestão:</strong> {error.suggestion}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {validation.warnings.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-yellow-600">⚠️ Sugestões de melhoria:</p>
                      {validation.warnings.map((warning, index) => (
                        <div key={index} className="text-xs bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                          <p className="text-yellow-700 font-medium">{warning.message}</p>
                          {warning.suggestion && (
                            <p className="text-yellow-600 mt-1">
                              💡 <strong>Sugestão:</strong> {warning.suggestion}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {validation.isValid && !completionReward && (
                    <div className="flex items-center justify-between text-green-600 bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">
                          🎉 Perfeito! Seu código está válido!
                        </span>
                      </div>
                      <div className="text-sm text-green-700">
                        → Clique em "Finalizar Desafio" para ganhar XP
                      </div>
                    </div>
                  )}

                  {completionReward && (
                    <div className="space-y-3 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-2 border-green-200">
                      <div className="flex items-center space-x-2 text-green-700">
                        <Trophy className="h-6 w-6" />
                        <span className="font-bold text-lg">🎉 PARABÉNS!</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>XP Ganho:</span>
                          <span className="font-bold text-blue-600">+{completionReward.earnedXP} XP</span>
                        </div>

                        {completionReward.newBadges.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-purple-700">🏆 Novas Conquistas:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {completionReward.newBadges.map(badgeId => {
                                const badge = ProgressService.getBadgeInfo(badgeId)
                                return badge ? (
                                  <Badge key={badgeId} variant="secondary" className="text-xs">
                                    {badge.icon} {badge.name}
                                  </Badge>
                                ) : null
                              })}
                            </div>
                          </div>
                        )}

                        {completionReward.unlockedNextChallenge && (
                          <div className="text-center pt-2">
                            <Button
                              onClick={() => window.location.href = '/dashboard'}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              🚀 Próximo Desafio Desbloqueado!
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <HintSystem
            hints={challenge.hints || []}
            onHintUsed={handleHintUsed}
          />

          {/* Materiais de Apoio */}
          {challenge.resources && challenge.resources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  Materiais de Apoio
                </CardTitle>
                <CardDescription>
                  Links úteis para te ajudar neste desafio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {challenge.resources.map((resource, index) => {
                  const getIcon = (type: string) => {
                    switch (type) {
                      case 'video':
                        return <Video className="h-4 w-4 text-red-500" />
                      case 'documentation':
                        return <BookOpen className="h-4 w-4 text-blue-500" />
                      case 'tutorial':
                        return <Code className="h-4 w-4 text-green-500" />
                      case 'tool':
                        return <ExternalLink className="h-4 w-4 text-purple-500" />
                      default:
                        return <ExternalLink className="h-4 w-4 text-gray-500" />
                    }
                  }

                  return (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors group"
                    >
                      <div className="mt-1">
                        {getIcon(resource.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {resource.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {resource.description}
                        </p>
                      </div>
                      <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </a>
                  )
                })}
              </CardContent>
            </Card>
          )}

          {/* Objetivos de Aprendizado */}
          {challenge.learningObjectives && challenge.learningObjectives.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  O Que Você Vai Aprender
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {challenge.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-sm text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Conceitos */}
          {challenge.concepts && challenge.concepts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-500" />
                  Conceitos Importantes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {challenge.concepts.map((concept, index) => (
                  <div key={index} className="p-3 bg-indigo-50 rounded-lg">
                    <h4 className="font-medium text-indigo-900 mb-2">
                      {concept.title}
                    </h4>
                    <p className="text-sm text-indigo-700">
                      {concept.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Middle Column - Code Editor */}
        <div className="lg:col-span-1 flex flex-col space-y-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Editor de Código</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    disabled={state.isRunning}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={handleRunCode}
                    disabled={state.isRunning || isCompleting}
                    size="sm"
                    variant="outline"
                  >
                    {state.isRunning ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2" />
                        Rodando...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Testar
                      </>
                    )}
                  </Button>

                  {validation && !completionReward && (
                    <Button
                      onClick={handleSubmitChallenge}
                      disabled={isCompleting}
                      size="sm"
                      className={validation.isValid ?
                        "bg-green-600 hover:bg-green-700" :
                        "bg-orange-600 hover:bg-orange-700"
                      }
                    >
                      {isCompleting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {validation.isValid ? 'Finalizar Desafio' : 'Submeter Parcial'}
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <CodeEditor
                value={state.code}
                onChange={handleCodeChange}
                language="html"
                height="100%"
                className="h-full border-0"
              />
            </CardContent>
          </Card>

          {state.output && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Saída</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-mono bg-muted p-2 rounded">
                  {state.output}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Preview */}
        <div className="lg:col-span-1 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <Preview
                code={state.code}
                className="h-full border-0"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}