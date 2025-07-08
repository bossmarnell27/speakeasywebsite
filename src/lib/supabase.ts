import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on schema
export interface Database {
  public: {
    Tables: {
      teachers: {
        Row: {
          id: string
          name: string
          email: string
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          created_at?: string | null
        }
      }
      students: {
        Row: {
          id: string
          name: string
          email: string
          grade: string
          teacher_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          grade?: string
          teacher_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          grade?: string
          teacher_id?: string | null
          created_at?: string | null
        }
      }
      assignments: {
        Row: {
          id: string
          title: string
          description: string
          due_date: string
          time_limit: number
          difficulty: string
          teacher_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          due_date: string
          time_limit?: number
          difficulty?: string
          teacher_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          due_date?: string
          time_limit?: number
          difficulty?: string
          teacher_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      student_assignments: {
        Row: {
          id: string
          student_id: string | null
          assignment_id: string | null
          status: string
          submitted_at: string | null
          graded_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          student_id?: string | null
          assignment_id?: string | null
          status?: string
          submitted_at?: string | null
          graded_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string | null
          assignment_id?: string | null
          status?: string
          submitted_at?: string | null
          graded_at?: string | null
          created_at?: string | null
        }
      }
      assignment_scores: {
        Row: {
          id: string
          student_assignment_id: string | null
          overall_score: number
          tone_score: number
          tone_feedback: string | null
          rhythm_score: number
          rhythm_feedback: string | null
          body_language_score: number
          body_language_feedback: string | null
          filler_words_um: number | null
          filler_words_like: number | null
          filler_words_you_know: number | null
          recording_url: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          student_assignment_id?: string | null
          overall_score?: number
          tone_score?: number
          tone_feedback?: string | null
          rhythm_score?: number
          rhythm_feedback?: string | null
          body_language_score?: number
          body_language_feedback?: string | null
          filler_words_um?: number | null
          filler_words_like?: number | null
          filler_words_you_know?: number | null
          recording_url?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          student_assignment_id?: string | null
          overall_score?: number
          tone_score?: number
          tone_feedback?: string | null
          rhythm_score?: number
          rhythm_feedback?: string | null
          body_language_score?: number
          body_language_feedback?: string | null
          filler_words_um?: number | null
          filler_words_like?: number | null
          filler_words_you_know?: number | null
          recording_url?: string | null
          created_at?: string | null
        }
      }
    }
  }
}