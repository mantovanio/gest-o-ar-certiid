-- Seed basic permissions for existing users, giving admins all permissions
DO $$ 
DECLARE
  u RECORD;
  p_id TEXT;
  permissoes TEXT[] := ARRAY[
    'ver_clientes', 'criar_cliente', 'editar_cliente', 'deletar_cliente',
    'ver_pedidos', 'criar_pedido', 'editar_pedido', 'deletar_pedido',
    'ver_agendamentos', 'criar_agendamento', 'editar_agendamento', 'deletar_agendamento',
    'ver_comissoes_proprias', 'ver_comissoes_todas', 'calcular_comissoes', 'pagar_comissoes',
    'ver_conversas', 'responder_conversas', 'enviar_mensagens',
    'ver_relatorios', 'gerar_relatorios', 'exportar_dados',
    'ver_usuarios', 'criar_usuario', 'editar_usuario', 'deletar_usuario',
    'gerenciar_permissoes', 'tabelas_preco', 'metas_comissao', 'integracoes', 'backup'
  ];
BEGIN
  FOR u IN SELECT id, role FROM public.usuarios LOOP
    FOREACH p_id IN ARRAY permissoes
    LOOP
      IF NOT EXISTS (SELECT 1 FROM public.permissoes_usuario WHERE usuario_id = u.id AND funcionalidade = p_id) THEN
        INSERT INTO public.permissoes_usuario (usuario_id, funcionalidade, permitido, data_atualizacao)
        VALUES (u.id, p_id, CASE WHEN u.role = 'admin' THEN true ELSE false END, NOW());
      END IF;
    END LOOP;
  END LOOP;
END $$;
