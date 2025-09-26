// Sistema de progresso educativo - XP e Conquistas
// Este arquivo gerencia o progresso do estudante de forma didática

import { supabase } from '@/lib/supabase/client'
import { ValidationResult } from '@/types'

export interface BadgeInfo {
  id: string
  name: string
  description: string
  icon: string
  category: 'achievement' | 'streak' | 'skill' | 'special'
}

// Definição de todas as conquistas possíveis
export const AVAILABLE_BADGES: Record<string, BadgeInfo> = {
  first_html: {
    id: 'first_html',
    name: 'Primeira Página',
    description: 'Criou sua primeira página HTML válida!',
    icon: '🌟',
    category: 'achievement'
  },
  semantic_master: {
    id: 'semantic_master',
    name: 'Mestre Semântico',
    description: 'Usou tags semânticas perfeitamente!',
    icon: '🏗️',
    category: 'skill'
  },
  accessibility_hero: {
    id: 'accessibility_hero',
    name: 'Herói da Acessibilidade',
    description: 'Conectou labels aos inputs corretamente!',
    icon: '♿',
    category: 'skill'
  },
  fast_learner: {
    id: 'fast_learner',
    name: 'Aprendiz Rápido',
    description: 'Completou um desafio sem usar dicas!',
    icon: '⚡',
    category: 'achievement'
  },
  persistent: {
    id: 'persistent',
    name: 'Persistente',
    description: 'Tentou mais de 5 vezes até conseguir!',
    icon: '💪',
    category: 'achievement'
  },
  streak_3: {
    id: 'streak_3',
    name: 'Consistente',
    description: 'Programou 3 dias seguidos!',
    icon: '🔥',
    category: 'streak'
  },
  streak_7: {
    id: 'streak_7',
    name: 'Dedicado',
    description: 'Programou 7 dias seguidos!',
    icon: '🚀',
    category: 'streak'
  }
}

export class ProgressService {

  // Função principal: completar um desafio e ganhar recompensas
  static async completeChallenge(
    studentId: string,
    challengeId: number,
    validation: ValidationResult,
    hintsUsed: number,
    attempts: number,
    timeSpent: number
  ) {
    try {
      console.log(`🎯 Completando desafio ${challengeId} para estudante ${studentId}`)

      // 1. Calcular XP baseado na performance
      const baseXP = this.getBaseXP(challengeId)
      const performanceMultiplier = this.calculatePerformanceMultiplier(
        validation.score,
        hintsUsed,
        attempts,
        timeSpent
      )
      const earnedXP = Math.round(baseXP * performanceMultiplier)

      console.log(`💰 XP calculado: ${earnedXP} (base: ${baseXP}, multiplicador: ${performanceMultiplier})`)

      // 2. Determinar conquistas desbloqueadas
      const newBadges = this.determineBadges(validation, hintsUsed, attempts)
      console.log(`🏆 Badges conquistados:`, newBadges)

      // 3. Atualizar dados do estudante
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('total_xp, badges, current_challenge')
        .eq('id', studentId)
        .single()

      if (studentError) throw studentError

      // 4. Verificar se pode avançar para próximo desafio
      const nextChallenge = challengeId >= student.current_challenge
        ? student.current_challenge + 1
        : student.current_challenge

      // 5. Combinar badges existentes com novos (sem duplicatas)
      const currentBadges = student.badges || []
      const allBadges = [...new Set([...currentBadges, ...newBadges])]

      // 6. Atualizar student na database
      const { error: updateError } = await supabase
        .from('students')
        .update({
          total_xp: student.total_xp + earnedXP,
          badges: allBadges,
          current_challenge: nextChallenge
        })
        .eq('id', studentId)

      if (updateError) throw updateError

      // 7. Registrar submission
      const { error: submissionError } = await supabase
        .from('submissions')
        .insert({
          student_id: studentId,
          challenge_id: challengeId,
          code: '', // será preenchido pelo componente
          status: 'completed',
          attempts: attempts,
          time_spent: timeSpent
        })

      if (submissionError) throw submissionError

      console.log('✅ Progresso salvo com sucesso!')

      return {
        earnedXP,
        newBadges,
        totalXP: student.total_xp + earnedXP,
        unlockedNextChallenge: nextChallenge > student.current_challenge
      }

    } catch (error) {
      console.error('❌ Erro ao salvar progresso:', error)
      throw error
    }
  }

