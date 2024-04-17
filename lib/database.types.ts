export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Business: {
        Row: {
          address: string | null
          application_id: number | null
          business_id: number
          created_at: string
          description: string | null
          email: string
          name: string | null
          owner_id: string
          phone: string | null
          public_id: string | null
        }
        Insert: {
          address?: string | null
          application_id?: number | null
          business_id?: number
          created_at?: string
          description?: string | null
          email: string
          name?: string | null
          owner_id: string
          phone?: string | null
          public_id?: string | null
        }
        Update: {
          address?: string | null
          application_id?: number | null
          business_id?: number
          created_at?: string
          description?: string | null
          email?: string
          name?: string | null
          owner_id?: string
          phone?: string | null
          public_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Business_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "BusinessApplication"
            referencedColumns: ["application_id"]
          },
          {
            foreignKeyName: "public_Business_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "BusinessAdminUser"
            referencedColumns: ["user_id"]
          }
        ]
      }
      BusinessAdminUser: {
        Row: {
          application_id: number
          business_id: number | null
          created_at: string
          email: string
          first_name: string
          last_name: string
          phone_number: string | null
          user_id: string
        }
        Insert: {
          application_id: number
          business_id?: number | null
          created_at?: string
          email: string
          first_name: string
          last_name: string
          phone_number?: string | null
          user_id: string
        }
        Update: {
          application_id?: number
          business_id?: number | null
          created_at?: string
          email?: string
          first_name?: string
          last_name?: string
          phone_number?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_BusinessAdmin_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "public_BusinessAdmin_phone_number_fkey"
            columns: ["phone_number"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["phone"]
          },
          {
            foreignKeyName: "public_BusinessAdminUser_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "BusinessApplication"
            referencedColumns: ["application_id"]
          },
          {
            foreignKeyName: "public_BusinessAdminUser_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      BusinessApplication: {
        Row: {
          address: string
          admin_id: string | null
          application_id: number
          created_at: string
          email: string
          name: string
          phone: string
          url_token: string | null
        }
        Insert: {
          address: string
          admin_id?: string | null
          application_id?: number
          created_at?: string
          email: string
          name: string
          phone: string
          url_token?: string | null
        }
        Update: {
          address?: string
          admin_id?: string | null
          application_id?: number
          created_at?: string
          email?: string
          name?: string
          phone?: string
          url_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_BusinessApplication_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "BusinessAdminUser"
            referencedColumns: ["user_id"]
          }
        ]
      }
      BusinessSchedule: {
        Row: {
          business_id: number | null
          business_owner: string | null
          created_at: string
          day: number | null
          end_time: string | null
          schedule_id: number
          start_time: string | null
        }
        Insert: {
          business_id?: number | null
          business_owner?: string | null
          created_at?: string
          day?: number | null
          end_time?: string | null
          schedule_id?: number
          start_time?: string | null
        }
        Update: {
          business_id?: number | null
          business_owner?: string | null
          created_at?: string
          day?: number | null
          end_time?: string | null
          schedule_id?: number
          start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_BusinessSchedule_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "public_BusinessSchedule_business_owner_fkey"
            columns: ["business_owner"]
            isOneToOne: false
            referencedRelation: "BusinessAdminUser"
            referencedColumns: ["user_id"]
          }
        ]
      }
      BusinessSpecificServices: {
        Row: {
          business_id: number | null
          business_owner: string | null
          created_at: string
          duration: number | null
          name: string | null
          price: number | null
          public: boolean
          service_id: number
        }
        Insert: {
          business_id?: number | null
          business_owner?: string | null
          created_at?: string
          duration?: number | null
          name?: string | null
          price?: number | null
          public?: boolean
          service_id?: number
        }
        Update: {
          business_id?: number | null
          business_owner?: string | null
          created_at?: string
          duration?: number | null
          name?: string | null
          price?: number | null
          public?: boolean
          service_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "BusinessSpecificServices_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "public_BusinessSpecificServices_business_owner_fkey"
            columns: ["business_owner"]
            isOneToOne: false
            referencedRelation: "BusinessAdminUser"
            referencedColumns: ["user_id"]
          }
        ]
      }
      Employee: {
        Row: {
          business_id: number | null
          business_owner: string | null
          created_at: string
          email: string | null
          employee_id: number
          first_name: string
          last_name: string | null
        }
        Insert: {
          business_id?: number | null
          business_owner?: string | null
          created_at?: string
          email?: string | null
          employee_id?: number
          first_name: string
          last_name?: string | null
        }
        Update: {
          business_id?: number | null
          business_owner?: string | null
          created_at?: string
          email?: string | null
          employee_id?: number
          first_name?: string
          last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Employee_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["business_id"]
          }
        ]
      }
      EmployeeServices: {
        Row: {
          business_id: number
          business_owner: string
          created_at: string
          employee_id: number
          id: number
          service_id: number
        }
        Insert: {
          business_id: number
          business_owner: string
          created_at?: string
          employee_id: number
          id?: number
          service_id: number
        }
        Update: {
          business_id?: number
          business_owner?: string
          created_at?: string
          employee_id?: number
          id?: number
          service_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "EmployeeServices_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "Employee"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "public_EmployeeServices_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "public_EmployeeServices_business_owner_fkey"
            columns: ["business_owner"]
            isOneToOne: false
            referencedRelation: "BusinessAdminUser"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_EmployeeServices_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "BusinessSpecificServices"
            referencedColumns: ["service_id"]
          }
        ]
      }
      Services: {
        Row: {
          created_at: string
          label: string
          name: string
          service_id: number
        }
        Insert: {
          created_at?: string
          label: string
          name: string
          service_id?: number
        }
        Update: {
          created_at?: string
          label?: string
          name?: string
          service_id?: number
        }
        Relationships: []
      }
      User: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          last_name: string | null
          phone_number: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          phone_number?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          phone_number?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_User_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "User_phone_number_fkey"
            columns: ["phone_number"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["phone"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_email_by_token: {
        Args: {
          token: string
        }
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
