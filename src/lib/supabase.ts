import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          client_name: string
          client_email: string
          event_type: string
          event_date: string
          message: string
          status: 'inquiry' | 'confirmed' | 'cleared'
          assigned_admin_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_name: string
          client_email: string
          event_type: string
          event_date: string
          message: string
          status?: 'inquiry' | 'confirmed' | 'cleared'
          assigned_admin_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          client_email?: string
          event_type?: string
          event_date?: string
          message?: string
          status?: 'inquiry' | 'confirmed' | 'cleared'
          assigned_admin_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      receipts: {
        Row: {
          id: string
          booking_id: string
          file_url: string
          amount: number
          description: string
          uploaded_by: string
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          file_url: string
          amount: number
          description: string
          uploaded_by: string
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          file_url?: string
          amount?: number
          description?: string
          uploaded_by?: string
          created_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'super_admin'
          status: 'pending_admin' | 'active' | 'revoked'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role: 'admin' | 'super_admin'
          status?: 'pending_admin' | 'active' | 'revoked'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'super_admin'
          status?: 'pending_admin' | 'active' | 'revoked'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}