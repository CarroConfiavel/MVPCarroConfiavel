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
      anuncio_denuncias: {
        Row: {
          anuncio_id: string
          created_at: string
          denunciante_id: string | null
          descricao: string
          id: string
          motivo: Database["public"]["Enums"]["denuncia_motivo_enum"]
          respondido_em: string | null
          respondido_por: string | null
          resposta: string | null
          status: Database["public"]["Enums"]["denuncia_status_enum"]
          updated_at: string | null
        }
        Insert: {
          anuncio_id: string
          created_at?: string
          denunciante_id?: string | null
          descricao: string
          id?: string
          motivo: Database["public"]["Enums"]["denuncia_motivo_enum"]
          respondido_em?: string | null
          respondido_por?: string | null
          resposta?: string | null
          status?: Database["public"]["Enums"]["denuncia_status_enum"]
          updated_at?: string | null
        }
        Update: {
          anuncio_id?: string
          created_at?: string
          denunciante_id?: string | null
          descricao?: string
          id?: string
          motivo?: Database["public"]["Enums"]["denuncia_motivo_enum"]
          respondido_em?: string | null
          respondido_por?: string | null
          resposta?: string | null
          status?: Database["public"]["Enums"]["denuncia_status_enum"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "denuncias_anuncio_id_fkey"
            columns: ["anuncio_id"]
            isOneToOne: false
            referencedRelation: "anuncios"
            referencedColumns: ["id"]
          },
        ]
      }
      anuncios: {
        Row: {
          aceita_troca: boolean | null
          ano_fabricacao: number
          ano_modelo: number
          boost_expira_em: string | null
          boost_level: Database["public"]["Enums"]["boost_level"] | null
          caracteristicas: Json | null
          cep: string | null
          cidade: string | null
          condicao: Database["public"]["Enums"]["condicao_veiculo"]
          cor: string | null
          created_at: string
          descricao: string | null
          destaque: boolean | null
          estado: string | null
          favoritos: number | null
          fotos: Json | null
          id: string
          ipva_pago: boolean | null
          licenciado: boolean | null
          marca_id: string
          modelo_id: string
          opcionais: Json | null
          placa: string | null
          preco: number
          publicado_em: string | null
          quilometragem: number
          status: Database["public"]["Enums"]["anuncio_status"]
          titulo: string
          unico_dono: boolean | null
          updated_at: string | null
          user_id: string
          vendido_em: string | null
          versao_id: string | null
          visualizacoes: number | null
        }
        Insert: {
          aceita_troca?: boolean | null
          ano_fabricacao: number
          ano_modelo: number
          boost_expira_em?: string | null
          boost_level?: Database["public"]["Enums"]["boost_level"] | null
          caracteristicas?: Json | null
          cep?: string | null
          cidade?: string | null
          condicao?: Database["public"]["Enums"]["condicao_veiculo"]
          cor?: string | null
          created_at?: string
          descricao?: string | null
          destaque?: boolean | null
          estado?: string | null
          favoritos?: number | null
          fotos?: Json | null
          id?: string
          ipva_pago?: boolean | null
          licenciado?: boolean | null
          marca_id: string
          modelo_id: string
          opcionais?: Json | null
          placa?: string | null
          preco: number
          publicado_em?: string | null
          quilometragem: number
          status?: Database["public"]["Enums"]["anuncio_status"]
          titulo: string
          unico_dono?: boolean | null
          updated_at?: string | null
          user_id: string
          vendido_em?: string | null
          versao_id?: string | null
          visualizacoes?: number | null
        }
        Update: {
          aceita_troca?: boolean | null
          ano_fabricacao?: number
          ano_modelo?: number
          boost_expira_em?: string | null
          boost_level?: Database["public"]["Enums"]["boost_level"] | null
          caracteristicas?: Json | null
          cep?: string | null
          cidade?: string | null
          condicao?: Database["public"]["Enums"]["condicao_veiculo"]
          cor?: string | null
          created_at?: string
          descricao?: string | null
          destaque?: boolean | null
          estado?: string | null
          favoritos?: number | null
          fotos?: Json | null
          id?: string
          ipva_pago?: boolean | null
          licenciado?: boolean | null
          marca_id?: string
          modelo_id?: string
          opcionais?: Json | null
          placa?: string | null
          preco?: number
          publicado_em?: string | null
          quilometragem?: number
          status?: Database["public"]["Enums"]["anuncio_status"]
          titulo?: string
          unico_dono?: boolean | null
          updated_at?: string | null
          user_id?: string
          vendido_em?: string | null
          versao_id?: string | null
          visualizacoes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "anuncios_marca_id_fkey"
            columns: ["marca_id"]
            isOneToOne: false
            referencedRelation: "marcas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anuncios_modelo_id_fkey"
            columns: ["modelo_id"]
            isOneToOne: false
            referencedRelation: "modelos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anuncios_versao_id_fkey"
            columns: ["versao_id"]
            isOneToOne: false
            referencedRelation: "versoes"
            referencedColumns: ["id"]
          },
        ]
      }
      avaliacoes: {
        Row: {
          anuncio_id: string
          avaliado_id: string
          avaliador_id: string
          comentario: string | null
          created_at: string
          id: string
          nota: number
        }
        Insert: {
          anuncio_id: string
          avaliado_id: string
          avaliador_id: string
          comentario?: string | null
          created_at?: string
          id?: string
          nota: number
        }
        Update: {
          anuncio_id?: string
          avaliado_id?: string
          avaliador_id?: string
          comentario?: string | null
          created_at?: string
          id?: string
          nota?: number
        }
        Relationships: [
          {
            foreignKeyName: "avaliacoes_anuncio_id_fkey"
            columns: ["anuncio_id"]
            isOneToOne: false
            referencedRelation: "anuncios"
            referencedColumns: ["id"]
          },
        ]
      }
      boost_historico: {
        Row: {
          anuncio_id: string
          ativo: boolean | null
          boost_level: Database["public"]["Enums"]["boost_level"]
          created_at: string
          fim: string
          id: string
          inicio: string
          user_id: string
          valor_pago: number
        }
        Insert: {
          anuncio_id: string
          ativo?: boolean | null
          boost_level: Database["public"]["Enums"]["boost_level"]
          created_at?: string
          fim: string
          id?: string
          inicio?: string
          user_id: string
          valor_pago: number
        }
        Update: {
          anuncio_id?: string
          ativo?: boolean | null
          boost_level?: Database["public"]["Enums"]["boost_level"]
          created_at?: string
          fim?: string
          id?: string
          inicio?: string
          user_id?: string
          valor_pago?: number
        }
        Relationships: [
          {
            foreignKeyName: "boost_historico_anuncio_id_fkey"
            columns: ["anuncio_id"]
            isOneToOne: false
            referencedRelation: "anuncios"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas_laudo: {
        Row: {
          ativo: boolean | null
          certificacoes: Json | null
          cidade: string | null
          cnpj: string
          created_at: string
          email: string | null
          endereco: string | null
          estado: string | null
          id: string
          nome: string
          razao_social: string
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          certificacoes?: Json | null
          cidade?: string | null
          cnpj: string
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          nome: string
          razao_social: string
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          certificacoes?: Json | null
          cidade?: string | null
          cnpj?: string
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          nome?: string
          razao_social?: string
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      favoritos: {
        Row: {
          anuncio_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          anuncio_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          anuncio_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favoritos_anuncio_id_fkey"
            columns: ["anuncio_id"]
            isOneToOne: false
            referencedRelation: "anuncios"
            referencedColumns: ["id"]
          },
        ]
      }
      laudos_cautelares: {
        Row: {
          anuncio_id: string
          created_at: string
          data_inspecao: string
          documento_url: string | null
          empresa_laudo_id: string
          fotos_laudo: Json | null
          id: string
          itens_verificados: Json | null
          nota_geral: number | null
          numero_laudo: string
          observacoes: string | null
          problemas_encontrados: Json | null
          status: Database["public"]["Enums"]["laudo_status_enum"]
          updated_at: string | null
          validade: string
        }
        Insert: {
          anuncio_id: string
          created_at?: string
          data_inspecao: string
          documento_url?: string | null
          empresa_laudo_id: string
          fotos_laudo?: Json | null
          id?: string
          itens_verificados?: Json | null
          nota_geral?: number | null
          numero_laudo: string
          observacoes?: string | null
          problemas_encontrados?: Json | null
          status?: Database["public"]["Enums"]["laudo_status_enum"]
          updated_at?: string | null
          validade: string
        }
        Update: {
          anuncio_id?: string
          created_at?: string
          data_inspecao?: string
          documento_url?: string | null
          empresa_laudo_id?: string
          fotos_laudo?: Json | null
          id?: string
          itens_verificados?: Json | null
          nota_geral?: number | null
          numero_laudo?: string
          observacoes?: string | null
          problemas_encontrados?: Json | null
          status?: Database["public"]["Enums"]["laudo_status_enum"]
          updated_at?: string | null
          validade?: string
        }
        Relationships: [
          {
            foreignKeyName: "laudos_cautelares_anuncio_id_fkey"
            columns: ["anuncio_id"]
            isOneToOne: false
            referencedRelation: "anuncios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "laudos_cautelares_empresa_laudo_id_fkey"
            columns: ["empresa_laudo_id"]
            isOneToOne: false
            referencedRelation: "empresas_laudo"
            referencedColumns: ["id"]
          },
        ]
      }
      lojas: {
        Row: {
          ativo: boolean | null
          cep: string | null
          cidade: string | null
          cnpj: string
          created_at: string
          descricao: string | null
          email: string | null
          endereco: string | null
          estado: string | null
          horario_funcionamento: Json | null
          id: string
          logo_url: string | null
          nome: string
          razao_social: string
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cep?: string | null
          cidade?: string | null
          cnpj: string
          created_at?: string
          descricao?: string | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          horario_funcionamento?: Json | null
          id?: string
          logo_url?: string | null
          nome: string
          razao_social: string
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string
          created_at?: string
          descricao?: string | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          horario_funcionamento?: Json | null
          id?: string
          logo_url?: string | null
          nome?: string
          razao_social?: string
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      marcas: {
        Row: {
          ativo: boolean | null
          created_at: string
          id: string
          logo_url: string | null
          nome: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string
          id?: string
          logo_url?: string | null
          nome: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string
          id?: string
          logo_url?: string | null
          nome?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mensagens: {
        Row: {
          anuncio_id: string
          created_at: string
          destinatario_id: string
          id: string
          lida: boolean | null
          lida_em: string | null
          mensagem: string
          remetente_id: string
        }
        Insert: {
          anuncio_id: string
          created_at?: string
          destinatario_id: string
          id?: string
          lida?: boolean | null
          lida_em?: string | null
          mensagem: string
          remetente_id: string
        }
        Update: {
          anuncio_id?: string
          created_at?: string
          destinatario_id?: string
          id?: string
          lida?: boolean | null
          lida_em?: string | null
          mensagem?: string
          remetente_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mensagens_anuncio_id_fkey"
            columns: ["anuncio_id"]
            isOneToOne: false
            referencedRelation: "anuncios"
            referencedColumns: ["id"]
          },
        ]
      }
      modelos: {
        Row: {
          ativo: boolean | null
          categoria: string | null
          created_at: string
          id: string
          marca_id: string
          nome: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          categoria?: string | null
          created_at?: string
          id?: string
          marca_id: string
          nome: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          categoria?: string | null
          created_at?: string
          id?: string
          marca_id?: string
          nome?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "modelos_marca_id_fkey"
            columns: ["marca_id"]
            isOneToOne: false
            referencedRelation: "marcas"
            referencedColumns: ["id"]
          },
        ]
      }
      problemas_laudo: {
        Row: {
          categoria: string
          created_at: string
          custo_estimado: number | null
          descricao: string
          fotos: Json | null
          gravidade: Database["public"]["Enums"]["gravidade_enum"]
          id: string
          laudo_id: string
        }
        Insert: {
          categoria: string
          created_at?: string
          custo_estimado?: number | null
          descricao: string
          fotos?: Json | null
          gravidade: Database["public"]["Enums"]["gravidade_enum"]
          id?: string
          laudo_id: string
        }
        Update: {
          categoria?: string
          created_at?: string
          custo_estimado?: number | null
          descricao?: string
          fotos?: Json | null
          gravidade?: Database["public"]["Enums"]["gravidade_enum"]
          id?: string
          laudo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "problemas_laudo_laudo_id_fkey"
            columns: ["laudo_id"]
            isOneToOne: false
            referencedRelation: "laudos_cautelares"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number | null
          cancel_at_period_end: boolean | null
          canceled_at: number | null
          created_at: string
          currency: string | null
          current_period_end: number | null
          current_period_start: number | null
          custom_field_data: Json | null
          customer_cancellation_comment: string | null
          customer_cancellation_reason: string | null
          customer_id: string | null
          ended_at: number | null
          ends_at: number | null
          id: string
          interval: string | null
          metadata: Json | null
          price_id: string | null
          started_at: number | null
          status: string | null
          stripe_id: string | null
          stripe_price_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          cancel_at_period_end?: boolean | null
          canceled_at?: number | null
          created_at?: string
          currency?: string | null
          current_period_end?: number | null
          current_period_start?: number | null
          custom_field_data?: Json | null
          customer_cancellation_comment?: string | null
          customer_cancellation_reason?: string | null
          customer_id?: string | null
          ended_at?: number | null
          ends_at?: number | null
          id?: string
          interval?: string | null
          metadata?: Json | null
          price_id?: string | null
          started_at?: number | null
          status?: string | null
          stripe_id?: string | null
          stripe_price_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          cancel_at_period_end?: boolean | null
          canceled_at?: number | null
          created_at?: string
          currency?: string | null
          current_period_end?: number | null
          current_period_start?: number | null
          custom_field_data?: Json | null
          customer_cancellation_comment?: string | null
          customer_cancellation_reason?: string | null
          customer_id?: string | null
          ended_at?: number | null
          ends_at?: number | null
          id?: string
          interval?: string | null
          metadata?: Json | null
          price_id?: string | null
          started_at?: number | null
          status?: string | null
          stripe_id?: string | null
          stripe_price_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["user_id"]
          },
        ]
      }
      usuarios: {
        Row: {
          avatar_url: string | null
          cep: string | null
          cidade: string | null
          cpf: string | null
          created_at: string
          credits: string | null
          data_nascimento: string | null
          email: string | null
          endereco: string | null
          estado: string | null
          full_name: string | null
          id: string
          image: string | null
          loja_id: string | null
          name: string | null
          nome_completo: string | null
          subscription: string | null
          telefone: string | null
          tipo_usuario: string | null
          token_identifier: string
          updated_at: string | null
          user_id: string | null
          verificado: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          cep?: string | null
          cidade?: string | null
          cpf?: string | null
          created_at?: string
          credits?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          full_name?: string | null
          id: string
          image?: string | null
          loja_id?: string | null
          name?: string | null
          nome_completo?: string | null
          subscription?: string | null
          telefone?: string | null
          tipo_usuario?: string | null
          token_identifier: string
          updated_at?: string | null
          user_id?: string | null
          verificado?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          cep?: string | null
          cidade?: string | null
          cpf?: string | null
          created_at?: string
          credits?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          full_name?: string | null
          id?: string
          image?: string | null
          loja_id?: string | null
          name?: string | null
          nome_completo?: string | null
          subscription?: string | null
          telefone?: string | null
          tipo_usuario?: string | null
          token_identifier?: string
          updated_at?: string | null
          user_id?: string | null
          verificado?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "users_loja_id_fkey"
            columns: ["loja_id"]
            isOneToOne: false
            referencedRelation: "lojas"
            referencedColumns: ["id"]
          },
        ]
      }
      versoes: {
        Row: {
          ano_fim: number | null
          ano_inicio: number | null
          ativo: boolean | null
          combustivel: string | null
          created_at: string
          id: string
          modelo_id: string
          motor: string | null
          nome: string
          portas: number | null
          transmissao: string | null
          updated_at: string | null
        }
        Insert: {
          ano_fim?: number | null
          ano_inicio?: number | null
          ativo?: boolean | null
          combustivel?: string | null
          created_at?: string
          id?: string
          modelo_id: string
          motor?: string | null
          nome: string
          portas?: number | null
          transmissao?: string | null
          updated_at?: string | null
        }
        Update: {
          ano_fim?: number | null
          ano_inicio?: number | null
          ativo?: boolean | null
          combustivel?: string | null
          created_at?: string
          id?: string
          modelo_id?: string
          motor?: string | null
          nome?: string
          portas?: number | null
          transmissao?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "versoes_modelo_id_fkey"
            columns: ["modelo_id"]
            isOneToOne: false
            referencedRelation: "modelos"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_events: {
        Row: {
          created_at: string
          data: Json | null
          event_type: string
          id: string
          modified_at: string
          stripe_event_id: string | null
          type: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          event_type: string
          id?: string
          modified_at?: string
          stripe_event_id?: string | null
          type: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          event_type?: string
          id?: string
          modified_at?: string
          stripe_event_id?: string | null
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      anuncio_status: "rascunho" | "ativo" | "vendido" | "inativo" | "removido"
      boost_level: "bronze" | "prata" | "ouro" | "platina"
      condicao_veiculo: "novo" | "seminovo" | "usado"
      denuncia_motivo_enum:
        | "informacao_falsa"
        | "preco_abusivo"
        | "veiculo_irregular"
        | "fraude"
        | "outro"
      denuncia_status_enum:
        | "pendente"
        | "em_analise"
        | "procedente"
        | "improcedente"
        | "resolvida"
      gravidade_enum: "leve" | "moderada" | "grave" | "critica"
      laudo_status_enum:
        | "pendente"
        | "em_analise"
        | "aprovado"
        | "reprovado"
        | "expirado"
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
    Enums: {
      anuncio_status: ["rascunho", "ativo", "vendido", "inativo", "removido"],
      boost_level: ["bronze", "prata", "ouro", "platina"],
      condicao_veiculo: ["novo", "seminovo", "usado"],
      denuncia_motivo_enum: [
        "informacao_falsa",
        "preco_abusivo",
        "veiculo_irregular",
        "fraude",
        "outro",
      ],
      denuncia_status_enum: [
        "pendente",
        "em_analise",
        "procedente",
        "improcedente",
        "resolvida",
      ],
      gravidade_enum: ["leve", "moderada", "grave", "critica"],
      laudo_status_enum: [
        "pendente",
        "em_analise",
        "aprovado",
        "reprovado",
        "expirado",
      ],
    },
  },
} as const
