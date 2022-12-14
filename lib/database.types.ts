export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      peer_review: {
        Row: {
          id: string
          created_at: string | null
          email: string | null
          stood_out: string | null
          created_by: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          email?: string | null
          stood_out?: string | null
          created_by?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          email?: string | null
          stood_out?: string | null
          created_by?: string | null
        }
      }
      peer_review_score: {
        Row: {
          id: number
          comment: string | null
          score: number | null
          peer_review_id: string | null
          created_at: string | null
          title: string | null
        }
        Insert: {
          id?: number
          comment?: string | null
          score?: number | null
          peer_review_id?: string | null
          created_at?: string | null
          title?: string | null
        }
        Update: {
          id?: number
          comment?: string | null
          score?: number | null
          peer_review_id?: string | null
          created_at?: string | null
          title?: string | null
        }
      }
      profile: {
        Row: {
          created_at: string | null
          email: string | null
          avatar: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          avatar?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          avatar?: string | null
          id?: string
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_profile: {
        Args: { email: string; user_id: string }
        Returns: unknown
      }
      select_all_profile: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      select_keyword: {
        Args: { keyword_input: string }
        Returns: unknown
      }
      select_peer_review: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      select_profile: {
        Args: { input_user_id: string }
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
