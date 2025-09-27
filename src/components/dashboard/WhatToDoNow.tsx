'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Clock, Target, BookOpen, Code, ChevronRight, Lightbulb, Calendar, Trophy, HelpCircle } from 'lucide-react'
import { challenges } from '@/lib/challenges'

interface Student {
  id: string
  name: string
  current_challenge: number
  total_xp: number
  streak_days: number
  last_activity_date: string
}

interface WhatToDoNowProps {
  student: Student
  onStartChallenge: (challengeId: number) => void
}

interface RecommendedAction {
  type: 'challenge' | 'review' | 'learn' | 'practice' | 'break'
  title: string
  description: string
  action: string
  time: string
  icon: React.ReactElement
  priority: 'high' | 'medium' | 'low'
  actionType: 'primary' | 'secondary'
}

export function WhatToDoNow({ student, onStartChallenge }: WhatToDoNowProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [daysSinceLastActivity, setDaysSinceLastActivity] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000) // Update every minute
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const lastActivity = new Date(student.last_activity_date)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - lastActivity.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setDaysSinceLastActivity(diffDays)
  }, [student.last_activity_date])

  const getRecommendedAction = (): RecommendedAction => {
    const hour = currentTime.getHours()
    const currentChallenge = challenges.find(c => c.id === student.current_challenge)
    const isWeekend = [0, 6].includes(currentTime.getDay())
    const isLongBreak = daysSinceLastActivity > 2

    // Cenários específicos baseados em contexto
    if (isLongBreak) {
      return {
        type: 'review',
        title: 'Bem-vindo de volta! 🎉',
        description: `Você esteve ${daysSinceLastActivity} dias offline. Que tal uma revisão rápida antes de continuar?`,
        action: 'Fazer Revisão Rápida',
        time: '10 min',
        icon: <BookOpen className="h-5 w-5" />,
        priority: 'high',
        actionType: 'secondary'
      }
    }

    if (hour >= 6 && hour < 9) {
      // Manhã - Energia alta para desafios
      return {
        type: 'challenge',
        title: `Bom dia! Hora do Desafio ${student.current_challenge} ☀️`,
        description: currentChallenge ?
          `"${currentChallenge.title}" - Sua mente está fresca, perfeito para códigos!` :
          'Hora de codar! Sua mente matinal está perfeita para novos desafios.',
        action: `Começar Desafio ${student.current_challenge}`,
        time: currentChallenge?.estimatedTime ? `${currentChallenge.estimatedTime} min` : '20 min',
        icon: <Code className="h-5 w-5" />,
        priority: 'high',
        actionType: 'primary'
      }
    }

    if (hour >= 9 && hour < 12) {
      // Meio da manhã - Produtivo
      return {
        type: 'challenge',
        title: `Foco total! Desafio ${student.current_challenge} te espera 🎯`,
        description: currentChallenge ?
          `${currentChallenge.description} - Você está no seu pico de produtividade!` :
          'Horário perfeito para se concentrar e avançar no aprendizado.',
        action: `Continuar Desafio ${student.current_challenge}`,
        time: currentChallenge?.estimatedTime ? `${currentChallenge.estimatedTime} min` : '20 min',
        icon: <Target className="h-5 w-5" />,
        priority: 'high',
        actionType: 'primary'
      }
    }

    if (hour >= 12 && hour < 14) {
      // Almoço - Conteúdo leve
      return {
        type: 'learn',
        title: 'Pausa para o almoço? 🍽️',
        description: 'Que tal revisar alguns conceitos enquanto descansa? Leitura leve e educativa.',
        action: 'Ver Conceitos Teóricos',
        time: '15 min',
        icon: <BookOpen className="h-5 w-5" />,
        priority: 'medium',
        actionType: 'secondary'
      }
    }

    if (hour >= 14 && hour < 17) {
      // Tarde - Energia moderada
      return {
        type: 'challenge',
        title: `Tarde produtiva! Desafio ${student.current_challenge} 🚀`,
        description: currentChallenge ?
          `"${currentChallenge.title}" - Energia da tarde perfeita para programar!` :
          'Hora de colocar a mão na massa e avançar no seu aprendizado.',
        action: `Continuar Desafio ${student.current_challenge}`,
        time: currentChallenge?.estimatedTime ? `${currentChallenge.estimatedTime} min` : '20 min',
        icon: <Code className="h-5 w-5" />,
        priority: 'high',
        actionType: 'primary'
      }
    }

    if (hour >= 17 && hour < 19) {
      // Final da tarde - Ainda produtivo
      return {
        type: 'challenge',
        title: `Última chance de ouro! ⭐`,
        description: 'Finalize seu dia com uma vitória! Um desafio antes do jantar.',
        action: `Desafio ${student.current_challenge}`,
        time: currentChallenge?.estimatedTime ? `${currentChallenge.estimatedTime} min` : '20 min',
        icon: <Trophy className="h-5 w-5" />,
        priority: 'medium',
        actionType: 'primary'
      }
    }

    if (hour >= 19 && hour < 22) {
      // Noite - Relaxado
      if (isWeekend) {
        return {
          type: 'practice',
          title: 'Final de semana relaxante 🌙',
          description: 'Que tal praticar algo que já aprendeu? Sem pressão, só diversão!',
          action: 'Praticar Conceitos',
          time: '15 min',
          icon: <Lightbulb className="h-5 w-5" />,
          priority: 'low',
          actionType: 'secondary'
        }
      }

      return {
        type: 'learn',
        title: 'Noite de estudos! 📚',
        description: 'Hora perfeita para absorver novos conhecimentos com calma.',
        action: 'Estudar Teoria',
        time: '20 min',
        icon: <BookOpen className="h-5 w-5" />,
        priority: 'medium',
        actionType: 'secondary'
      }
    }

    // Noite tarde (22h+) ou madrugada
    return {
      type: 'break',
      title: 'Hora de descansar! 😴',
      description: 'Seu cérebro precisa de descanso para absorver tudo que aprendeu hoje.',
      action: 'Descansar e Voltar Amanhã',
      time: '8h sono',
      icon: <Calendar className="h-5 w-5" />,
      priority: 'high',
      actionType: 'secondary'
    }
  }

  const recommendation = getRecommendedAction()
  const hasStreak = student.streak_days > 0

  const handleActionClick = () => {
    if (recommendation.type === 'challenge') {
      onStartChallenge(student.current_challenge)
    } else if (recommendation.type === 'learn') {
      window.location.href = '/learn'
    } else if (recommendation.type === 'review') {
      // Ir para o último desafio completado para revisão
      const lastCompleted = Math.max(1, student.current_challenge - 1)
      window.location.href = `/challenge/${lastCompleted}`
    } else if (recommendation.type === 'practice') {
      window.location.href = '/dashboard' // Pode direcionar para uma área de prática
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-green-500 bg-green-500/10'
      case 'medium': return 'border-l-yellow-500 bg-yellow-500/10'
      case 'low': return 'border-l-blue-500 bg-blue-500/10'
      default: return 'border-l-gray-500 bg-gray-500/10'
    }
  }

  const getTimeOfDayGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 6) return '🌙 Madrugada'
    if (hour < 12) return '☀️ Manhã'
    if (hour < 18) return '🌤️ Tarde'
    return '🌆 Noite'
  }

  return (
    <div className="glass-card rounded-xl p-6 border-l-4 border-l-primary">
      {/* Header with context */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/20 p-2 rounded-lg">
            {recommendation.icon}
          </div>
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              O que fazer agora
              <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                {getTimeOfDayGreeting()}
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Sua próxima ação recomendada
            </p>
          </div>
        </div>

        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {recommendation.time}
        </div>
      </div>

      {/* Recommendation content */}
      <div className={`p-4 rounded-lg border-l-4 ${getPriorityColor(recommendation.priority)} mb-4`}>
        <h4 className="font-medium text-foreground mb-2">
          {recommendation.title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {recommendation.description}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleActionClick}
          disabled={recommendation.type === 'break'}
          className={
            recommendation.actionType === 'primary'
              ? 'btn-primary-gradient font-medium premium-hover flex-1'
              : 'glass-card text-foreground font-medium premium-hover flex-1'
          }
        >
          {recommendation.action}
          {recommendation.type !== 'break' && <ChevronRight className="h-4 w-4 ml-2" />}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="sm:w-auto"
          onClick={() => window.location.href = '/learn'}
          title="Ver todos os conteúdos disponíveis"
        >
          <HelpCircle className="h-4 w-4" />
          <span className="hidden sm:inline ml-2">Explorar</span>
        </Button>
      </div>

      {/* Context indicators */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Target className="h-3 w-3 mr-1" />
            Progresso: {student.current_challenge - 1}/{challenges.length} desafios
          </span>
          {hasStreak && (
            <span className="flex items-center">
              <Trophy className="h-3 w-3 mr-1" />
              {student.streak_days} dias seguidos
            </span>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          {currentTime.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  )
}