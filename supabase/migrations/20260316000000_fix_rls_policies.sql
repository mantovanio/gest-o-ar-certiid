-- Migration to enforce strict Row Level Security (RLS) on core tables
-- This revokes the dangerous "USING (true)" policy and applies proper rules based on the user's role and permission.

-- Helper function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.usuarios 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if the current user has a specific permission
CREATE OR REPLACE FUNCTION public.has_permission(required_permission text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.permissoes_usuario 
    WHERE usuario_id = auth.uid() 
      AND funcionalidade = required_permission 
      AND permitido = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. DROPPING INSECURE POLICIES
DO $$ 
DECLARE
  t text;
  policy_name text;
BEGIN
  -- List of tables to drop the generic "Allow authenticated access" policy
  FOR t IN 
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public' 
      AND tablename IN (
        'clientes', 'emissoes', 'renovacoes', 'agendamentos', 'comissoes', 
        'tabelas_preco', 'metas_comissao', 'notificacoes', 'permissoes_usuario', 
        'usuarios', 'bank_accounts', 'financial_transactions', 'media_inventory', 
        'notification_queue'
      )
  LOOP
    policy_name := format('Allow authenticated access %I', t);
    
    BEGIN
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I;', policy_name, t);
    EXCEPTION WHEN OTHERS THEN
      -- Ignore if policy doesn't exist
    END;
    
    -- Also try dropping "Allow all access" policies specifically for finance 
    policy_name := format('Allow all access %I', t);
    BEGIN
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I;', policy_name, t);
    EXCEPTION WHEN OTHERS THEN
      -- Ignore
    END;
  END LOOP;
END $$;


-- 2. APPLYING STRICT POLICIES

-- USUARIOS
-- Admins can do everything. Users can only read their own profile.
CREATE POLICY "Users can view own profile" ON public.usuarios FOR SELECT USING (id = auth.uid() OR public.is_admin());
CREATE POLICY "Admins can insert users" ON public.usuarios FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update users" ON public.usuarios FOR UPDATE USING (public.is_admin());
CREATE POLICY "Users can update own details" ON public.usuarios FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Admins can delete users" ON public.usuarios FOR DELETE USING (public.is_admin());

-- PERMISSOES_USUARIO
CREATE POLICY "Users can view own permissions" ON public.permissoes_usuario FOR SELECT USING (usuario_id = auth.uid() OR public.is_admin());
CREATE POLICY "Admins can manage permissions" ON public.permissoes_usuario FOR ALL USING (public.is_admin());

-- CLIENTES
CREATE POLICY "Users with ver_clientes can view" ON public.clientes FOR SELECT USING (public.has_permission('ver_clientes') OR public.is_admin());
CREATE POLICY "Users with ver_clientes can insert" ON public.clientes FOR INSERT WITH CHECK (public.has_permission('ver_clientes') OR public.is_admin());
CREATE POLICY "Users with ver_clientes can update" ON public.clientes FOR UPDATE USING (public.has_permission('ver_clientes') OR public.is_admin());
CREATE POLICY "Admins can delete clientes" ON public.clientes FOR DELETE USING (public.is_admin());

-- EMISSOES / RENOVACOES / AGENDAMENTOS (Pedidos)
CREATE POLICY "View pedidos" ON public.emissoes FOR SELECT USING (public.has_permission('ver_pedidos') OR public.is_admin());
CREATE POLICY "Manage pedidos" ON public.emissoes FOR ALL USING (public.has_permission('ver_pedidos') OR public.is_admin());

CREATE POLICY "View renovacoes" ON public.renovacoes FOR SELECT USING (public.has_permission('ver_pedidos') OR public.is_admin());
CREATE POLICY "Manage renovacoes" ON public.renovacoes FOR ALL USING (public.has_permission('ver_pedidos') OR public.is_admin());

CREATE POLICY "View agendamentos" ON public.agendamentos FOR SELECT USING (public.has_permission('ver_agendamentos') OR public.is_admin());
CREATE POLICY "Manage agendamentos" ON public.agendamentos FOR ALL USING (public.has_permission('ver_agendamentos') OR public.is_admin());

-- COMISSOES
CREATE POLICY "View own comissoes" ON public.comissoes FOR SELECT USING (
  agente_id = auth.uid() OR 
  public.has_permission('ver_comissoes_todas') OR 
  public.is_admin()
);
CREATE POLICY "Admins and full viewers can manage comissoes" ON public.comissoes FOR ALL USING (public.has_permission('ver_comissoes_todas') OR public.is_admin());

-- FINANCEIRO
CREATE POLICY "Admin only bank accounts" ON public.bank_accounts FOR ALL USING (public.is_admin());
CREATE POLICY "Admin only financial transactions" ON public.financial_transactions FOR ALL USING (public.is_admin());
CREATE POLICY "Admin only media inventory" ON public.media_inventory FOR ALL USING (public.is_admin());

-- CONFIGS / TABELAS DE PRECO / METAS
CREATE POLICY "View tabelas_preco" ON public.tabelas_preco FOR SELECT USING (true); -- Usually public for authenticated
CREATE POLICY "Manage tabelas_preco" ON public.tabelas_preco FOR ALL USING (public.has_permission('tabelas_preco') OR public.is_admin());

CREATE POLICY "View metas_comissao" ON public.metas_comissao FOR SELECT USING (true);
CREATE POLICY "Manage metas_comissao" ON public.metas_comissao FOR ALL USING (public.has_permission('metas_comissao') OR public.is_admin());

-- NOTIFICACOES
CREATE POLICY "Users can view own notifications" ON public.notificacoes FOR SELECT USING (usuario_id = auth.uid() OR public.is_admin());
CREATE POLICY "Admins manage notification queue" ON public.notification_queue FOR ALL USING (public.is_admin());
