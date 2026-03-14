-- Migration: refactor_core_tables

-- Table: usuarios
ALTER TABLE public.usuarios 
  ADD COLUMN IF NOT EXISTS role TEXT,
  ADD COLUMN IF NOT EXISTS status BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'usuarios_role_check'
  ) THEN
    ALTER TABLE public.usuarios ADD CONSTRAINT usuarios_role_check CHECK (role IN ('admin', 'agente', 'gerente'));
  END IF;
END $$;

-- Table: clientes
ALTER TABLE public.clientes ALTER COLUMN data_cadastro TYPE DATE USING data_cadastro::DATE;

ALTER TABLE public.clientes
  ADD COLUMN IF NOT EXISTS cpf_cnpj TEXT,
  ADD COLUMN IF NOT EXISTS empresa TEXT,
  ADD COLUMN IF NOT EXISTS ramo_atividade TEXT,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());

-- Table: pedidos
ALTER TABLE public.pedidos ALTER COLUMN valor_venda TYPE DECIMAL USING valor_venda::DECIMAL;

ALTER TABLE public.pedidos
  ADD COLUMN IF NOT EXISTS protocolo TEXT,
  ADD COLUMN IF NOT EXISTS tipo_emissao TEXT,
  ADD COLUMN IF NOT EXISTS tipo_venda TEXT,
  ADD COLUMN IF NOT EXISTS status_venda TEXT,
  ADD COLUMN IF NOT EXISTS data_status DATE,
  ADD COLUMN IF NOT EXISTS forma_pagamento TEXT,
  ADD COLUMN IF NOT EXISTS produto TEXT,
  ADD COLUMN IF NOT EXISTS data_agenda DATE,
  ADD COLUMN IF NOT EXISTS agente_agenda TEXT,
  ADD COLUMN IF NOT EXISTS doc_cliente TEXT,
  ADD COLUMN IF NOT EXISTS cliente_nome TEXT,
  ADD COLUMN IF NOT EXISTS tabela_venda TEXT,
  ADD COLUMN IF NOT EXISTS link_videoconferencia TEXT,
  ADD COLUMN IF NOT EXISTS data_venda DATE,
  ADD COLUMN IF NOT EXISTS data_vencimento DATE,
  ADD COLUMN IF NOT EXISTS data_pagto DATE,
  ADD COLUMN IF NOT EXISTS status_nota TEXT,
  ADD COLUMN IF NOT EXISTS observacao TEXT,
  ADD COLUMN IF NOT EXISTS email_cliente TEXT,
  ADD COLUMN IF NOT EXISTS telefone_cliente TEXT,
  ADD COLUMN IF NOT EXISTS data_nota DATE,
  ADD COLUMN IF NOT EXISTS mensagem_prefeitura TEXT,
  ADD COLUMN IF NOT EXISTS vendedor TEXT,
  ADD COLUMN IF NOT EXISTS local_atendimento TEXT,
  ADD COLUMN IF NOT EXISTS agente_registro TEXT,
  ADD COLUMN IF NOT EXISTS usuario_criacao TEXT,
  ADD COLUMN IF NOT EXISTS ar_solicitacao TEXT,
  ADD COLUMN IF NOT EXISTS token TEXT,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());

-- Table: conversas_whatsapp
ALTER TABLE public.conversas_whatsapp
  ADD COLUMN IF NOT EXISTS tipo_mensagem TEXT,
  ADD COLUMN IF NOT EXISTS status_leitura BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'conversas_whatsapp_tipo_mensagem_check'
  ) THEN
    ALTER TABLE public.conversas_whatsapp ADD CONSTRAINT conversas_whatsapp_tipo_mensagem_check CHECK (tipo_mensagem IN ('entrada', 'saida'));
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'conversas_whatsapp_origem_check'
  ) THEN
    ALTER TABLE public.conversas_whatsapp ADD CONSTRAINT conversas_whatsapp_origem_check CHECK (origem IN ('chatwoot', 'evolution')) NOT VALID;
  END IF;
END $$;
