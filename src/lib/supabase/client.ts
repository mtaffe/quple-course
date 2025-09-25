import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-project-url'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      students: {
        Row: {
          id: string
          name: string
          email: string
          current_challenge: number
          total_xp: number
          streak_days: number
          badges: string[]
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          current_challenge?: number
          total_xp?: number
          streak_days?: number
          badges?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          current_challenge?: number
          total_xp?: number
          streak_days?: number
          badges?: string[]
          created_at?: string
        }
      }
      submissions: {
        Row: {
          id: string
          student_id: string
          challenge_id: number
          code: string
          status: 'pending' | 'completed' | 'failed'
          attempts: number
          time_spent: number
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          student_id: string
          challenge_id: number
          code: string
          status?: 'pending' | 'completed' | 'failed'
          attempts?: number
          time_spent?: number
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string
          challenge_id?: number
          code?: string
          status?: 'pending' | 'completed' | 'failed'
          attempts?: number
          time_spent?: number
          created_at?: string
          completed_at?: string | null
        }
      }
      challenges_metadata: {
        Row: {
          id: number
          title: string
          description: string
          difficulty: 'easy' | 'medium' | 'hard'
          xp_reward: number
          estimated_time: number
          prerequisites: number[]
          created_at: string
        }
        Insert: {
          id: number
          title: string
          description: string
          difficulty: 'easy' | 'medium' | 'hard'
          xp_reward: number
          estimated_time: number
          prerequisites?: number[]
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          difficulty?: 'easy' | 'medium' | 'hard'
          xp_reward?: number
          estimated_time?: number
          prerequisites?: number[]
          created_at?: string
        }
      }
    }
  }
}