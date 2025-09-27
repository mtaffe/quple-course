// hooks/useAuth.ts - Hook React para gerenciar autenticação
// Exemplo educativo de como usar hooks personalizados

'use client'

import { useState, useEffect } from 'react'
import { getCurrentUser, getStudentData } from '@/lib/auth'
import type { User } from '@supabase/supabase-js'

// Interface para os dados do estudante
interface Student {
  id: string
  name: string
  email: string
  current_challenge: number
  total_xp: number
  streak_days: number
  badges: string[]
  created_at: string
  last_activity_date: string
}

// Hook personalizado - retorna tudo que precisamos saber sobre auth
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Função para carregar dados do usuário
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)

        // Se tem usuário, buscar dados do estudante
        if (currentUser) {
          const { student: studentData } = await getStudentData(currentUser.id)
          setStudent(studentData)
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  // Função para atualizar dados após login/registro
  const refreshUser = async () => {
    setLoading(true)
    const currentUser = await getCurrentUser()
    setUser(currentUser)

    if (currentUser) {
      const { student: studentData } = await getStudentData(currentUser.id)
      setStudent(studentData)
    } else {
      setStudent(null)
    }
    setLoading(false)
  }

  // Função para limpar dados após logout
  const clearUser = () => {
    setUser(null)
    setStudent(null)
  }

  return {
    user,           // Dados do Supabase Auth
    student,        // Dados da nossa tabela students
    loading,        // Se está carregando
    isAuthenticated: !!user,  // Boolean: está logado?
    refreshUser,    // Função para recarregar dados
    clearUser,      // Função para limpar após logout
  }
}