  // Calcular XP base por desafio
  private static getBaseXP(challengeId: number): number {
    const xpMap: Record<number, number> = {
      1: 100, // Primeiro desafio é especial
      2: 80,
      3: 80,
      4: 90,
      5: 120, // Primeira introdução ao CSS
      6: 150,
      7: 150,
      8: 200, // JavaScript
      9: 200,
      10: 300 // React - final
    }
    return xpMap[challengeId] || 50
  }

  // Calcular multiplicador baseado na performance
  private static calculatePerformanceMultiplier(
    score: number,
    hintsUsed: number,
    attempts: number,
    timeSpent: number
  ): number {
    let multiplier = 1.0

    // Multiplicador baseado na pontuação (mais generoso)
    if (score >= 95) multiplier += 0.4      // 140% para quase perfeito
    else if (score >= 85) multiplier += 0.3  // 130% para muito bom
    else if (score >= 70) multiplier += 0.2  // 120% para bom
    else if (score >= 50) multiplier += 0.1  // 110% para razoável
    else if (score >= 30) multiplier *= 0.8  // 80% para incompleto
    else multiplier *= 0.6                   // 60% para muito incompleto

    // Bonus/penalty por usar dicas
    if (hintsUsed === 0) multiplier += 0.2   // Bonus por não usar dicas
    else if (hintsUsed >= 3) multiplier -= 0.1 // Small penalty por muitas dicas

    // Bonus/penalty por tentativas
    if (attempts <= 2) multiplier += 0.1     // Bonus por poucos attempts
    else if (attempts >= 10) multiplier -= 0.1 // Penalty por muitos attempts

    // Bonus por resolver rápido (menos de 20min para Challenge 1)
    if (timeSpent < 20 * 60) multiplier += 0.1

    // Garantir que sempre dê algum XP (mínimo 30%, máximo 200%)
    return Math.max(0.3, Math.min(2.0, multiplier))
  }

  // Determinar quais badges o usuário ganhou
  private static determineBadges(
    validation: ValidationResult,
    hintsUsed: number,
    attempts: number
  ): string[] {
    const badges: string[] = []

    // Badges do sistema de validação
    badges.push(...validation.achievements)

    // Badge por não usar dicas
    if (hintsUsed === 0) {
      badges.push('fast_learner')
    }

    // Badge por persistência
    if (attempts >= 5) {
      badges.push('persistent')
    }

    return badges
  }

  // Buscar informações completas de um badge
  static getBadgeInfo(badgeId: string): BadgeInfo | null {
    return AVAILABLE_BADGES[badgeId] || null
  }

  // Buscar todos os badges de um estudante com informações completas
  static async getStudentBadges(studentId: string): Promise<BadgeInfo[]> {
    try {
      const { data: student, error } = await supabase
        .from('students')
        .select('badges')
        .eq('id', studentId)
        .single()

      if (error) throw error

      const badgeIds = student.badges || []
      return badgeIds
        .map((id: string) => this.getBadgeInfo(id))
        .filter((badge: BadgeInfo | null) => badge !== null) as BadgeInfo[]

    } catch (error) {
      console.error('Erro ao buscar badges:', error)
      return []
    }
  }

  // Calcular nível baseado no XP total
  static calculateLevel(totalXP: number): { level: number, xpForNext: number, xpInLevel: number } {
    // Sistema progressivo: 100, 300, 600, 1000, 1500, 2100...
    let level = 1
    let xpNeeded = 0
    let totalNeeded = 0

    while (totalXP >= totalNeeded) {
      xpNeeded = 100 + (level - 1) * 200 // 100, 300, 500, 700...
      totalNeeded += xpNeeded
      if (totalXP >= totalNeeded) level++
    }

    // Recalcular para o nível atual
    const prevLevelTotal = totalNeeded - xpNeeded
    const xpInLevel = totalXP - prevLevelTotal
    const xpForNext = xpNeeded - xpInLevel

    return {
      level,
      xpForNext,
      xpInLevel
    }
  }

  // Buscar ranking dos estudantes
  static async getLeaderboard(limit: number = 10) {
    try {
      const { data: students, error } = await supabase
        .from('students')
        .select('id, name, total_xp, current_challenge, badges, streak_days')
        .order('total_xp', { ascending: false })
        .limit(limit)

      if (error) throw error

      return students.map((student, index) => ({
        rank: index + 1,
        ...student,
        level: this.calculateLevel(student.total_xp).level,
        badgeCount: (student.badges || []).length
      }))

    } catch (error) {
      console.error('Erro ao buscar ranking:', error)
      return []
    }
  }
}