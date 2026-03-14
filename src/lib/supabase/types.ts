// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.1'
  }
  public: {
    Tables: {
      agents: {
        Row: {
          cidade_uf: string | null
          cpf_agente: string | null
          created_at: string | null
          email: string | null
          endereco_completo: string | null
          id: string
          nome_agente: string
          telefone: string | null
          user_id: string | null
        }
        Insert: {
          cidade_uf?: string | null
          cpf_agente?: string | null
          created_at?: string | null
          email?: string | null
          endereco_completo?: string | null
          id?: string
          nome_agente: string
          telefone?: string | null
          user_id?: string | null
        }
        Update: {
          cidade_uf?: string | null
          cpf_agente?: string | null
          created_at?: string | null
          email?: string | null
          endereco_completo?: string | null
          id?: string
          nome_agente?: string
          telefone?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      bank_accounts: {
        Row: {
          account_number: string | null
          active: boolean | null
          agency: string | null
          bank_number: string | null
          bank_type: string | null
          created_at: string | null
          id: string
          owner_document: string | null
        }
        Insert: {
          account_number?: string | null
          active?: boolean | null
          agency?: string | null
          bank_number?: string | null
          bank_type?: string | null
          created_at?: string | null
          id?: string
          owner_document?: string | null
        }
        Update: {
          account_number?: string | null
          active?: boolean | null
          agency?: string | null
          bank_number?: string | null
          bank_type?: string | null
          created_at?: string | null
          id?: string
          owner_document?: string | null
        }
        Relationships: []
      }
      certificates: {
        Row: {
          certificado_tipo: string | null
          cidade_uf: string | null
          client_name_rs: string
          cnpj: string | null
          contato_principal: string | null
          cpf_agente: string | null
          created_at: string | null
          data_emissao: string | null
          data_expiracao: string
          data_oportunidade: string | null
          data_validacao: string | null
          documento: string | null
          email: string | null
          id: string
          nome_agente: string | null
          parceiro: string | null
          pedido_ticket: string | null
          razao_social: string | null
          status_renovacao: string | null
          telefone_1: string | null
          telefone_2: string | null
          user_id: string | null
          valor_oportunidade: number | null
          vendedor_indicacao: string | null
        }
        Insert: {
          certificado_tipo?: string | null
          cidade_uf?: string | null
          client_name_rs: string
          cnpj?: string | null
          contato_principal?: string | null
          cpf_agente?: string | null
          created_at?: string | null
          data_emissao?: string | null
          data_expiracao: string
          data_oportunidade?: string | null
          data_validacao?: string | null
          documento?: string | null
          email?: string | null
          id?: string
          nome_agente?: string | null
          parceiro?: string | null
          pedido_ticket?: string | null
          razao_social?: string | null
          status_renovacao?: string | null
          telefone_1?: string | null
          telefone_2?: string | null
          user_id?: string | null
          valor_oportunidade?: number | null
          vendedor_indicacao?: string | null
        }
        Update: {
          certificado_tipo?: string | null
          cidade_uf?: string | null
          client_name_rs?: string
          cnpj?: string | null
          contato_principal?: string | null
          cpf_agente?: string | null
          created_at?: string | null
          data_emissao?: string | null
          data_expiracao?: string
          data_oportunidade?: string | null
          data_validacao?: string | null
          documento?: string | null
          email?: string | null
          id?: string
          nome_agente?: string | null
          parceiro?: string | null
          pedido_ticket?: string | null
          razao_social?: string | null
          status_renovacao?: string | null
          telefone_1?: string | null
          telefone_2?: string | null
          user_id?: string | null
          valor_oportunidade?: number | null
          vendedor_indicacao?: string | null
        }
        Relationships: []
      }
      clientes: {
        Row: {
          cidade: string | null
          data_cadastro: string | null
          documento: string | null
          email: string | null
          endereco: string | null
          id: string
          nome: string
          origem: string | null
          razao_social: string | null
          status: string | null
          telefone: string | null
          uf: string | null
        }
        Insert: {
          cidade?: string | null
          data_cadastro?: string | null
          documento?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome: string
          origem?: string | null
          razao_social?: string | null
          status?: string | null
          telefone?: string | null
          uf?: string | null
        }
        Update: {
          cidade?: string | null
          data_cadastro?: string | null
          documento?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          origem?: string | null
          razao_social?: string | null
          status?: string | null
          telefone?: string | null
          uf?: string | null
        }
        Relationships: []
      }
      comissoes: {
        Row: {
          agente_id: string | null
          data_calculo: string | null
          data_pagamento: string | null
          id: string
          imposto_retido: number | null
          observacoes: string | null
          pedido_id: string | null
          percentual_comissao: number | null
          status: string | null
          valor_comissao_bruto: number | null
          valor_comissao_liquido: number | null
          valor_venda: number | null
          vendedor_id: string | null
        }
        Insert: {
          agente_id?: string | null
          data_calculo?: string | null
          data_pagamento?: string | null
          id?: string
          imposto_retido?: number | null
          observacoes?: string | null
          pedido_id?: string | null
          percentual_comissao?: number | null
          status?: string | null
          valor_comissao_bruto?: number | null
          valor_comissao_liquido?: number | null
          valor_venda?: number | null
          vendedor_id?: string | null
        }
        Update: {
          agente_id?: string | null
          data_calculo?: string | null
          data_pagamento?: string | null
          id?: string
          imposto_retido?: number | null
          observacoes?: string | null
          pedido_id?: string | null
          percentual_comissao?: number | null
          status?: string | null
          valor_comissao_bruto?: number | null
          valor_comissao_liquido?: number | null
          valor_venda?: number | null
          vendedor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'comissoes_agente_id_fkey'
            columns: ['agente_id']
            isOneToOne: false
            referencedRelation: 'usuarios'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'comissoes_pedido_id_fkey'
            columns: ['pedido_id']
            isOneToOne: false
            referencedRelation: 'pedidos'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'comissoes_vendedor_id_fkey'
            columns: ['vendedor_id']
            isOneToOne: false
            referencedRelation: 'usuarios'
            referencedColumns: ['id']
          },
        ]
      }
      conversas_whatsapp: {
        Row: {
          cliente_id: string | null
          dados_capturados: Json | null
          data_mensagem: string | null
          id: string
          mensagem: string | null
          numero_whatsapp: string | null
          origem: string | null
          processado: boolean | null
          tipo: string | null
          usuario_respondeu_id: string | null
        }
        Insert: {
          cliente_id?: string | null
          dados_capturados?: Json | null
          data_mensagem?: string | null
          id?: string
          mensagem?: string | null
          numero_whatsapp?: string | null
          origem?: string | null
          processado?: boolean | null
          tipo?: string | null
          usuario_respondeu_id?: string | null
        }
        Update: {
          cliente_id?: string | null
          dados_capturados?: Json | null
          data_mensagem?: string | null
          id?: string
          mensagem?: string | null
          numero_whatsapp?: string | null
          origem?: string | null
          processado?: boolean | null
          tipo?: string | null
          usuario_respondeu_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'conversas_whatsapp_cliente_id_fkey'
            columns: ['cliente_id']
            isOneToOne: false
            referencedRelation: 'clientes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'conversas_whatsapp_usuario_respondeu_id_fkey'
            columns: ['usuario_respondeu_id']
            isOneToOne: false
            referencedRelation: 'usuarios'
            referencedColumns: ['id']
          },
        ]
      }
      crm_agente_ia: {
        Row: {
          created_at: string | null
          data_consulta: string | null
          data_ultimo_disparo: string | null
          data_vencimento_certificado: string | null
          follow_up_1: boolean | null
          follow_up_2: boolean | null
          follow_up_3: boolean | null
          id: string
          id_conta_chatwoot: string | null
          id_conversa_chatwoot: string | null
          id_lead_chatwoot: string | null
          identificador_usuario: string | null
          inbox_id_chatwoot: string | null
          inicio_atendimento: string | null
          marcou_no_grupo: boolean | null
          modelo_certificado: string | null
          nome: string | null
          Produto: string | null
          queixas_relatadas: string | null
          resumo_conversa: string | null
          status_lead: string | null
          status_renovacao: string | null
          timestamp_ultima_msg: string | null
          tipo_pessoa: string | null
          tipo_ultimo_alerta: string | null
          unidade: string | null
          updated_at: string | null
          whatsapp: string | null
        }
        Insert: {
          created_at?: string | null
          data_consulta?: string | null
          data_ultimo_disparo?: string | null
          data_vencimento_certificado?: string | null
          follow_up_1?: boolean | null
          follow_up_2?: boolean | null
          follow_up_3?: boolean | null
          id?: string
          id_conta_chatwoot?: string | null
          id_conversa_chatwoot?: string | null
          id_lead_chatwoot?: string | null
          identificador_usuario?: string | null
          inbox_id_chatwoot?: string | null
          inicio_atendimento?: string | null
          marcou_no_grupo?: boolean | null
          modelo_certificado?: string | null
          nome?: string | null
          Produto?: string | null
          queixas_relatadas?: string | null
          resumo_conversa?: string | null
          status_lead?: string | null
          status_renovacao?: string | null
          timestamp_ultima_msg?: string | null
          tipo_pessoa?: string | null
          tipo_ultimo_alerta?: string | null
          unidade?: string | null
          updated_at?: string | null
          whatsapp?: string | null
        }
        Update: {
          created_at?: string | null
          data_consulta?: string | null
          data_ultimo_disparo?: string | null
          data_vencimento_certificado?: string | null
          follow_up_1?: boolean | null
          follow_up_2?: boolean | null
          follow_up_3?: boolean | null
          id?: string
          id_conta_chatwoot?: string | null
          id_conversa_chatwoot?: string | null
          id_lead_chatwoot?: string | null
          identificador_usuario?: string | null
          inbox_id_chatwoot?: string | null
          inicio_atendimento?: string | null
          marcou_no_grupo?: boolean | null
          modelo_certificado?: string | null
          nome?: string | null
          Produto?: string | null
          queixas_relatadas?: string | null
          resumo_conversa?: string | null
          status_lead?: string | null
          status_renovacao?: string | null
          timestamp_ultima_msg?: string | null
          tipo_pessoa?: string | null
          tipo_ultimo_alerta?: string | null
          unidade?: string | null
          updated_at?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      CRM_geral: {
        Row: {
          'Data da consulta': string | null
          'Follow UP 1': string | null
          'Follow UP 2': string | null
          'Follow UP 3': string | null
          'IDConta ChatWoot': string | null
          'IDConversa ChatWoot': string | null
          'Identificador do usuario': string
          'IDLead ChatWoot': string | null
          'InboxID ChatWoot': string | null
          'Inicio do atendimento': string | null
          'Marcou no Grupo': string | null
          nomeLead: string | null
          Produto: string | null
          'Resumo da conversa': string | null
          'Timestamp ultima msg': string | null
          Unidade: string | null
          Whatsapp: string | null
        }
        Insert: {
          'Data da consulta'?: string | null
          'Follow UP 1'?: string | null
          'Follow UP 2'?: string | null
          'Follow UP 3'?: string | null
          'IDConta ChatWoot'?: string | null
          'IDConversa ChatWoot'?: string | null
          'Identificador do usuario': string
          'IDLead ChatWoot'?: string | null
          'InboxID ChatWoot'?: string | null
          'Inicio do atendimento'?: string | null
          'Marcou no Grupo'?: string | null
          nomeLead?: string | null
          Produto?: string | null
          'Resumo da conversa'?: string | null
          'Timestamp ultima msg'?: string | null
          Unidade?: string | null
          Whatsapp?: string | null
        }
        Update: {
          'Data da consulta'?: string | null
          'Follow UP 1'?: string | null
          'Follow UP 2'?: string | null
          'Follow UP 3'?: string | null
          'IDConta ChatWoot'?: string | null
          'IDConversa ChatWoot'?: string | null
          'Identificador do usuario'?: string
          'IDLead ChatWoot'?: string | null
          'InboxID ChatWoot'?: string | null
          'Inicio do atendimento'?: string | null
          'Marcou no Grupo'?: string | null
          nomeLead?: string | null
          Produto?: string | null
          'Resumo da conversa'?: string | null
          'Timestamp ultima msg'?: string | null
          Unidade?: string | null
          Whatsapp?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          company_name: string | null
          created_at: string | null
          email: string | null
          expiry_date: string | null
          id: string
          last_interaction: string | null
          name: string
          phone: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          expiry_date?: string | null
          id?: string
          last_interaction?: string | null
          name: string
          phone: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          expiry_date?: string | null
          id?: string
          last_interaction?: string | null
          name?: string
          phone?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          document_type: string
          file_path: string | null
          id: string
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          document_type: string
          file_path?: string | null
          id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          document_type?: string
          file_path?: string | null
          id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      financial_transactions: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          face_value: number | null
          id: string
          open_value: number | null
          payee_payer: string | null
          payment_date: string | null
          payment_method: string | null
          status: string | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          face_value?: number | null
          id?: string
          open_value?: number | null
          payee_payer?: string | null
          payment_date?: string | null
          payment_method?: string | null
          status?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          face_value?: number | null
          id?: string
          open_value?: number | null
          payee_payer?: string | null
          payment_date?: string | null
          payment_method?: string | null
          status?: string | null
          type?: string | null
        }
        Relationships: []
      }
      historico_alteracoes: {
        Row: {
          acao: string | null
          dados_anteriores: Json | null
          dados_novos: Json | null
          data_alteracao: string | null
          id: string
          registro_id: string | null
          tabela: string | null
          usuario_id: string | null
        }
        Insert: {
          acao?: string | null
          dados_anteriores?: Json | null
          dados_novos?: Json | null
          data_alteracao?: string | null
          id?: string
          registro_id?: string | null
          tabela?: string | null
          usuario_id?: string | null
        }
        Update: {
          acao?: string | null
          dados_anteriores?: Json | null
          dados_novos?: Json | null
          data_alteracao?: string | null
          id?: string
          registro_id?: string | null
          tabela?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'historico_alteracoes_usuario_id_fkey'
            columns: ['usuario_id']
            isOneToOne: false
            referencedRelation: 'usuarios'
            referencedColumns: ['id']
          },
        ]
      }
      Itens_Produto: {
        Row: {
          DataValidade: string | null
          Item_ID: string
          NomeProduto: string | null
          Pedido_ID: number | null
        }
        Insert: {
          DataValidade?: string | null
          Item_ID?: string
          NomeProduto?: string | null
          Pedido_ID?: number | null
        }
        Update: {
          DataValidade?: string | null
          Item_ID?: string
          NomeProduto?: string | null
          Pedido_ID?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'Itens_Produto_Pedido_ID_fkey'
            columns: ['Pedido_ID']
            isOneToOne: false
            referencedRelation: 'Pedidos'
            referencedColumns: ['Pedido_ID']
          },
        ]
      }
      media_inventory: {
        Row: {
          created_at: string | null
          id: string
          is_comodato: boolean | null
          media_type: string | null
          observation: string | null
          quantity: number | null
          stock_date: string | null
          unit_cost: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_comodato?: boolean | null
          media_type?: string | null
          observation?: string | null
          quantity?: number | null
          stock_date?: string | null
          unit_cost?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_comodato?: boolean | null
          media_type?: string | null
          observation?: string | null
          quantity?: number | null
          stock_date?: string | null
          unit_cost?: number | null
        }
        Relationships: []
      }
      n8n_chat_histories: {
        Row: {
          id: number
          message: Json | null
          session_id: string
        }
        Insert: {
          id?: number
          message?: Json | null
          session_id: string
        }
        Update: {
          id?: number
          message?: Json | null
          session_id?: string
        }
        Relationships: []
      }
      partner_leads: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          cnpj: string | null
          complemento: string | null
          cpf: string | null
          created_at: string
          dedup_key: string
          email: string
          id: string
          lgpd: boolean
          nome: string
          numero: string | null
          pix_chave: string | null
          pix_tipo: string | null
          razao_social: string | null
          rua: string | null
          tipo_parceria: string
          uf: string | null
          whatsapp: string
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          complemento?: string | null
          cpf?: string | null
          created_at?: string
          dedup_key: string
          email: string
          id?: string
          lgpd?: boolean
          nome: string
          numero?: string | null
          pix_chave?: string | null
          pix_tipo?: string | null
          razao_social?: string | null
          rua?: string | null
          tipo_parceria: string
          uf?: string | null
          whatsapp: string
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          complemento?: string | null
          cpf?: string | null
          created_at?: string
          dedup_key?: string
          email?: string
          id?: string
          lgpd?: boolean
          nome?: string
          numero?: string | null
          pix_chave?: string | null
          pix_tipo?: string | null
          razao_social?: string | null
          rua?: string | null
          tipo_parceria?: string
          uf?: string | null
          whatsapp?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          agencia: string | null
          banco: string | null
          cnpj: string | null
          conta: string | null
          cpf: string | null
          created_at: string | null
          email: string | null
          endereco_completo: string | null
          id: string
          nome: string
          telefone: string | null
          tipo_conta: string | null
          user_id: string | null
        }
        Insert: {
          agencia?: string | null
          banco?: string | null
          cnpj?: string | null
          conta?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          endereco_completo?: string | null
          id?: string
          nome: string
          telefone?: string | null
          tipo_conta?: string | null
          user_id?: string | null
        }
        Update: {
          agencia?: string | null
          banco?: string | null
          cnpj?: string | null
          conta?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          endereco_completo?: string | null
          id?: string
          nome?: string
          telefone?: string | null
          tipo_conta?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      pedidos: {
        Row: {
          agente_id: string | null
          cliente_id: string | null
          data_atualizacao: string | null
          data_criacao: string | null
          data_pagamento: string | null
          data_pedido: string | null
          desconto: number | null
          id: string
          numero_nf: string | null
          numero_pedido: string | null
          observacoes: string | null
          produto_id: string | null
          protocolo_certificadora: string | null
          status_pagamento: string | null
          status_pedido: string | null
          valor_final: number | null
          valor_venda: number | null
          vendedor_id: string | null
        }
        Insert: {
          agente_id?: string | null
          cliente_id?: string | null
          data_atualizacao?: string | null
          data_criacao?: string | null
          data_pagamento?: string | null
          data_pedido?: string | null
          desconto?: number | null
          id?: string
          numero_nf?: string | null
          numero_pedido?: string | null
          observacoes?: string | null
          produto_id?: string | null
          protocolo_certificadora?: string | null
          status_pagamento?: string | null
          status_pedido?: string | null
          valor_final?: number | null
          valor_venda?: number | null
          vendedor_id?: string | null
        }
        Update: {
          agente_id?: string | null
          cliente_id?: string | null
          data_atualizacao?: string | null
          data_criacao?: string | null
          data_pagamento?: string | null
          data_pedido?: string | null
          desconto?: number | null
          id?: string
          numero_nf?: string | null
          numero_pedido?: string | null
          observacoes?: string | null
          produto_id?: string | null
          protocolo_certificadora?: string | null
          status_pagamento?: string | null
          status_pedido?: string | null
          valor_final?: number | null
          valor_venda?: number | null
          vendedor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'pedidos_agente_id_fkey'
            columns: ['agente_id']
            isOneToOne: false
            referencedRelation: 'usuarios'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'pedidos_cliente_id_fkey'
            columns: ['cliente_id']
            isOneToOne: false
            referencedRelation: 'clientes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'pedidos_produto_id_fkey'
            columns: ['produto_id']
            isOneToOne: false
            referencedRelation: 'produtos'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'pedidos_vendedor_id_fkey'
            columns: ['vendedor_id']
            isOneToOne: false
            referencedRelation: 'usuarios'
            referencedColumns: ['id']
          },
        ]
      }
      Pedidos: {
        Row: {
          DataPedido: string
          ID_Pessoa: string | null
          Pedido_ID: number
          StatusGeral: string | null
        }
        Insert: {
          DataPedido: string
          ID_Pessoa?: string | null
          Pedido_ID: number
          StatusGeral?: string | null
        }
        Update: {
          DataPedido?: string
          ID_Pessoa?: string | null
          Pedido_ID?: number
          StatusGeral?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'Pedidos_ID_Pessoa_fkey'
            columns: ['ID_Pessoa']
            isOneToOne: false
            referencedRelation: 'Pessoas'
            referencedColumns: ['ID_Pessoa']
          },
        ]
      }
      permissoes_usuario: {
        Row: {
          data_atualizacao: string | null
          funcionalidade: string | null
          id: string
          permitido: boolean | null
          usuario_id: string | null
        }
        Insert: {
          data_atualizacao?: string | null
          funcionalidade?: string | null
          id?: string
          permitido?: boolean | null
          usuario_id?: string | null
        }
        Update: {
          data_atualizacao?: string | null
          funcionalidade?: string | null
          id?: string
          permitido?: boolean | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'permissoes_usuario_usuario_id_fkey'
            columns: ['usuario_id']
            isOneToOne: false
            referencedRelation: 'usuarios'
            referencedColumns: ['id']
          },
        ]
      }
      Pessoas: {
        Row: {
          CNPJ: string | null
          CPF: string | null
          EmailPrincipal: string | null
          ID_Pessoa: string
          Nome_Pessoa: string
          RazaoSocial: string | null
          TelefonePrincipal: string | null
        }
        Insert: {
          CNPJ?: string | null
          CPF?: string | null
          EmailPrincipal?: string | null
          ID_Pessoa?: string
          Nome_Pessoa: string
          RazaoSocial?: string | null
          TelefonePrincipal?: string | null
        }
        Update: {
          CNPJ?: string | null
          CPF?: string | null
          EmailPrincipal?: string | null
          ID_Pessoa?: string
          Nome_Pessoa?: string
          RazaoSocial?: string | null
          TelefonePrincipal?: string | null
        }
        Relationships: []
      }
      produtos: {
        Row: {
          ativo: boolean | null
          descricao: string | null
          fornecedor_id: string | null
          id: string
          nome: string
          preco_base: number | null
          tempo_processamento_max: number | null
          tempo_processamento_min: number | null
        }
        Insert: {
          ativo?: boolean | null
          descricao?: string | null
          fornecedor_id?: string | null
          id?: string
          nome: string
          preco_base?: number | null
          tempo_processamento_max?: number | null
          tempo_processamento_min?: number | null
        }
        Update: {
          ativo?: boolean | null
          descricao?: string | null
          fornecedor_id?: string | null
          id?: string
          nome?: string
          preco_base?: number | null
          tempo_processamento_max?: number | null
          tempo_processamento_min?: number | null
        }
        Relationships: []
      }
      status_certificado: {
        Row: {
          data_atualizacao: string | null
          descricao: string | null
          etapa: string | null
          evento: string | null
          id: string
          pedido_id: string | null
          status: string | null
        }
        Insert: {
          data_atualizacao?: string | null
          descricao?: string | null
          etapa?: string | null
          evento?: string | null
          id?: string
          pedido_id?: string | null
          status?: string | null
        }
        Update: {
          data_atualizacao?: string | null
          descricao?: string | null
          etapa?: string | null
          evento?: string | null
          id?: string
          pedido_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'status_certificado_pedido_id_fkey'
            columns: ['pedido_id']
            isOneToOne: false
            referencedRelation: 'pedidos'
            referencedColumns: ['id']
          },
        ]
      }
      stg_importacao_raw: {
        Row: {
          AR: string | null
          Cliente: string | null
          CNPJ: string | null
          CPF: string | null
          Data_de_Vencimento: string | null
          Email: string | null
          Pedido: string | null
          Ponto_de_Atendimento: string | null
          Produto: string | null
          Razao_Social: string | null
          Status_do_Pedido: string | null
          Telefone: string | null
        }
        Insert: {
          AR?: string | null
          Cliente?: string | null
          CNPJ?: string | null
          CPF?: string | null
          Data_de_Vencimento?: string | null
          Email?: string | null
          Pedido?: string | null
          Ponto_de_Atendimento?: string | null
          Produto?: string | null
          Razao_Social?: string | null
          Status_do_Pedido?: string | null
          Telefone?: string | null
        }
        Update: {
          AR?: string | null
          Cliente?: string | null
          CNPJ?: string | null
          CPF?: string | null
          Data_de_Vencimento?: string | null
          Email?: string | null
          Pedido?: string | null
          Ponto_de_Atendimento?: string | null
          Produto?: string | null
          Razao_Social?: string | null
          Status_do_Pedido?: string | null
          Telefone?: string | null
        }
        Relationships: []
      }
      tabelas_preco: {
        Row: {
          ativo: boolean | null
          data_criacao: string | null
          id: string
          nome: string
          preco_venda: number | null
          produto_id: string | null
          usuario_id: string | null
        }
        Insert: {
          ativo?: boolean | null
          data_criacao?: string | null
          id?: string
          nome: string
          preco_venda?: number | null
          produto_id?: string | null
          usuario_id?: string | null
        }
        Update: {
          ativo?: boolean | null
          data_criacao?: string | null
          id?: string
          nome?: string
          preco_venda?: number | null
          produto_id?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'tabelas_preco_produto_id_fkey'
            columns: ['produto_id']
            isOneToOne: false
            referencedRelation: 'produtos'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tabelas_preco_usuario_id_fkey'
            columns: ['usuario_id']
            isOneToOne: false
            referencedRelation: 'usuarios'
            referencedColumns: ['id']
          },
        ]
      }
      usuarios: {
        Row: {
          ativo: boolean | null
          data_criacao: string | null
          email: string
          id: string
          meta_comissao_minima: number | null
          nome: string
          percentual_comissao_padrao: number | null
          senha: string | null
          tipo_usuario: string | null
        }
        Insert: {
          ativo?: boolean | null
          data_criacao?: string | null
          email: string
          id?: string
          meta_comissao_minima?: number | null
          nome: string
          percentual_comissao_padrao?: number | null
          senha?: string | null
          tipo_usuario?: string | null
        }
        Update: {
          ativo?: boolean | null
          data_criacao?: string | null
          email?: string
          id?: string
          meta_comissao_minima?: number | null
          nome?: string
          percentual_comissao_padrao?: number | null
          senha?: string | null
          tipo_usuario?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: CRM_geral
//   Identificador do usuario: text (not null)
//   Inicio do atendimento: text (nullable)
//   nomeLead: text (nullable)
//   Whatsapp: text (nullable)
//   Produto: text (nullable)
//   Unidade: text (nullable)
//   Resumo da conversa: text (nullable)
//   Data da consulta: text (nullable)
//   Marcou no Grupo: text (nullable)
//   Timestamp ultima msg: text (nullable)
//   Follow UP 1: text (nullable)
//   Follow UP 2: text (nullable)
//   Follow UP 3: text (nullable)
//   IDConta ChatWoot: text (nullable)
//   IDConversa ChatWoot: text (nullable)
//   IDLead ChatWoot: text (nullable)
//   InboxID ChatWoot: text (nullable)
// Table: Itens_Produto
//   Item_ID: uuid (not null, default: gen_random_uuid())
//   Pedido_ID: bigint (nullable)
//   NomeProduto: text (nullable)
//   DataValidade: date (nullable)
// Table: Pedidos
//   Pedido_ID: bigint (not null)
//   ID_Pessoa: uuid (nullable)
//   DataPedido: date (not null)
//   StatusGeral: text (nullable)
// Table: Pessoas
//   ID_Pessoa: uuid (not null, default: gen_random_uuid())
//   Nome_Pessoa: text (not null)
//   CPF: text (nullable)
//   CNPJ: text (nullable)
//   RazaoSocial: text (nullable)
//   EmailPrincipal: text (nullable)
//   TelefonePrincipal: text (nullable)
// Table: agents
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (nullable)
//   nome_agente: text (not null)
//   cpf_agente: text (nullable)
//   email: text (nullable)
//   telefone: text (nullable)
//   endereco_completo: text (nullable)
//   cidade_uf: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: bank_accounts
//   id: uuid (not null, default: gen_random_uuid())
//   active: boolean (nullable, default: true)
//   bank_type: text (nullable)
//   bank_number: text (nullable)
//   agency: text (nullable)
//   account_number: text (nullable)
//   owner_document: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: certificates
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (nullable)
//   client_name_rs: text (not null)
//   cnpj: text (nullable)
//   razao_social: text (nullable)
//   documento: text (nullable)
//   email: text (nullable)
//   telefone_1: text (nullable)
//   telefone_2: text (nullable)
//   cidade_uf: text (nullable)
//   contato_principal: text (nullable)
//   certificado_tipo: text (nullable)
//   pedido_ticket: text (nullable)
//   status_renovacao: text (nullable, default: 'Pendente'::text)
//   parceiro: text (nullable)
//   data_emissao: date (nullable)
//   data_validacao: date (nullable)
//   data_expiracao: date (not null)
//   data_oportunidade: date (nullable)
//   valor_oportunidade: numeric (nullable)
//   vendedor_indicacao: text (nullable)
//   cpf_agente: text (nullable)
//   nome_agente: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: clientes
//   id: uuid (not null, default: gen_random_uuid())
//   documento: text (nullable)
//   nome: text (not null)
//   email: text (nullable)
//   telefone: text (nullable)
//   razao_social: text (nullable)
//   endereco: text (nullable)
//   cidade: text (nullable)
//   uf: text (nullable)
//   data_cadastro: timestamp with time zone (nullable, default: timezone('utc'::text, now()))
//   status: text (nullable)
//   origem: text (nullable)
// Table: comissoes
//   id: uuid (not null, default: gen_random_uuid())
//   vendedor_id: uuid (nullable)
//   agente_id: uuid (nullable)
//   pedido_id: uuid (nullable)
//   valor_venda: numeric (nullable)
//   percentual_comissao: numeric (nullable)
//   valor_comissao_bruto: numeric (nullable)
//   imposto_retido: numeric (nullable)
//   valor_comissao_liquido: numeric (nullable)
//   status: text (nullable)
//   data_calculo: timestamp with time zone (nullable, default: timezone('utc'::text, now()))
//   data_pagamento: timestamp with time zone (nullable)
//   observacoes: text (nullable)
// Table: conversas_whatsapp
//   id: uuid (not null, default: gen_random_uuid())
//   cliente_id: uuid (nullable)
//   numero_whatsapp: text (nullable)
//   mensagem: text (nullable)
//   tipo: text (nullable)
//   origem: text (nullable)
//   data_mensagem: timestamp with time zone (nullable, default: timezone('utc'::text, now()))
//   usuario_respondeu_id: uuid (nullable)
//   dados_capturados: jsonb (nullable)
//   processado: boolean (nullable, default: false)
// Table: crm_agente_ia
//   id: uuid (not null, default: gen_random_uuid())
//   identificador_usuario: text (nullable)
//   whatsapp: text (nullable)
//   nome: text (nullable)
//   id_conta_chatwoot: text (nullable)
//   id_conversa_chatwoot: text (nullable)
//   id_lead_chatwoot: text (nullable)
//   inbox_id_chatwoot: text (nullable)
//   inicio_atendimento: timestamp with time zone (nullable, default: timezone('utc'::text, now()))
//   timestamp_ultima_msg: timestamp with time zone (nullable)
//   resumo_conversa: text (nullable)
//   Produto: text (nullable)
//   unidade: text (nullable)
//   data_consulta: timestamp with time zone (nullable)
//   status_lead: text (nullable, default: 'novo'::text)
//   tipo_pessoa: text (nullable)
//   modelo_certificado: text (nullable)
//   data_vencimento_certificado: date (nullable)
//   status_renovacao: text (nullable, default: 'vigente'::text)
//   data_ultimo_disparo: timestamp with time zone (nullable)
//   tipo_ultimo_alerta: text (nullable)
//   marcou_no_grupo: boolean (nullable, default: false)
//   follow_up_1: boolean (nullable, default: false)
//   follow_up_2: boolean (nullable, default: false)
//   follow_up_3: boolean (nullable, default: false)
//   queixas_relatadas: text (nullable)
//   created_at: timestamp with time zone (nullable, default: timezone('utc'::text, now()))
//   updated_at: timestamp with time zone (nullable, default: timezone('utc'::text, now()))
// Table: customers
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   company_name: text (nullable)
//   phone: text (not null)
//   email: text (nullable)
//   status: text (nullable, default: 'pending_contact'::text)
//   expiry_date: timestamp with time zone (nullable)
//   last_interaction: timestamp with time zone (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: documents
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   document_type: text (not null)
//   status: text (nullable, default: 'pendente'::text)
//   file_path: text (nullable)
//   created_at: timestamp with time zone (not null, default: timezone('utc'::text, now()))
// Table: financial_transactions
//   id: uuid (not null, default: gen_random_uuid())
//   type: text (nullable)
//   status: text (nullable)
//   due_date: date (nullable)
//   payment_date: date (nullable)
//   face_value: numeric (nullable)
//   open_value: numeric (nullable)
//   description: text (nullable)
//   payee_payer: text (nullable)
//   payment_method: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: historico_alteracoes
//   id: uuid (not null, default: gen_random_uuid())
//   tabela: text (nullable)
//   registro_id: uuid (nullable)
//   usuario_id: uuid (nullable)
//   acao: text (nullable)
//   dados_anteriores: jsonb (nullable)
//   dados_novos: jsonb (nullable)
//   data_alteracao: timestamp with time zone (nullable, default: timezone('utc'::text, now()))
// Table: media_inventory
//   id: uuid (not null, default: gen_random_uuid())
//   media_type: text (nullable)
//   quantity: integer (nullable)
//   unit_cost: numeric (nullable)
//   is_comodato: boolean (nullable, default: false)
//   stock_date: date (nullable)
//   observation: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: n8n_chat_histories
//   id: integer (not null)
//   session_id: character varying (not null)
//   message: jsonb (nullable)
// Table: partner_leads
//   id: uuid (not null, default: gen_random_uuid())
//   created_at: timestamp with time zone (not null, default: now())
//   tipo_parceria: text (not null)
//   nome: text (not null)
//   cpf: text (nullable)
//   email: text (not null)
//   whatsapp: text (not null)
//   razao_social: text (nullable)
//   cnpj: text (nullable)
//   cep: text (nullable)
//   rua: text (nullable)
//   numero: text (nullable)
//   complemento: text (nullable)
//   bairro: text (nullable)
//   cidade: text (nullable)
//   uf: text (nullable)
//   pix_tipo: text (nullable)
//   pix_chave: text (nullable)
//   lgpd: boolean (not null, default: false)
//   dedup_key: text (not null)
// Table: partners
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (nullable)
//   nome: text (not null)
//   cpf: text (nullable)
//   cnpj: text (nullable)
//   email: text (nullable)
//   telefone: text (nullable)
//   endereco_completo: text (nullable)
//   banco: text (nullable)
//   agencia: text (nullable)
//   conta: text (nullable)
//   tipo_conta: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: pedidos
//   id: uuid (not null, default: gen_random_uuid())
//   numero_pedido: text (nullable)
//   cliente_id: uuid (nullable)
//   produto_id: uuid (nullable)
//   vendedor_id: uuid (nullable)
//   agente_id: uuid (nullable)
//   data_pedido: timestamp with time zone (nullable, default: timezone('utc'::text, now()))
//   valor_venda: numeric (nullable)
//   desconto: numeric (nullable)
//   valor_final: numeric (nullable)
//   status_pedido: text (nullable)
//   status_pagamento: text (nullable)
//   data_pagamento: timestamp with time zone (nullable)
//   protocolo_certificadora: text (nullable)
//   numero_nf: text (nullable)
//   observacoes: text (nullable)
//   data_criacao: timestamp with time zone (nullable, default: timezone('utc'::text, now()))
//   data_atualizacao: timestamp with time zone (nullable, default: timezone('utc'::text, now()))
// Table: permissoes_usuario
//   id: uuid (not null, default: gen_random_uuid())
//   usuario_id: uuid (nullable)
//   funcionalidade: text (nullable)
//   permitido: boolean (nullable, default: false)
//   data_atualizacao: timestamp with time zone (nullable, default: timezone('utc'::text, now()))
// Table: produtos
//   id: uuid (not null, default: gen_random_uuid())
//   nome: text (not null)
//   descricao: text (nullable)
//   preco_base: numeric (nullable)
//   tempo_processamento_min: integer (nullable)
//   tempo_processamento_max: integer (nullable)
//   fornecedor_id: uuid (nullable)
//   ativo: boolean (nullable, default: true)
// Table: status_certificado
//   id: uuid (not null, default: gen_random_uuid())
//   pedido_id: uuid (nullable)
//   etapa: text (nullable)
//   status: text (nullable)
//   data_atualizacao: timestamp with time zone (nullable, default: timezone('utc'::text, now()))
//   descricao: text (nullable)
//   evento: text (nullable)
// Table: stg_importacao_raw
//   Pedido: text (nullable)
//   Data_de_Vencimento: text (nullable)
//   Cliente: text (nullable)
//   Email: text (nullable)
//   Telefone: text (nullable)
//   Produto: text (nullable)
//   AR: text (nullable)
//   Ponto_de_Atendimento: text (nullable)
//   Status_do_Pedido: text (nullable)
//   CPF: text (nullable)
//   CNPJ: text (nullable)
//   Razao_Social: text (nullable)
// Table: tabelas_preco
//   id: uuid (not null, default: gen_random_uuid())
//   nome: text (not null)
//   usuario_id: uuid (nullable)
//   produto_id: uuid (nullable)
//   preco_venda: numeric (nullable)
//   ativo: boolean (nullable, default: true)
//   data_criacao: timestamp with time zone (nullable, default: timezone('utc'::text, now()))
// Table: usuarios
//   id: uuid (not null, default: gen_random_uuid())
//   email: text (not null)
//   senha: text (nullable)
//   nome: text (not null)
//   tipo_usuario: text (nullable)
//   ativo: boolean (nullable, default: true)
//   meta_comissao_minima: numeric (nullable)
//   percentual_comissao_padrao: numeric (nullable)
//   data_criacao: timestamp with time zone (nullable, default: timezone('utc'::text, now()))

// --- CONSTRAINTS ---
// Table: CRM_geral
//   PRIMARY KEY CRM_geral_pkey: PRIMARY KEY ("Identificador do usuario")
// Table: Itens_Produto
//   FOREIGN KEY Itens_Produto_Pedido_ID_fkey: FOREIGN KEY ("Pedido_ID") REFERENCES "Pedidos"("Pedido_ID")
//   PRIMARY KEY Itens_Produto_pkey: PRIMARY KEY ("Item_ID")
// Table: Pedidos
//   FOREIGN KEY Pedidos_ID_Pessoa_fkey: FOREIGN KEY ("ID_Pessoa") REFERENCES "Pessoas"("ID_Pessoa")
//   PRIMARY KEY Pedidos_pkey: PRIMARY KEY ("Pedido_ID")
// Table: Pessoas
//   UNIQUE Pessoas_CNPJ_key: UNIQUE ("CNPJ")
//   UNIQUE Pessoas_CPF_key: UNIQUE ("CPF")
//   PRIMARY KEY Pessoas_pkey: PRIMARY KEY ("ID_Pessoa")
// Table: agents
//   UNIQUE agents_cpf_agente_key: UNIQUE (cpf_agente)
//   PRIMARY KEY agents_pkey: PRIMARY KEY (id)
//   FOREIGN KEY agents_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id)
// Table: bank_accounts
//   PRIMARY KEY bank_accounts_pkey: PRIMARY KEY (id)
// Table: certificates
//   PRIMARY KEY certificates_pkey: PRIMARY KEY (id)
//   FOREIGN KEY certificates_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id)
// Table: clientes
//   PRIMARY KEY clientes_pkey: PRIMARY KEY (id)
// Table: comissoes
//   FOREIGN KEY comissoes_agente_id_fkey: FOREIGN KEY (agente_id) REFERENCES usuarios(id)
//   FOREIGN KEY comissoes_pedido_id_fkey: FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
//   PRIMARY KEY comissoes_pkey: PRIMARY KEY (id)
//   FOREIGN KEY comissoes_vendedor_id_fkey: FOREIGN KEY (vendedor_id) REFERENCES usuarios(id)
// Table: conversas_whatsapp
//   FOREIGN KEY conversas_whatsapp_cliente_id_fkey: FOREIGN KEY (cliente_id) REFERENCES clientes(id)
//   PRIMARY KEY conversas_whatsapp_pkey: PRIMARY KEY (id)
//   FOREIGN KEY conversas_whatsapp_usuario_respondeu_id_fkey: FOREIGN KEY (usuario_respondeu_id) REFERENCES usuarios(id)
// Table: crm_agente_ia
//   UNIQUE crm_agente_ia_identificador_usuario_key: UNIQUE (identificador_usuario)
//   PRIMARY KEY crm_agente_ia_pkey: PRIMARY KEY (id)
// Table: customers
//   PRIMARY KEY customers_pkey: PRIMARY KEY (id)
// Table: documents
//   PRIMARY KEY documents_pkey: PRIMARY KEY (id)
//   CHECK documents_status_check: CHECK ((status = ANY (ARRAY['pendente'::text, 'validado'::text, 'rejeitado'::text])))
//   FOREIGN KEY documents_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: financial_transactions
//   PRIMARY KEY financial_transactions_pkey: PRIMARY KEY (id)
// Table: historico_alteracoes
//   PRIMARY KEY historico_alteracoes_pkey: PRIMARY KEY (id)
//   FOREIGN KEY historico_alteracoes_usuario_id_fkey: FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
// Table: media_inventory
//   PRIMARY KEY media_inventory_pkey: PRIMARY KEY (id)
// Table: n8n_chat_histories
//   PRIMARY KEY n8n_chat_histories_pkey: PRIMARY KEY (id)
// Table: partner_leads
//   PRIMARY KEY partner_leads_pkey: PRIMARY KEY (id)
// Table: partners
//   PRIMARY KEY partners_pkey: PRIMARY KEY (id)
//   FOREIGN KEY partners_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id)
// Table: pedidos
//   FOREIGN KEY pedidos_agente_id_fkey: FOREIGN KEY (agente_id) REFERENCES usuarios(id)
//   FOREIGN KEY pedidos_cliente_id_fkey: FOREIGN KEY (cliente_id) REFERENCES clientes(id)
//   PRIMARY KEY pedidos_pkey: PRIMARY KEY (id)
//   FOREIGN KEY pedidos_produto_id_fkey: FOREIGN KEY (produto_id) REFERENCES produtos(id)
//   FOREIGN KEY pedidos_vendedor_id_fkey: FOREIGN KEY (vendedor_id) REFERENCES usuarios(id)
// Table: permissoes_usuario
//   PRIMARY KEY permissoes_usuario_pkey: PRIMARY KEY (id)
//   FOREIGN KEY permissoes_usuario_usuario_id_fkey: FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
// Table: produtos
//   PRIMARY KEY produtos_pkey: PRIMARY KEY (id)
// Table: status_certificado
//   FOREIGN KEY status_certificado_pedido_id_fkey: FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
//   PRIMARY KEY status_certificado_pkey: PRIMARY KEY (id)
// Table: tabelas_preco
//   PRIMARY KEY tabelas_preco_pkey: PRIMARY KEY (id)
//   FOREIGN KEY tabelas_preco_produto_id_fkey: FOREIGN KEY (produto_id) REFERENCES produtos(id)
//   FOREIGN KEY tabelas_preco_usuario_id_fkey: FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
// Table: usuarios
//   UNIQUE usuarios_email_key: UNIQUE (email)
//   PRIMARY KEY usuarios_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: CRM_geral
//   Policy "politica-de-privacidade" (ALL, PERMISSIVE) roles={public}
//     USING: true
// Table: Itens_Produto
//   Policy "Politica Privacidade Produto AVMD" (ALL, PERMISSIVE) roles={public}
//     USING: true
// Table: Pedidos
//   Policy "Politica privacidade Pedidos AVMD" (ALL, PERMISSIVE) roles={public}
//     USING: true
// Table: Pessoas
//   Policy "Politica Privacidade Clientes AVMD" (ALL, PERMISSIVE) roles={public}
//     USING: true
// Table: agents
//   Policy "Gerenciar agentes" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = user_id)
// Table: bank_accounts
//   Policy "Allow all access bank_accounts" (ALL, PERMISSIVE) roles={public}
//     USING: true
// Table: certificates
//   Policy "Acesso total ao dono dos dados" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = user_id)
// Table: clientes
//   Policy "Allow authenticated access clientes" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: comissoes
//   Policy "Allow authenticated access comissoes" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: conversas_whatsapp
//   Policy "Allow authenticated access conversas_whatsapp" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: crm_agente_ia
//   Policy "Politica Privacidade AVMD" (ALL, PERMISSIVE) roles={public}
//     USING: true
// Table: customers
//   Policy "Allow all access" (ALL, PERMISSIVE) roles={public}
//     USING: true
//     WITH CHECK: true
//   Policy "politica-de-privacidade" (ALL, PERMISSIVE) roles={public}
//     USING: true
// Table: documents
//   Policy "Usuários podem inserir seus próprios documentos" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: (auth.uid() = user_id)
//   Policy "Usuários podem ver seus próprios documentos" (SELECT, PERMISSIVE) roles={public}
//     USING: (auth.uid() = user_id)
// Table: financial_transactions
//   Policy "Allow all access financial_transactions" (ALL, PERMISSIVE) roles={public}
//     USING: true
// Table: historico_alteracoes
//   Policy "Allow authenticated access historico_alteracoes" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: media_inventory
//   Policy "Allow all access media_inventory" (ALL, PERMISSIVE) roles={public}
//     USING: true
// Table: partner_leads
//   Policy "politica de privacidade" (ALL, PERMISSIVE) roles={public}
//     USING: true
// Table: partners
//   Policy "Gerenciar parceiros" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = user_id)
// Table: pedidos
//   Policy "Allow authenticated access pedidos" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: permissoes_usuario
//   Policy "Allow authenticated access permissoes_usuario" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: produtos
//   Policy "Allow authenticated access produtos" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: status_certificado
//   Policy "Allow authenticated access status_certificado" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: tabelas_preco
//   Policy "Allow authenticated access tabelas_preco" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: usuarios
//   Policy "Allow authenticated access usuarios" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true

// --- DATABASE FUNCTIONS ---
// FUNCTION rls_auto_enable()
//   CREATE OR REPLACE FUNCTION public.rls_auto_enable()
//    RETURNS event_trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//    SET search_path TO 'pg_catalog'
//   AS $function$
//   DECLARE
//     cmd record;
//   BEGIN
//     FOR cmd IN
//       SELECT *
//       FROM pg_event_trigger_ddl_commands()
//       WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
//         AND object_type IN ('table','partitioned table')
//     LOOP
//        IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
//         BEGIN
//           EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
//           RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
//         EXCEPTION
//           WHEN OTHERS THEN
//             RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
//         END;
//        ELSE
//           RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
//        END IF;
//     END LOOP;
//   END;
//   $function$
//

// --- INDEXES ---
// Table: Pessoas
//   CREATE UNIQUE INDEX "Pessoas_CNPJ_key" ON public."Pessoas" USING btree ("CNPJ")
//   CREATE UNIQUE INDEX "Pessoas_CPF_key" ON public."Pessoas" USING btree ("CPF")
// Table: agents
//   CREATE UNIQUE INDEX agents_cpf_agente_key ON public.agents USING btree (cpf_agente)
// Table: crm_agente_ia
//   CREATE UNIQUE INDEX crm_agente_ia_identificador_usuario_key ON public.crm_agente_ia USING btree (identificador_usuario)
// Table: partner_leads
//   CREATE UNIQUE INDEX partner_leads_dedup_key_uidx ON public.partner_leads USING btree (dedup_key)
// Table: usuarios
//   CREATE UNIQUE INDEX usuarios_email_key ON public.usuarios USING btree (email)
