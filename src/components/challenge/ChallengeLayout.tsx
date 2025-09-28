'use client'

import { useState, useEffect } from 'react'
import { Challenge, ChallengeState, ValidationResult } from '@/types'
import { CodeEditor } from './CodeEditor'
import { Preview } from './Preview'
import { HintSystem } from './HintSystem'
import { ModalPocket } from './ModalPocket'
import { HTMLKeyboard } from './HTMLKeyboard'
import { ContentNavigation } from '@/components/navigation/ContentNavigation'
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
  Clock,
  Trophy,
  Download,
  ExternalLink,
  BookOpen,
  Video,
  Code,
  HelpCircle,
  Eye,
  Lightbulb,
  ArrowLeft
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
  const [showModalPocket, setShowModalPocket] = useState(false)
  const [completionReward, setCompletionReward] = useState<{
    earnedXP: number
    newBadges: string[]
    unlockedNextChallenge: boolean
  } | null>(null)

  // Mobile responsive states
  const [activeTab, setActiveTab] = useState<'description' | 'code' | 'preview' | 'hints'>('description')
  const [isMobile, setIsMobile] = useState(false)
  const [showKeyboard, setShowKeyboard] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

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

  const handleInsertTag = (tag: string) => {
    const newCode = state.code + tag
    handleCodeChange(newCode)
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

  // Mobile layout - render different structure
  if (isMobile) {
    return (
      <div className="h-screen flex flex-col bg-background">
        {/* Compact Mobile Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold truncate">{challenge.title}</h1>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Badge
                  className={`${getDifficultyColor(challenge.difficulty)} text-white text-xs px-1 py-0`}
                >
                  {challenge.difficulty}
                </Badge>
                <span>{challenge.xpReward} XP</span>
                <span>•</span>
                <span>{formatTime(timeSpent)}</span>
                <span>•</span>
                <span>{state.attempts} tentativas</span>
              </div>
            </div>

            <Button
              onClick={() => setShowModalPocket(true)}
              variant="ghost"
              size="sm"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          {validation && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Progresso</span>
                <span>{validation.score}/100</span>
              </div>
              <Progress value={validation.score} className="h-2" />
            </div>
          )}
        </div>

        {/* Mobile Tab Navigation */}
        <div className="border-b bg-background">
          <div className="flex overflow-x-auto">
            {[
              { id: 'description', label: 'Descrição', icon: BookOpen },
              { id: 'code', label: 'Código', icon: Code },
              { id: 'preview', label: 'Preview', icon: Eye },
              { id: 'hints', label: 'Dicas', icon: Lightbulb }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary bg-primary/5 shadow-sm'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  }`}
                >
                  <Icon className={`h-4 w-4 transition-transform duration-200 ${
                    activeTab === tab.id ? 'scale-110' : ''
                  }`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Mobile Tab Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'description' && (
            <div className="h-full overflow-y-auto p-4 space-y-4 animate-in fade-in-50 duration-200">
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

                  {/* Mobile Validation Results */}
                  {validation && (
                    <div className="mt-4 space-y-3">
                      {validation.errors.length > 0 && (
                        <div className="space-y-2 animate-in slide-in-from-left-4 duration-300">
                          <p className="text-sm font-medium text-destructive">🚨 Correções necessárias:</p>
                          {validation.errors.map((error, index) => (
                            <div key={index} className="text-xs bg-red-50 border border-red-200 p-3 rounded-lg border-l-4 border-l-red-500 transition-all duration-200 hover:shadow-sm">
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
                        <div className="space-y-2 animate-in slide-in-from-left-4 duration-300 delay-75">
                          <p className="text-sm font-medium text-yellow-600">⚠️ Sugestões:</p>
                          {validation.warnings.map((warning, index) => (
                            <div key={index} className="text-xs bg-yellow-50 border border-yellow-200 p-3 rounded-lg border-l-4 border-l-yellow-500 transition-all duration-200 hover:shadow-sm">
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
                        <div className="text-green-600 bg-green-50 p-3 rounded-lg border-l-4 border-l-green-500 animate-in slide-in-from-right-4 duration-500">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 animate-pulse" />
                            <span className="font-medium">🎉 Perfeito! Código válido!</span>
                          </div>
                          <p className="text-sm text-green-700 mt-1">
                            Vá para a aba &quot;Código&quot; e clique em &quot;Finalizar&quot;
                          </p>
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
                                  className="bg-green-600 hover:bg-green-700 w-full"
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
            </div>
          )}

          {activeTab === 'code' && (
            <div className="h-full flex flex-col animate-in fade-in-50 duration-200">
              {/* Mobile Code Editor */}
              <div className="flex-1 relative">
                <CodeEditor
                  value={state.code}
                  onChange={handleCodeChange}
                  language="html"
                  height="100%"
                  className="h-full border-0"
                />
              </div>

              {/* Mobile Keyboard Toolbar */}
              <div className="border-t bg-background">
                <div className="p-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">Tags HTML</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowKeyboard(!showKeyboard)}
                      className="text-xs"
                    >
                      {showKeyboard ? 'Ocultar' : 'Mostrar'} Teclado
                    </Button>
                  </div>

                  {showKeyboard && (
                    <HTMLKeyboard onInsertTag={handleInsertTag} />
                  )}
                </div>

                {/* Mobile Action Buttons */}
                <div className="p-3 border-t space-y-2">
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleRunCode}
                      disabled={state.isRunning || isCompleting}
                      className="flex-1 transition-all duration-200 hover:scale-105 active:scale-95"
                      variant="outline"
                    >
                      {state.isRunning ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2" />
                          Testando...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Testar Código
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleReset}
                      disabled={state.isRunning}
                      className="px-3 transition-all duration-200 hover:scale-105 active:scale-95"
                      title="Resetar código"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>

                  {state.output && (
                    <div className="text-xs bg-muted p-3 rounded-lg font-mono border-l-4 border-primary animate-in slide-in-from-top-2 duration-200">
                      {state.output}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="h-full animate-in fade-in-50 duration-200">
              <Preview
                code={state.code}
                className="h-full border-0"
              />
            </div>
          )}

          {activeTab === 'hints' && (
            <div className="h-full overflow-y-auto p-4 animate-in fade-in-50 duration-200">
              <HintSystem
                hints={challenge.hints || []}
                onHintUsed={handleHintUsed}
              />
            </div>
          )}
        </div>

        {/* Mobile Floating Submit Button */}
        {validation && !completionReward && (
          <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
            <Button
              onClick={handleSubmitChallenge}
              disabled={isCompleting}
              className={`${validation.isValid
                ? 'bg-green-600 hover:bg-green-700 shadow-green-200'
                : 'bg-orange-600 hover:bg-orange-700 shadow-orange-200'
              } shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95`}
              size="lg"
            >
              {isCompleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Enviando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {validation.isValid ? 'Finalizar' : 'Submeter'}
                </>
              )}
            </Button>
          </div>
        )}

        {/* Modal Pocket */}
        <ModalPocket
          isOpen={showModalPocket}
          onClose={() => setShowModalPocket(false)}
          challengeId={challenge.id}
        />
      </div>
    )
  }

  // Desktop layout (enhanced)
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Desktop Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="w-full px-8 py-5">
          <div className="flex items-center justify-between">
            {/* Left Section - Challenge Info */}
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="mr-2 hover:bg-muted/80 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>

              <div className="flex items-center space-x-4">
                <Badge
                  className={`${getDifficultyColor(challenge.difficulty)} text-white px-3 py-1 font-medium`}
                >
                  {challenge.difficulty}
                </Badge>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{challenge.title}</h1>
                  <p className="text-sm text-muted-foreground">Desafio {challenge.id} • Tempo estimado: {challenge.estimatedTime} min</p>
                </div>
              </div>
            </div>

            {/* Right Section - Stats & Actions */}
            <div className="flex items-center space-x-6">
              {/* Progress Indicators */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-foreground">{challenge.xpReward} XP</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="font-mono font-medium text-foreground">{formatTime(timeSpent)}</span>
                </div>
                <Badge variant="secondary" className="px-3 py-1">
                  {state.attempts} tentativas
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setShowModalPocket(true)}
                  variant="outline"
                  size="sm"
                  className="glass-card premium-hover"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Ajuda Contextual
                </Button>

                {validation && !completionReward && (
                  <Button
                    onClick={handleSubmitChallenge}
                    disabled={isCompleting}
                    size="sm"
                    className={`${validation.isValid
                      ? 'bg-green-600 hover:bg-green-700 shadow-green-200'
                      : 'bg-orange-600 hover:bg-orange-700 shadow-orange-200'
                    } shadow-md transition-all duration-200 hover:scale-105`}
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
          </div>

          {/* Progress Bar - Desktop */}
          {validation && (
            <div className="mt-4 max-w-md">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-medium text-muted-foreground">Progresso do código</span>
                <span className="font-mono font-bold text-foreground">{validation.score}/100</span>
              </div>
              <Progress value={validation.score} className="h-2" />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full px-8 py-6 grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6 h-full">
        {/* Left Column - Enhanced Sidebar */}
        <div className="lg:col-span-1 xl:col-span-1 space-y-4 overflow-y-auto pr-2">
          {/* Challenge Description */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur">
            <CardHeader className="pb-4 border-b border-border/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Objetivo do Desafio</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <Clock className="h-3 w-3" />
                    <span>Tempo estimado: {challenge.estimatedTime} minutos</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="prose prose-sm max-w-none">
                <p className="text-sm leading-relaxed text-foreground">
                  {challenge.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Validation Feedback */}
          {validation && (
            <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur animate-in slide-in-from-left-4 duration-300">
              <CardHeader className="pb-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      validation.isValid ? 'bg-green-500/10' :
                      validation.errors.length > 0 ? 'bg-red-500/10' : 'bg-yellow-500/10'
                    }`}>
                      <CheckCircle className={`h-5 w-5 ${
                        validation.isValid ? 'text-green-500' :
                        validation.errors.length > 0 ? 'text-red-500' : 'text-yellow-500'
                      }`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">Feedback do Código</CardTitle>
                      <CardDescription>
                        {validation.isValid ? 'Código aprovado!' :
                         validation.errors.length > 0 ? 'Correções necessárias' : 'Quase lá!'}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">{validation.score}</div>
                    <div className="text-xs text-muted-foreground">/ 100</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-muted-foreground">Progresso</span>
                    <span className="font-mono font-bold text-foreground">{validation.score}%</span>
                  </div>
                  <Progress value={validation.score} className="h-3" />
                </div>

                {/* Errors Section */}
                {validation.errors.length > 0 && (
                  <div className="space-y-3 animate-in slide-in-from-left-4 duration-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <h4 className="text-sm font-semibold text-red-700">Correções Obrigatórias</h4>
                      <Badge variant="destructive" className="text-xs">
                        {validation.errors.length}
                      </Badge>
                    </div>
                    {validation.errors.map((error, index) => (
                      <div key={index} className="bg-red-50 border border-red-200 p-4 rounded-lg border-l-4 border-l-red-500 transition-all duration-200 hover:shadow-sm">
                        <p className="text-red-700 font-medium text-sm mb-2">{error.message}</p>
                        {error.suggestion && (
                          <div className="bg-red-100 p-3 rounded border border-red-200">
                            <p className="text-red-600 text-xs">
                              💡 <strong>Dica:</strong> {error.suggestion}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Warnings Section */}
                {validation.warnings.length > 0 && (
                  <div className="space-y-3 animate-in slide-in-from-left-4 duration-300 delay-75">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <h4 className="text-sm font-semibold text-yellow-700">Sugestões de Melhoria</h4>
                      <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">
                        {validation.warnings.length}
                      </Badge>
                    </div>
                    {validation.warnings.map((warning, index) => (
                      <div key={index} className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg border-l-4 border-l-yellow-500 transition-all duration-200 hover:shadow-sm">
                        <p className="text-yellow-700 font-medium text-sm mb-2">{warning.message}</p>
                        {warning.suggestion && (
                          <div className="bg-yellow-100 p-3 rounded border border-yellow-200">
                            <p className="text-yellow-600 text-xs">
                              💡 <strong>Dica:</strong> {warning.suggestion}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Success State */}
                {validation.isValid && !completionReward && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-4 rounded-lg animate-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center space-x-3 mb-3">
                      <CheckCircle className="h-6 w-6 text-green-500 animate-pulse" />
                      <div>
                        <h4 className="font-bold text-green-700 text-lg">🎉 Excelente!</h4>
                        <p className="text-green-600 text-sm">Seu código está perfeito!</p>
                      </div>
                    </div>
                    <div className="bg-green-100 p-3 rounded border border-green-200">
                      <p className="text-green-700 text-sm font-medium">
                        ✅ Clique em &quot;Finalizar Desafio&quot; no header para ganhar seus pontos de XP!
                      </p>
                    </div>
                  </div>
                )}

                {/* Completion Reward */}
                {completionReward && (
                  <div className="space-y-4 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="text-center">
                      <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                      <h3 className="font-bold text-2xl text-green-700 mb-1">🎉 PARABÉNS!</h3>
                      <p className="text-green-600">Desafio completado com sucesso!</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white p-3 rounded border">
                        <span className="font-medium">XP Ganho:</span>
                        <span className="font-bold text-xl text-blue-600">+{completionReward.earnedXP} XP</span>
                      </div>

                      {completionReward.newBadges.length > 0 && (
                        <div className="bg-white p-3 rounded border">
                          <p className="text-sm font-medium text-purple-700 mb-2">🏆 Novas Conquistas:</p>
                          <div className="flex flex-wrap gap-2">
                            {completionReward.newBadges.map(badgeId => {
                              const badge = ProgressService.getBadgeInfo(badgeId)
                              return badge ? (
                                <Badge key={badgeId} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
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
                            className="bg-green-600 hover:bg-green-700 w-full py-3 text-lg font-semibold transition-all duration-200 hover:scale-105"
                          >
                            🚀 Próximo Desafio Desbloqueado!
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Enhanced Hints Section */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur">
            <CardHeader className="pb-4 border-b border-border/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Dicas & Ajuda</CardTitle>
                  <CardDescription>
                    Precisa de uma ajudinha? Use as dicas abaixo
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <HintSystem
                hints={challenge.hints || []}
                onHintUsed={handleHintUsed}
              />
            </CardContent>
          </Card>

          {/* Enhanced Materiais de Apoio */}
          {challenge.resources && challenge.resources.length > 0 && (
            <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur">
              <CardHeader className="pb-4 border-b border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <ExternalLink className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Materiais de Apoio</CardTitle>
                    <CardDescription>
                      Links úteis para aprofundar seu conhecimento
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
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
                      className="flex items-start space-x-3 p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-all duration-200 group hover:scale-105 hover:shadow-md"
                    >
                      <div className="p-2 rounded bg-muted/30 group-hover:bg-primary/10 transition-colors">
                        {getIcon(resource.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {resource.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {resource.description}
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all duration-200 group-hover:scale-110" />
                    </a>
                  )
                })}
              </CardContent>
            </Card>
          )}

          {/* Enhanced Learning Objectives */}
          {challenge.learningObjectives && challenge.learningObjectives.length > 0 && (
            <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur">
              <CardHeader className="pb-4 border-b border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Objetivos de Aprendizado</CardTitle>
                    <CardDescription>
                      O que você vai dominar neste desafio
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {challenge.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20 border border-border/30 transition-all duration-200 hover:bg-muted/30 hover:scale-105">
                      <div className="p-1 rounded-full bg-green-500/10 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      </div>
                      <span className="text-sm text-foreground leading-relaxed">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Enhanced Conceitos */}
          {challenge.concepts && challenge.concepts.length > 0 && (
            <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur">
              <CardHeader className="pb-4 border-b border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10">
                    <BookOpen className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Conceitos Importantes</CardTitle>
                    <CardDescription>
                      Fundamentos que você deve conhecer
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {challenge.concepts.map((concept, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 transition-all duration-200 hover:shadow-md hover:scale-105">
                    <h4 className="font-semibold text-indigo-900 mb-3 flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-indigo-600">{index + 1}</span>
                      </div>
                      <span>{concept.title}</span>
                    </h4>
                    <p className="text-sm text-indigo-700 leading-relaxed">
                      {concept.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Content Navigation */}
          <ContentNavigation
            currentContext="challenge"
            challengeId={challenge.id}
          />
        </div>

        {/* Middle Column - Enhanced Code Editor */}
        <div className="lg:col-span-2 xl:col-span-2 flex flex-col space-y-4">
          <Card className="flex-1 flex flex-col shadow-lg border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur">
            <CardHeader className="pb-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Editor de Código</CardTitle>
                    <p className="text-xs text-muted-foreground">HTML • Live Preview</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Status Indicator */}
                  <div className="flex items-center space-x-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${
                      state.isRunning ? 'bg-yellow-500 animate-pulse' :
                      validation?.isValid ? 'bg-green-500' :
                      validation ? 'bg-orange-500' : 'bg-gray-400'
                    }`} />
                    <span className="text-muted-foreground">
                      {state.isRunning ? 'Executando...' :
                       validation?.isValid ? 'Código válido' :
                       validation ? 'Código com erros' : 'Aguardando código'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    disabled={state.isRunning}
                    className="hover:bg-muted/80 transition-all duration-200 hover:scale-105"
                    title="Resetar código para o estado inicial"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    className="hover:bg-muted/80 transition-all duration-200 hover:scale-105"
                    title="Baixar código como arquivo HTML"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>

                  <Button
                    onClick={handleRunCode}
                    disabled={state.isRunning || isCompleting}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 shadow-md"
                  >
                    {state.isRunning ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Executando...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Testar Código
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 relative">
              <CodeEditor
                value={state.code}
                onChange={handleCodeChange}
                language="html"
                height="100%"
                className="h-full border-0 rounded-b-lg"
              />

              {/* Live coding indicator */}
              {state.code !== challenge.starterCode && (
                <div className="absolute top-2 right-2 z-10">
                  <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />
                    Live
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Output Section */}
          {state.output && (
            <Card className="shadow-md border-0 bg-gradient-to-br from-background to-muted/10 animate-in slide-in-from-bottom-4 duration-300">
              <CardHeader className="pb-3 border-b border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded bg-blue-500/10">
                    <ExternalLink className="h-4 w-4 text-blue-500" />
                  </div>
                  <CardTitle className="text-sm font-medium">Resultado da Execução</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="text-sm font-mono bg-muted/50 p-4 rounded-lg border border-border/50">
                  {state.output}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions Panel */}
          <Card className="shadow-md border-0 bg-gradient-to-br from-background to-muted/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-4 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInsertTag('<h1></h1>')}
                  className="text-xs justify-start hover:bg-muted/80 transition-colors"
                >
                  <span className="font-mono">&lt;h1&gt;</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInsertTag('<h2></h2>')}
                  className="text-xs justify-start hover:bg-muted/80 transition-colors"
                >
                  <span className="font-mono">&lt;h2&gt;</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInsertTag('<p></p>')}
                  className="text-xs justify-start hover:bg-muted/80 transition-colors"
                >
                  <span className="font-mono">&lt;p&gt;</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInsertTag('<div></div>')}
                  className="text-xs justify-start hover:bg-muted/80 transition-colors"
                >
                  <span className="font-mono">&lt;div&gt;</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInsertTag('<span></span>')}
                  className="text-xs justify-start hover:bg-muted/80 transition-colors"
                >
                  <span className="font-mono">&lt;span&gt;</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInsertTag('<a href=""></a>')}
                  className="text-xs justify-start hover:bg-muted/80 transition-colors"
                >
                  <span className="font-mono">&lt;a&gt;</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInsertTag('<ul>\n  <li></li>\n</ul>')}
                  className="text-xs justify-start hover:bg-muted/80 transition-colors"
                >
                  <span className="font-mono">&lt;ul&gt;</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInsertTag('<li></li>')}
                  className="text-xs justify-start hover:bg-muted/80 transition-colors"
                >
                  <span className="font-mono">&lt;li&gt;</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Enhanced Preview */}
        <div className="lg:col-span-1 xl:col-span-2 flex flex-col space-y-4">
          <Card className="flex-1 flex flex-col shadow-lg border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur">
            <CardHeader className="pb-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Eye className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Preview ao Vivo</CardTitle>
                    <p className="text-xs text-muted-foreground">Visualização em tempo real</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Preview Status */}
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-muted-foreground">Sincronizado</span>
                  </div>

                  {/* Refresh Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.reload()}
                    className="hover:bg-muted/80 transition-all duration-200 hover:scale-105"
                    title="Atualizar preview"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 relative">
              <div className="h-full relative rounded-b-lg overflow-hidden">
                <Preview
                  code={state.code}
                  className="h-full border-0"
                />

                {/* Preview Overlay for Empty State */}
                {!state.code.trim() && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/20 backdrop-blur-sm">
                    <div className="text-center space-y-2">
                      <div className="text-4xl opacity-50">👁️</div>
                      <p className="text-sm text-muted-foreground">
                        Seu código aparecerá aqui em tempo real
                      </p>
                    </div>
                  </div>
                )}

                {/* Code Length Indicator */}
                {state.code.length > 0 && (
                  <div className="absolute bottom-2 right-2 z-10">
                    <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur">
                      {state.code.length} caracteres
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preview Tools */}
          <Card className="shadow-md border-0 bg-gradient-to-br from-background to-muted/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Ferramentas de Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Responsiveness Test */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Teste de Responsividade</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs hover:bg-muted/80 transition-colors"
                    title="Visualizar em desktop (1200px+)"
                  >
                    🖥️ Desktop
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs hover:bg-muted/80 transition-colors"
                    title="Visualizar em tablet (768px)"
                  >
                    📱 Tablet
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs hover:bg-muted/80 transition-colors"
                    title="Visualizar em mobile (375px)"
                  >
                    📱 Mobile
                  </Button>
                </div>
              </div>

              {/* Detailed Code Analysis */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Análise do Código</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-xs bg-muted/50 p-3 rounded-lg border border-border/50 space-y-2">
                    <div className="font-medium text-foreground">DOM</div>
                    <div className="flex justify-between">
                      <span>Elementos:</span>
                      <span className="font-mono font-bold">{(state.code.match(/<[^/][^>]*>/g) || []).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tags fechamento:</span>
                      <span className="font-mono font-bold">{(state.code.match(/<\/[^>]*>/g) || []).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Linhas:</span>
                      <span className="font-mono font-bold">{state.code.split('\n').length}</span>
                    </div>
                  </div>

                  <div className="text-xs bg-muted/50 p-3 rounded-lg border border-border/50 space-y-2">
                    <div className="font-medium text-foreground">Conteúdo</div>
                    <div className="flex justify-between">
                      <span>Caracteres:</span>
                      <span className="font-mono font-bold">{state.code.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Palavras:</span>
                      <span className="font-mono font-bold">{state.code.split(/\s+/).filter(w => w.length > 0).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tamanho:</span>
                      <span className="font-mono font-bold">{(new Blob([state.code]).size / 1024).toFixed(1)} KB</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal Pocket */}
      <ModalPocket
        isOpen={showModalPocket}
        onClose={() => setShowModalPocket(false)}
        challengeId={challenge.id}
      />
    </div>
  )
}