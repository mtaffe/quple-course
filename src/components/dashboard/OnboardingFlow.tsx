'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { X, ChevronRight, ChevronLeft, Target, Trophy, BookOpen, Code, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: JSX.Element
  content: string
  action?: {
    label: string
    onClick: () => void
  }
}

interface OnboardingFlowProps {
  studentName: string
  onComplete: () => void
  onSkip: () => void
}

export function OnboardingFlow({ studentName, onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: `Bem-vindo, ${studentName}! 🎉`,
      description: 'Vamos conhecer a plataforma juntos',
      icon: <Star className="h-6 w-6" />,
      content: `Olá **${studentName}**! 👋

Parabéns por dar o primeiro passo na sua jornada como desenvolvedor!

Esta plataforma foi criada especialmente para transformar você em um programador completo, do zero ao profissional, através de:

✨ **Desafios práticos** que simulam problemas reais
🎯 **Sistema de gamificação** para manter você motivado
📚 **Conteúdo progressivo** que cresce com o seu nível
🏆 **Conquistas e badges** para celebrar seu progresso

Vamos começar essa jornada incrível?`
    },
    {
      id: 'dashboard',
      title: 'Seu Dashboard Personalizado',
      description: 'Central de comando do seu aprendizado',
      icon: <Target className="h-6 w-6" />,
      content: `O **Dashboard** é sua base de operações! 🚀

Aqui você encontra:

📊 **"O que fazer agora"** - Direcionamento personalizado baseado na hora do dia e seu progresso

🎯 **Metas diárias** - Define objetivos simples e alcançáveis para manter o ritmo

📈 **Estatísticas** - Acompanhe seu XP, nível, streak de dias e conquistas

🗺️ **Mapa de progresso** - Visualize todos os desafios e sua jornada completa

**Dica:** O sistema se adapta ao seu horário! De manhã ele sugere desafios, à noite recomenda teoria.`
    },
    {
      id: 'challenges',
      title: 'Sistema de Desafios',
      description: 'Aprenda fazendo, do jeito certo',
      icon: <Code className="h-6 w-6" />,
      content: `Os **Desafios** são o coração da plataforma! 💻

Como funciona:

🎮 **Contexto real** - Você vai "manter" um app chamado Quple (app para casais)
🔧 **Problemas progressivos** - De HTML básico até React avançado
💡 **Sistema de dicas** - 4 níveis de ajuda quando precisar
⚡ **Editor integrado** - Code e veja o resultado em tempo real

**Metodologia:** Practice → Context → Theory
Primeiro você faz, depois entende o contexto, aí aprofunda na teoria.`
    },
    {
      id: 'gamification',
      title: 'Gamificação Inteligente',
      description: 'Sua motivação em primeiro lugar',
      icon: <Trophy className="h-6 w-6" />,
      content: `O sistema de **gamificação** foi projetado para te manter engajado! 🎯

Elementos principais:

⚡ **XP dinâmico** - Ganhe mais XP por performance, rapidez e criatividade
🏅 **Badges especiais** - 6 categorias: Achievement, Skill, Streak, Special
🔥 **Streak de dias** - Mantenha a consistência e seja recompensado
🏆 **Leaderboard** - Compare seu progresso com outros estudantes

**Segredo:** O sistema recompensa qualidade sobre quantidade. Resolver bem vale mais que resolver rápido!`
    },
    {
      id: 'getting-started',
      title: 'Primeiros Passos',
      description: 'Vamos começar sua jornada!',
      icon: <BookOpen className="h-6 w-6" />,
      content: `Agora é hora de começar para valer! 🚀

**Seus próximos passos:**

1️⃣ **Defina uma meta diária** - Comece com 15-30 minutos por dia
2️⃣ **Faça a avaliação de nível** - Para personalizar sua jornada
3️⃣ **Comece o primeiro desafio** - "Página em Branco" te espera
4️⃣ **Use o sistema de dicas** - Não tenha vergonha de pedir ajuda

**Lembre-se:** Programação é uma habilidade que se constrói com prática constante. Pequenos passos diários levam a grandes resultados!

Pronto para se tornar um desenvolvedor? 💪`,
      action: {
        label: 'Fazer Avaliação de Nível',
        onClick: () => {
          // Aqui você dispararia a avaliação de nível
          onComplete()
        }
      }
    }
  ]

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const goToNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setIsVisible(false)
    setTimeout(() => {
      onComplete()
    }, 300)
  }

  const handleSkip = () => {
    setIsVisible(false)
    setTimeout(() => {
      onSkip()
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className={cn(
          "relative w-full max-w-2xl glass-card rounded-2xl shadow-2xl transform transition-all duration-300",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/20 p-2 rounded-lg">
                {currentStepData.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {currentStepData.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {currentStepData.description}
                </p>
              </div>
            </div>

            <Button
              onClick={handleSkip}
              variant="outline"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="px-6 pt-4">
            <div className="flex space-x-2 mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index <= currentStep ? "bg-primary" : "bg-muted",
                    index === currentStep ? "flex-2" : "flex-1"
                  )}
                />
              ))}
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Passo {currentStep + 1} de {steps.length}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 pt-4">
            <div className="prose prose-invert max-w-none">
              <div className="text-foreground leading-relaxed whitespace-pre-line text-sm">
                {currentStepData.content}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-border">
            <Button
              onClick={goToPrev}
              disabled={isFirstStep}
              variant="outline"
              className={cn(
                "flex items-center space-x-2",
                isFirstStep ? "opacity-50 cursor-not-allowed" : "glass-card premium-hover"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Anterior</span>
            </Button>

            <div className="text-center">
              <Button
                onClick={handleSkip}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                Pular introdução
              </Button>
            </div>

            {isLastStep ? (
              <div className="flex space-x-3">
                {currentStepData.action && (
                  <Button
                    onClick={currentStepData.action.onClick}
                    className="btn-primary-gradient premium-hover"
                  >
                    {currentStepData.action.label}
                  </Button>
                )}
                <Button
                  onClick={handleComplete}
                  className="glass-card text-foreground premium-hover"
                >
                  Finalizar
                </Button>
              </div>
            ) : (
              <Button
                onClick={goToNext}
                className="btn-primary-gradient premium-hover flex items-center space-x-2"
              >
                <span>Próximo</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}