'use client'

import { useEffect, useRef, useCallback } from 'react'
import { analyticsService } from '@/lib/analytics/analyticsService'

interface UseAnalyticsProps {
  studentId: string
  challengeId?: number
  autoStart?: boolean
}

export function useAnalytics({ studentId, challengeId, autoStart = true }: UseAnalyticsProps) {
  const sessionStarted = useRef(false)
  const sectionStartTime = useRef<number>(Date.now())
  const currentSectionId = useRef<string>('')

  // Inicializar sessão automaticamente
  useEffect(() => {
    if (autoStart && studentId && !sessionStarted.current) {
      analyticsService.startSession(studentId, challengeId)
      sessionStarted.current = true

      // Cleanup quando o componente for desmontado
      return () => {
        if (sessionStarted.current) {
          analyticsService.endSession()
          sessionStarted.current = false
        }
      }
    }
  }, [studentId, challengeId, autoStart])

  // Finalizar sessão quando mudar de usuário
  useEffect(() => {
    return () => {
      if (sessionStarted.current) {
        analyticsService.endSession()
        sessionStarted.current = false
      }
    }
  }, [studentId])

  // Funções de tracking
  const trackEvent = useCallback((eventType: string, metadata?: Record<string, unknown>) => {
    analyticsService.trackEvent({
      student_id: studentId,
      event_type: eventType as 'session_start' | 'session_end' | 'challenge_start' | 'challenge_complete' | 'hint_used' | 'error_encountered' | 'goal_completed',
      challenge_id: challengeId,
      metadata
    })
  }, [studentId, challengeId])

  const trackChallengeStart = (challengeId: number) => {
    analyticsService.trackEvent({
      student_id: studentId,
      event_type: 'challenge_start',
      challenge_id: challengeId,
      metadata: {
        startTime: new Date().toISOString()
      }
    })
  }

  const trackChallengeComplete = (challengeId: number, timeSpent: number, hintsUsed: number) => {
    analyticsService.trackEvent({
      student_id: studentId,
      event_type: 'challenge_complete',
      challenge_id: challengeId,
      duration: timeSpent,
      metadata: {
        hintsUsed,
        completionTime: new Date().toISOString()
      }
    })
  }

  const trackCodeChange = (challengeId: number, codeLength: number) => {
    analyticsService.trackEvent({
      student_id: studentId,
      event_type: 'code_change',
      challenge_id: challengeId,
      metadata: {
        codeLength,
        timestamp: Date.now()
      }
    })
  }

  const trackError = (challengeId: number, error: string, code: string) => {
    analyticsService.trackCodeError(challengeId, error, code)
  }

  const trackHintUsage = (challengeId: number, hintLevel: number, hintContent: string) => {
    analyticsService.trackHintUsage(challengeId, hintLevel, hintContent)
  }

  const trackGoalCompletion = (goalType: string, goalValue: number) => {
    analyticsService.trackEvent({
      student_id: studentId,
      event_type: 'goal_completed',
      metadata: {
        goalType,
        goalValue,
        completionTime: new Date().toISOString()
      }
    })
  }

  // Tracking de tempo em seções
  const startSectionTimer = (sectionId: string) => {
    // Finalizar seção anterior se existir
    if (currentSectionId.current) {
      finishSectionTimer()
    }

    currentSectionId.current = sectionId
    sectionStartTime.current = Date.now()
  }

  const finishSectionTimer = () => {
    if (currentSectionId.current) {
      const timeSpent = Date.now() - sectionStartTime.current
      analyticsService.trackTimeOnSection(currentSectionId.current, timeSpent)

      currentSectionId.current = ''
      sectionStartTime.current = Date.now()
    }
  }

  // Tracking automático de inatividade
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(() => {
        trackEvent('user_inactive', {
          inactiveDuration: 300000, // 5 minutos
          timestamp: Date.now()
        })
      }, 300000) // 5 minutos
    }

    // Eventos que indicam atividade
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']

    activityEvents.forEach(event => {
      document.addEventListener(event, resetInactivityTimer, true)
    })

    resetInactivityTimer()

    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer, true)
      })
      clearTimeout(inactivityTimer)
    }
  }, [studentId, trackEvent])

  return {
    // Funções de tracking
    trackEvent,
    trackChallengeStart,
    trackChallengeComplete,
    trackCodeChange,
    trackError,
    trackHintUsage,
    trackGoalCompletion,

    // Controle de seções
    startSectionTimer,
    finishSectionTimer,

    // Controle de sessão
    startSession: () => {
      if (!sessionStarted.current) {
        analyticsService.startSession(studentId, challengeId)
        sessionStarted.current = true
      }
    },
    endSession: () => {
      if (sessionStarted.current) {
        analyticsService.endSession()
        sessionStarted.current = false
      }
    },

    // Estado
    isSessionActive: sessionStarted.current
  }
}