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
      api_call: {
        Row: {
          id: string
          api_name: string | null
          called_by: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          api_name?: string | null
          called_by?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          api_name?: string | null
          called_by?: string | null
          created_at?: string | null
        }
      }
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
      post: {
        Row: {
          id: string
          image: string | null
          description: string | null
          is_public: boolean | null
          user_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          image?: string | null
          description?: string | null
          is_public?: boolean | null
          user_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          image?: string | null
          description?: string | null
          is_public?: boolean | null
          user_id?: string | null
          created_at?: string | null
        }
      }
      profile: {
        Row: {
          id: string
          created_at: string | null
          email: string | null
          avatar: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          email?: string | null
          avatar?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          email?: string | null
          avatar?: string | null
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_post: {
        Args: {
          image_input: string
          description_input: string
          is_public_input: boolean
          user_id_input: string
        }
        Returns: unknown
      }
      insert_api_call: {
        Args: { api_name_input: string; called_by_input: string }
        Returns: unknown
      }
      insert_profile: {
        Args: { email: string; user_id: string }
        Returns: unknown
      }
      select_all_profile: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      select_api_call: {
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
      select_post: {
        Args: { user_id_input: string }
        Returns: unknown
      }
      select_post_keyword: {
        Args: { keyword_input: string }
        Returns: unknown
      }
      select_profile: {
        Args: { input_user_id: string }
        Returns: unknown
      }
      select_public_post: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
