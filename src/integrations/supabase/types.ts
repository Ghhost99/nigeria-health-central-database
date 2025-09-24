export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      api_endpoints: {
        Row: {
          created_at: string | null
          description: string | null
          endpoint_id: number
          http_method: string
          related_table: string | null
          route: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          endpoint_id?: number
          http_method: string
          related_table?: string | null
          route: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          endpoint_id?: number
          http_method?: string
          related_table?: string | null
          route?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_id: number
          created_at: string | null
          doctor_id: number
          institution_id: number
          patient_id: number
          reason: string | null
          scheduled_at: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_id?: number
          created_at?: string | null
          doctor_id: number
          institution_id: number
          patient_id: number
          reason?: string | null
          scheduled_at: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_id?: number
          created_at?: string | null
          doctor_id?: number
          institution_id?: number
          patient_id?: number
          reason?: string | null
          scheduled_at?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "appointments_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["institution_id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      doctors: {
        Row: {
          contact: string | null
          created_at: string | null
          doctor_id: number
          institution_id: number
          name: string
          specialty: string | null
          staff_number: string
        }
        Insert: {
          contact?: string | null
          created_at?: string | null
          doctor_id?: number
          institution_id: number
          name: string
          specialty?: string | null
          staff_number: string
        }
        Update: {
          contact?: string | null
          created_at?: string | null
          doctor_id?: number
          institution_id?: number
          name?: string
          specialty?: string | null
          staff_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctors_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["institution_id"]
          },
        ]
      }
      government_users: {
        Row: {
          access_expiry: string | null
          access_level: string | null
          contact_person_name: string
          created_at: string | null
          department: string | null
          employee_id: string
          gov_user_id: number
          government_id: string
          job_title: string
          official_email: string
          organization_name: string
          organization_type: string
          updated_at: string | null
        }
        Insert: {
          access_expiry?: string | null
          access_level?: string | null
          contact_person_name: string
          created_at?: string | null
          department?: string | null
          employee_id: string
          gov_user_id?: number
          government_id: string
          job_title: string
          official_email: string
          organization_name: string
          organization_type: string
          updated_at?: string | null
        }
        Update: {
          access_expiry?: string | null
          access_level?: string | null
          contact_person_name?: string
          created_at?: string | null
          department?: string | null
          employee_id?: string
          gov_user_id?: number
          government_id?: string
          job_title?: string
          official_email?: string
          organization_name?: string
          organization_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      imaging: {
        Row: {
          appointment_id: number | null
          created_at: string | null
          image_id: number
          image_path: string
          image_type: string
          notes: string | null
          patient_id: number
          taken_at: string
        }
        Insert: {
          appointment_id?: number | null
          created_at?: string | null
          image_id?: number
          image_path: string
          image_type: string
          notes?: string | null
          patient_id: number
          taken_at: string
        }
        Update: {
          appointment_id?: number | null
          created_at?: string | null
          image_id?: number
          image_path?: string
          image_type?: string
          notes?: string | null
          patient_id?: number
          taken_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "imaging_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "imaging_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      institution_messages: {
        Row: {
          attachments: string[] | null
          created_at: string | null
          message_content: string
          message_id: number
          read_at: string | null
          receiver_institution_id: number | null
          sender_institution_id: number | null
          sent_at: string | null
          subject: string
        }
        Insert: {
          attachments?: string[] | null
          created_at?: string | null
          message_content: string
          message_id?: number
          read_at?: string | null
          receiver_institution_id?: number | null
          sender_institution_id?: number | null
          sent_at?: string | null
          subject: string
        }
        Update: {
          attachments?: string[] | null
          created_at?: string | null
          message_content?: string
          message_id?: number
          read_at?: string | null
          receiver_institution_id?: number | null
          sender_institution_id?: number | null
          sent_at?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_messages_receiver_institution_id_fkey"
            columns: ["receiver_institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["institution_id"]
          },
          {
            foreignKeyName: "institution_messages_sender_institution_id_fkey"
            columns: ["sender_institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["institution_id"]
          },
        ]
      }
      institutions: {
        Row: {
          address: string
          bed_capacity: number | null
          cac_number: string | null
          contact: string | null
          created_at: string | null
          email: string | null
          institution_code: string | null
          institution_id: number
          license_expiry: string | null
          license_number: string | null
          name: string
          password_hash: string | null
          services_offered: string[] | null
          status: string | null
          type: string
        }
        Insert: {
          address: string
          bed_capacity?: number | null
          cac_number?: string | null
          contact?: string | null
          created_at?: string | null
          email?: string | null
          institution_code?: string | null
          institution_id?: number
          license_expiry?: string | null
          license_number?: string | null
          name: string
          password_hash?: string | null
          services_offered?: string[] | null
          status?: string | null
          type: string
        }
        Update: {
          address?: string
          bed_capacity?: number | null
          cac_number?: string | null
          contact?: string | null
          created_at?: string | null
          email?: string | null
          institution_code?: string | null
          institution_id?: number
          license_expiry?: string | null
          license_number?: string | null
          name?: string
          password_hash?: string | null
          services_offered?: string[] | null
          status?: string | null
          type?: string
        }
        Relationships: []
      }
      lab_results: {
        Row: {
          appointment_id: number | null
          created_at: string | null
          image_link: string | null
          lab_id: number
          patient_id: number
          result_value: string | null
          test_code: string | null
          test_date: string
          test_name: string
          units: string | null
        }
        Insert: {
          appointment_id?: number | null
          created_at?: string | null
          image_link?: string | null
          lab_id?: number
          patient_id: number
          result_value?: string | null
          test_code?: string | null
          test_date: string
          test_name: string
          units?: string | null
        }
        Update: {
          appointment_id?: number | null
          created_at?: string | null
          image_link?: string | null
          lab_id?: number
          patient_id?: number
          result_value?: string | null
          test_code?: string | null
          test_date?: string
          test_name?: string
          units?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_results_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "lab_results_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          birth_date: string
          created_at: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          first_name: string
          has_allergy: boolean | null
          last_name: string
          nin: string | null
          patient_id: number
          phone: string | null
          primary_allergy: string | null
          sex: string
          uhid: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          birth_date: string
          created_at?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          first_name: string
          has_allergy?: boolean | null
          last_name: string
          nin?: string | null
          patient_id?: number
          phone?: string | null
          primary_allergy?: string | null
          sex: string
          uhid?: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          birth_date?: string
          created_at?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          first_name?: string
          has_allergy?: boolean | null
          last_name?: string
          nin?: string | null
          patient_id?: number
          phone?: string | null
          primary_allergy?: string | null
          sex?: string
          uhid?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      prescriptions: {
        Row: {
          appointment_id: number
          created_at: string | null
          dose: string
          end_date: string | null
          frequency: string
          instructions: string | null
          medicine_name: string
          patient_id: number
          rx_id: number
          start_date: string
        }
        Insert: {
          appointment_id: number
          created_at?: string | null
          dose: string
          end_date?: string | null
          frequency: string
          instructions?: string | null
          medicine_name: string
          patient_id: number
          rx_id?: number
          start_date: string
        }
        Update: {
          appointment_id?: number
          created_at?: string | null
          dose?: string
          end_date?: string | null
          frequency?: string
          instructions?: string | null
          medicine_name?: string
          patient_id?: number
          rx_id?: number
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          government_user_id: number | null
          id: string
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          government_user_id?: number | null
          id: string
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          government_user_id?: number | null
          id?: string
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_government_user_id_fkey"
            columns: ["government_user_id"]
            isOneToOne: false
            referencedRelation: "government_users"
            referencedColumns: ["gov_user_id"]
          },
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          role_id: number
          role_name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          role_id?: number
          role_name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          role_id?: number
          role_name?: string
        }
        Relationships: []
      }
      staff: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string
          institution_id: number | null
          last_name: string
          license_number: string | null
          phone: string | null
          profession: string
          specialty: string | null
          staff_code: string
          staff_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name: string
          institution_id?: number | null
          last_name: string
          license_number?: string | null
          phone?: string | null
          profession: string
          specialty?: string | null
          staff_code: string
          staff_id?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string
          institution_id?: number | null
          last_name?: string
          license_number?: string | null
          phone?: string | null
          profession?: string
          specialty?: string | null
          staff_code?: string
          staff_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["institution_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          doctor_id: number | null
          institution_id: number | null
          last_login: string | null
          password_hash: string
          patient_id: number | null
          role_id: number
          user_id: number
          username: string
        }
        Insert: {
          created_at?: string | null
          doctor_id?: number | null
          institution_id?: number | null
          last_login?: string | null
          password_hash: string
          patient_id?: number | null
          role_id: number
          user_id?: number
          username: string
        }
        Update: {
          created_at?: string | null
          doctor_id?: number | null
          institution_id?: number | null
          last_login?: string | null
          password_hash?: string
          patient_id?: number | null
          role_id?: number
          user_id?: number
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "users_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["institution_id"]
          },
          {
            foreignKeyName: "users_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "users_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_uhid: {
        Args: { patient_nin?: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
