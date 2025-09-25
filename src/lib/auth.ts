// lib/auth.ts - Sistema de autenticação simples e educativo
// Este arquivo mostra como fazer auth com Supabase de forma clara

import { supabase } from './supabase/client'
import type { User } from '@supabase/supabase-js'

// Tipos simples para entender melhor
export interface AuthUser {
  id: string
  email: string
  name?: string
}

// Função para fazer LOGIN
export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    return { user: data.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

// Função para fazer REGISTRO
export async function signUpWithEmail(email: string, password: string, name: string) {
  try {
    // 1. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      throw authError
    }

    // 2. Se der certo, criar entrada na nossa tabela 'students'
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('students')
        .insert([
          {
            id: authData.user.id,
            email: email,
            name: name,
            current_challenge: 1,
            total_xp: 0,
            streak_days: 0,
            badges: [],
          }
        ])

      if (profileError) {
        throw profileError
      }
    }

    return { user: authData.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

// Função para fazer LOGOUT
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

// Função para pegar o usuário atual
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return null
  }
}

// Função para pegar dados do estudante (nossa tabela)
export async function getStudentData(userId: string) {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      throw error
    }

    return { student: data, error: null }
  } catch (error: any) {
    return { student: null, error: error.message }
  }
}