import { supabase } from '@/lib/supabase/client'

interface AnalyticsEvent {
  id?: string
  student_id: string
  event_type: 'page_view' | 'challenge_start' | 'challenge_complete' | 'hint_used' | 'code_change' | 'error_encountered' | 'goal_completed' | 'session_start' | 'session_end' | 'user_inactive'
  challenge_id?: number
  section_id?: string
  duration?: number
  metadata?: Record<string, unknown>
  created_at?: string
}

interface TimeTracking {
  id?: string
  student_id: string
  session_id: string
  challenge_id?: number
  start_time: string
  end_time?: string
  total_time: number
  active_time: number
  inactive_time: number
  events_count: number
  metadata?: Record<string, unknown>
}

interface HeatmapData {
  id?: string
  student_id: string
  challenge_id: number
  section_id?: string
  difficulty_score: number
  error_count: number
  average_time: number
  completion_rate: number
  common_errors: string[]
  hint_usage_rate: number
  created_at?: string
  updated_at?: string
}

class AnalyticsService {
  private currentSession: TimeTracking | null = null
  private sessionTimeout: NodeJS.Timeout | null = null
  private lastActivity: number = Date.now()

  // Inicializar sessão de analytics
  async startSession(studentId: string, challengeId?: number) {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    this.currentSession = {
      student_id: studentId,
      session_id: sessionId,
      challenge_id: challengeId,
      start_time: new Date().toISOString(),
      total_time: 0,
      active_time: 0,
      inactive_time: 0,
      events_count: 0,
      metadata: {
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }

    // Salvar sessão no banco
    const { error } = await supabase
      .from('analytics_sessions')
      .insert([this.currentSession])

    if (error) {
      console.error('Erro ao iniciar sessão:', error)
      return
    }

    // Registrar evento de início
    await this.trackEvent({
      student_id: studentId,
      event_type: 'session_start',
      challenge_id: challengeId,
      metadata: this.currentSession.metadata
    })

    // Detectar inatividade
    this.setupInactivityDetection()

    console.log('📊 Analytics: Sessão iniciada', sessionId)
  }

  // Encerrar sessão
  async endSession() {
    if (!this.currentSession) return

    const endTime = new Date().toISOString()
    const totalTime = Date.now() - new Date(this.currentSession.start_time).getTime()

    // Atualizar sessão no banco
    const { error } = await supabase
      .from('analytics_sessions')
      .update({
        end_time: endTime,
        total_time: totalTime,
        active_time: this.currentSession.active_time,
        inactive_time: this.currentSession.inactive_time
      })
      .eq('session_id', this.currentSession.session_id)

    if (error) {
      console.error('Erro ao finalizar sessão:', error)
    }

    // Registrar evento de fim
    await this.trackEvent({
      student_id: this.currentSession.student_id,
      event_type: 'session_end',
      duration: totalTime,
      metadata: {
        totalEvents: this.currentSession.events_count,
        activeTime: this.currentSession.active_time,
        inactiveTime: this.currentSession.inactive_time
      }
    })

    console.log('📊 Analytics: Sessão finalizada', {
      duration: Math.round(totalTime / 1000) + 's',
      events: this.currentSession.events_count
    })

    this.currentSession = null
  }

  // Rastrear evento específico
  async trackEvent(event: Omit<AnalyticsEvent, 'id' | 'created_at'>) {
    const analyticsEvent: AnalyticsEvent = {
      created_at: new Date().toISOString(),
      ...event
    }

    // Salvar no banco
    const { error } = await supabase
      .from('analytics_events')
      .insert([analyticsEvent])

    if (error) {
      console.error('Erro ao salvar evento:', error)
      return
    }

    // Atualizar contador de eventos na sessão
    if (this.currentSession) {
      this.currentSession.events_count++
      this.lastActivity = Date.now()
    }

    console.log('📊 Analytics: Evento registrado', event.event_type)
  }

  // Rastrear tempo gasto em uma seção específica
  async trackTimeOnSection(sectionId: string, duration: number) {
    if (!this.currentSession) return

    await this.trackEvent({
      student_id: this.currentSession.student_id,
      event_type: 'page_view',
      section_id: sectionId,
      duration,
      metadata: {
        section: sectionId,
        timeSpent: duration
      }
    })
  }

  // Rastrear erros de código
  async trackCodeError(challengeId: number, error: string, code: string) {
    if (!this.currentSession) return

    await this.trackEvent({
      student_id: this.currentSession.student_id,
      event_type: 'error_encountered',
      challenge_id: challengeId,
      metadata: {
        error,
        codeSnippet: code.substring(0, 200),
        codeLength: code.length,
        errorType: this.categorizeError(error)
      }
    })
  }

  // Rastrear uso de hints
  async trackHintUsage(challengeId: number, hintLevel: number, hintContent: string) {
    if (!this.currentSession) return

    await this.trackEvent({
      student_id: this.currentSession.student_id,
      event_type: 'hint_used',
      challenge_id: challengeId,
      metadata: {
        hintLevel,
        hintContent: hintContent.substring(0, 100),
        timeBeforeHint: Date.now() - new Date(this.currentSession.start_time).getTime()
      }
    })
  }

  // Obter heatmap de dificuldade
  async getHeatmapData(studentId: string, challengeId?: number): Promise<HeatmapData[]> {
    let query = supabase
      .from('heatmap_data')
      .select('*')
      .eq('student_id', studentId)

    if (challengeId) {
      query = query.eq('challenge_id', challengeId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao carregar heatmap:', error)
      return []
    }

    return data || []
  }

  // Obter estatísticas de tempo por estudante
  async getTimeStatistics(studentId: string, days: number = 7) {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    // Buscar eventos do período
    const { data: events, error: eventsError } = await supabase
      .from('analytics_events')
      .select('*')
      .eq('student_id', studentId)
      .gte('created_at', cutoffDate.toISOString())

    if (eventsError) {
      console.error('Erro ao carregar eventos:', eventsError)
      return this.getDefaultStats()
    }

    // Buscar sessões do período
    const { data: sessions, error: sessionsError } = await supabase
      .from('analytics_sessions')
      .select('*')
      .eq('student_id', studentId)
      .gte('start_time', cutoffDate.toISOString())

    if (sessionsError) {
      console.error('Erro ao carregar sessões:', sessionsError)
      return this.getDefaultStats()
    }

    const stats = {
      totalTime: 0,
      avgSessionTime: 0,
      sessionsCount: sessions?.length || 0,
      mostActiveHour: 0,
      productiveHours: [] as number[],
      challengesCompleted: 0,
      hintsUsed: 0,
      errorsCount: 0
    }

    // Calcular tempo total
    stats.totalTime = sessions?.reduce((sum, s) => sum + (s.total_time || 0), 0) || 0
    stats.avgSessionTime = stats.totalTime / Math.max(stats.sessionsCount, 1)

    if (events) {
      // Analisar horas mais produtivas
      const hourCounts: { [key: number]: number } = {}
      events.forEach(event => {
        const hour = new Date(event.created_at!).getHours()
        hourCounts[hour] = (hourCounts[hour] || 0) + 1
      })

      if (Object.keys(hourCounts).length > 0) {
        stats.mostActiveHour = parseInt(Object.keys(hourCounts).reduce((a, b) =>
          hourCounts[parseInt(a)] > hourCounts[parseInt(b)] ? a : b
        ))

        stats.productiveHours = Object.keys(hourCounts)
          .sort((a, b) => hourCounts[parseInt(b)] - hourCounts[parseInt(a)])
          .slice(0, 3)
          .map(h => parseInt(h))
      }

      // Contar eventos específicos
      stats.challengesCompleted = events.filter(e => e.event_type === 'challenge_complete').length
      stats.hintsUsed = events.filter(e => e.event_type === 'hint_used').length
      stats.errorsCount = events.filter(e => e.event_type === 'error_encountered').length
    }

    return stats
  }

  // Salvar/atualizar dados do heatmap
  async updateHeatmapData(studentId: string, challengeId: number, data: Partial<HeatmapData>) {
    // Verificar se já existe entrada para este desafio
    const { data: existing, error: selectError } = await supabase
      .from('heatmap_data')
      .select('id')
      .eq('student_id', studentId)
      .eq('challenge_id', challengeId)
      .single()

    if (selectError && selectError.code !== 'PGRST116') {
      console.error('Erro ao verificar heatmap existente:', selectError)
      return
    }

    const heatmapData = {
      student_id: studentId,
      challenge_id: challengeId,
      updated_at: new Date().toISOString(),
      ...data
    }

    if (existing) {
      // Atualizar existente
      const { error } = await supabase
        .from('heatmap_data')
        .update(heatmapData)
        .eq('id', existing.id)

      if (error) {
        console.error('Erro ao atualizar heatmap:', error)
      }
    } else {
      // Criar novo
      const { error } = await supabase
        .from('heatmap_data')
        .insert([heatmapData])

      if (error) {
        console.error('Erro ao criar heatmap:', error)
      }
    }
  }

  // Configurar detecção de inatividade
  private setupInactivityDetection() {
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']

    const resetInactivityTimer = () => {
      if (this.sessionTimeout) {
        clearTimeout(this.sessionTimeout)
      }

      this.sessionTimeout = setTimeout(() => {
        if (this.currentSession) {
          this.currentSession.inactive_time += Date.now() - this.lastActivity
          this.trackEvent({
            student_id: this.currentSession.student_id,
            event_type: 'user_inactive',
            metadata: {
              inactiveDuration: Date.now() - this.lastActivity
            }
          })
        }
      }, 120000) // 2 minutos
    }

    activityEvents.forEach(event => {
      document.addEventListener(event, resetInactivityTimer, true)
    })

    resetInactivityTimer()
  }

  // Categorizar tipos de erro
  private categorizeError(error: string): string {
    if (error.includes('Syntax')) return 'syntax'
    if (error.includes('Type')) return 'type'
    if (error.includes('Reference')) return 'reference'
    if (error.includes('HTML')) return 'html_validation'
    if (error.includes('CSS')) return 'css_validation'
    return 'other'
  }

  // Estatísticas padrão quando há erro
  private getDefaultStats() {
    return {
      totalTime: 0,
      avgSessionTime: 0,
      sessionsCount: 0,
      mostActiveHour: 9,
      productiveHours: [9, 14, 20],
      challengesCompleted: 0,
      hintsUsed: 0,
      errorsCount: 0
    }
  }
}

export const analyticsService = new AnalyticsService()
export type { AnalyticsEvent, TimeTracking, HeatmapData }