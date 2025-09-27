'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { intelligentHintSystem, SmartHint } from '@/lib/hints/intelligentHintSystem'
import { Brain, Lightbulb, AlertTriangle, Target, BookOpen, Zap, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SmartHintSystemProps {
  code: string
  challengeType: string
  timeSpent: number
  hintsUsed: number
  onHintUsed?: (hint: SmartHint) => void
  className?: string
}

export function SmartHintSystem({
  code,
  challengeType,
  timeSpent,
  hintsUsed,
  onHintUsed,
  className = ''
}: SmartHintSystemProps) {
  const [availableHints, setAvailableHints] = useState<SmartHint[]>([])
  const [activeHints, setActiveHints] = useState<SmartHint[]>([])
  const [expandedHint, setExpandedHint] = useState<string | null>(null)
  const [analysisMode, setAnalysisMode] = useState<'auto' | 'manual'>('auto')

  // Analisar código automaticamente
  useEffect(() => {
    if (analysisMode === 'auto') {
      const hints = intelligentHintSystem.analyzeCode(code, challengeType)
      setAvailableHints(hints)

      // Mostrar hints de erro automaticamente
      const errorHints = hints.filter(h => h.type === 'error-based' && h.triggered)
      setActiveHints(prev => {
        const newHints = errorHints.filter(eh => !prev.find(p => p.id === eh.id))
        return [...prev, ...newHints]
      })
    }
  }, [code, challengeType, analysisMode])

  // Sugerir ação baseada no tempo
  useEffect(() => {
    const nextAction = intelligentHintSystem.suggestNextAction(code, timeSpent, hintsUsed)
    if (nextAction && !activeHints.find(h => h.id === nextAction.id)) {
      setActiveHints(prev => [...prev, nextAction])
    }
  }, [timeSpent, hintsUsed, code, activeHints])

  const activateHint = (hint: SmartHint) => {
    if (!activeHints.find(h => h.id === hint.id)) {
      setActiveHints(prev => [...prev, { ...hint, triggered: true }])
      onHintUsed?.(hint)
    }
  }

  const dismissHint = (hintId: string) => {
    setActiveHints(prev => prev.filter(h => h.id !== hintId))
  }

  const getHintIcon = (type: string) => {
    switch (type) {
      case 'error-based': return <AlertTriangle className="h-4 w-4" />
      case 'context': return <BookOpen className="h-4 w-4" />
      case 'progressive': return <Target className="h-4 w-4" />
      case 'best-practice': return <Zap className="h-4 w-4" />
      default: return <Lightbulb className="h-4 w-4" />
    }
  }

  const getHintColor = (type: string) => {
    switch (type) {
      case 'error-based': return 'text-red-500 bg-red-500/20 border-red-500/30'
      case 'context': return 'text-blue-500 bg-blue-500/20 border-blue-500/30'
      case 'progressive': return 'text-green-500 bg-green-500/20 border-green-500/30'
      case 'best-practice': return 'text-purple-500 bg-purple-500/20 border-purple-500/30'
      default: return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'error-based': return 'Erro'
      case 'context': return 'Contextual'
      case 'progressive': return 'Progressivo'
      case 'best-practice': return 'Boa Prática'
      default: return 'Dica'
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Assistente Inteligente</h3>
            <p className="text-xs text-muted-foreground">
              {activeHints.length} dicas ativas • {availableHints.length} disponíveis
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAnalysisMode(analysisMode === 'auto' ? 'manual' : 'auto')}
            className={cn(
              "text-xs",
              analysisMode === 'auto' ? "bg-green-500/20 text-green-600" : "bg-muted"
            )}
          >
            {analysisMode === 'auto' ? '🤖 Auto' : '✋ Manual'}
          </Button>
        </div>
      </div>

      {/* Active Hints */}
      {activeHints.length > 0 && (
        <div className="space-y-3">
          {activeHints.map((hint) => (
            <div
              key={hint.id}
              className={cn(
                "glass-card rounded-lg border-l-4 p-4",
                getHintColor(hint.type)
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={cn("p-1 rounded", getHintColor(hint.type))}>
                    {getHintIcon(hint.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-foreground text-sm">
                        {hint.title}
                      </h4>
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full font-medium",
                        getHintColor(hint.type)
                      )}>
                        {getTypeLabel(hint.type)}
                      </span>
                    </div>

                    <p className="text-sm text-foreground leading-relaxed mb-3">
                      {hint.content}
                    </p>

                    {hint.example && (
                      <div className="space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedHint(
                            expandedHint === hint.id ? null : hint.id
                          )}
                          className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                          {expandedHint === hint.id ? '🔽' : '▶️'} Ver exemplo
                        </Button>

                        {expandedHint === hint.id && (
                          <div className="bg-card border border-border rounded-lg overflow-hidden">
                            <div className="bg-muted px-3 py-2 border-b border-border">
                              <span className="text-xs font-medium text-foreground">Exemplo:</span>
                            </div>
                            <pre className="p-3 text-xs overflow-x-auto">
                              <code className="text-foreground">{hint.example}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissHint(hint.id)}
                  className="p-1 h-auto text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Available Hints */}
      {analysisMode === 'manual' && availableHints.length > 0 && (
        <div className="glass-card rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Lightbulb className="h-4 w-4 mr-2" />
            Dicas Disponíveis
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableHints
              .filter(hint => !activeHints.find(a => a.id === hint.id))
              .slice(0, 6)
              .map((hint) => (
                <Button
                  key={hint.id}
                  variant="outline"
                  size="sm"
                  onClick={() => activateHint(hint)}
                  className={cn(
                    "justify-start h-auto p-3 text-left",
                    "hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    {getHintIcon(hint.type)}
                    <div>
                      <p className="text-xs font-medium">{hint.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {hint.content.substring(0, 40)}...
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
          </div>
        </div>
      )}

      {/* No Active Hints */}
      {activeHints.length === 0 && (
        <div className="glass-card rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">🎯</div>
          <h4 className="font-medium text-foreground mb-2">
            Tudo certo por aqui!
          </h4>
          <p className="text-sm text-muted-foreground">
            Nenhuma dica ativa no momento. Continue codificando!
          </p>
        </div>
      )}
    </div>
  )
}