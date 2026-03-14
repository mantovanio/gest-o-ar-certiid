-- Table: usuarios
CREATE TABLE IF NOT EXISTS public.usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  senha TEXT,
  nome TEXT NOT NULL,
  tipo_usuario TEXT,
  ativo BOOLEAN DEFAULT true,
  meta_comissao_minima NUMERIC,
  percentual_comissao_padrao NUMERIC,
  data_criacao TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Table: clientes
CREATE TABLE IF NOT EXISTS public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  documento TEXT,
  nome TEXT NOT NULL,
  email TEXT,
  telefone TEXT,
  razao_social TEXT,
  endereco TEXT,
  cidade TEXT,
  uf TEXT,
  data_cadastro TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  status TEXT,
  origem TEXT
);

-- Table: produtos
CREATE TABLE IF NOT EXISTS public.produtos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  preco_base NUMERIC,
  tempo_processamento_min INTEGER,
  tempo_processamento_max INTEGER,
  fornecedor_id UUID,
  ativo BOOLEAN DEFAULT true
);

-- Table: pedidos
CREATE TABLE IF NOT EXISTS public.pedidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_pedido TEXT,
  cliente_id UUID REFERENCES public.clientes(id),
  produto_id UUID REFERENCES public.produtos(id),
  vendedor_id UUID REFERENCES public.usuarios(id),
  agente_id UUID REFERENCES public.usuarios(id),
  data_pedido TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  valor_venda NUMERIC,
  desconto NUMERIC,
  valor_final NUMERIC,
  status_pedido TEXT,
  status_pagamento TEXT,
  data_pagamento TIMESTAMPTZ,
  protocolo_certificadora TEXT,
  numero_nf TEXT,
  observacoes TEXT,
  data_criacao TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  data_atualizacao TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Table: status_certificado
CREATE TABLE IF NOT EXISTS public.status_certificado (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID REFERENCES public.pedidos(id),
  etapa TEXT,
  status TEXT,
  data_atualizacao TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  descricao TEXT,
  evento TEXT
);

-- Table: conversas_whatsapp
CREATE TABLE IF NOT EXISTS public.conversas_whatsapp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES public.clientes(id),
  numero_whatsapp TEXT,
  mensagem TEXT,
  tipo TEXT,
  origem TEXT,
  data_mensagem TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  usuario_respondeu_id UUID REFERENCES public.usuarios(id),
  dados_capturados JSONB,
  processado BOOLEAN DEFAULT false
);

-- Table: comissoes
CREATE TABLE IF NOT EXISTS public.comissoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendedor_id UUID REFERENCES public.usuarios(id),
  agente_id UUID REFERENCES public.usuarios(id),
  pedido_id UUID REFERENCES public.pedidos(id),
  valor_venda NUMERIC,
  percentual_comissao NUMERIC,
  valor_comissao_bruto NUMERIC,
  imposto_retido NUMERIC,
  valor_comissao_liquido NUMERIC,
  status TEXT,
  data_calculo TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  data_pagamento TIMESTAMPTZ,
  observacoes TEXT
);

-- Table: tabelas_preco
CREATE TABLE IF NOT EXISTS public.tabelas_preco (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  usuario_id UUID REFERENCES public.usuarios(id),
  produto_id UUID REFERENCES public.produtos(id),
  preco_venda NUMERIC,
  ativo BOOLEAN DEFAULT true,
  data_criacao TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Table: permissoes_usuario
CREATE TABLE IF NOT EXISTS public.permissoes_usuario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES public.usuarios(id),
  funcionalidade TEXT,
  permitido BOOLEAN DEFAULT false,
  data_atualizacao TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Table: historico_alteracoes
CREATE TABLE IF NOT EXISTS public.historico_alteracoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tabela TEXT,
  registro_id UUID,
  usuario_id UUID REFERENCES public.usuarios(id),
  acao TEXT,
  dados_anteriores JSONB,
  dados_novos JSONB,
  data_alteracao TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Enable RLS and Create Policies
DO $$ 
DECLARE 
  t text;
BEGIN
  FOR t IN 
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN (
      'usuarios', 'clientes', 'produtos', 'pedidos', 
      'status_certificado', 'conversas_whatsapp', 'comissoes', 
      'tabelas_preco', 'permissoes_usuario', 'historico_alteracoes'
    )
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
    
    -- Try to create policy, ignore if it already exists (useful if re-running or manual edits)
    BEGIN
      EXECUTE format('CREATE POLICY "Allow authenticated access %I" ON public.%I FOR ALL TO authenticated USING (true) WITH CHECK (true);', t, t);
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END;
  END LOOP;
END $$;
