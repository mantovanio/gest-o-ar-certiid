import { supabase } from '@/lib/supabase/client'

export const AVAILABLE_PERMISSIONS = [
  { id: 'ver_clientes', label: 'Ver Clientes', module: 'Clientes' },
  { id: 'criar_cliente', label: 'Criar Cliente', module: 'Clientes' },
  { id: 'editar_cliente', label: 'Editar Cliente', module: 'Clientes' },
  { id: 'deletar_cliente', label: 'Deletar Cliente', module: 'Clientes' },

  { id: 'ver_pedidos', label: 'Ver Pedidos', module: 'Pedidos' },
  { id: 'criar_pedido', label: 'Criar Pedido', module: 'Pedidos' },
  { id: 'editar_pedido', label: 'Editar Pedido', module: 'Pedidos' },
  { id: 'deletar_pedido', label: 'Deletar Pedido', module: 'Pedidos' },

  { id: 'ver_agendamentos', label: 'Ver Agendamentos', module: 'Agendamentos' },
  { id: 'criar_agendamento', label: 'Criar Agendamento', module: 'Agendamentos' },
  { id: 'editar_agendamento', label: 'Editar Agendamento', module: 'Agendamentos' },
  { id: 'deletar_agendamento', label: 'Deletar Agendamento', module: 'Agendamentos' },

  { id: 'ver_comissoes_proprias', label: 'Ver Comissões (próprias)', module: 'Comissões' },
  { id: 'ver_comissoes_todas', label: 'Ver Comissões (todas)', module: 'Comissões' },
  { id: 'calcular_comissoes', label: 'Calcular Comissões', module: 'Comissões' },
  { id: 'pagar_comissoes', label: 'Pagar Comissões', module: 'Comissões' },

  { id: 'ver_conversas', label: 'Ver Conversas', module: 'Conversas' },
  { id: 'responder_conversas', label: 'Responder Conversas', module: 'Conversas' },
  { id: 'enviar_mensagens', label: 'Enviar Mensagens', module: 'Conversas' },

  { id: 'ver_relatorios', label: 'Ver Relatórios', module: 'Relatórios' },
  { id: 'gerar_relatorios', label: 'Gerar Relatórios', module: 'Relatórios' },
  { id: 'exportar_dados', label: 'Exportar Dados', module: 'Relatórios' },

  { id: 'ver_usuarios', label: 'Ver Usuários', module: 'Usuários' },
  { id: 'criar_usuario', label: 'Criar Usuário', module: 'Usuários' },
  { id: 'editar_usuario', label: 'Editar Usuário', module: 'Usuários' },
  { id: 'deletar_usuario', label: 'Deletar Usuário', module: 'Usuários' },

  { id: 'gerenciar_permissoes', label: 'Gerenciar Permissões', module: 'Configurações' },
  { id: 'tabelas_preco', label: 'Tabelas de Preço', module: 'Configurações' },
  { id: 'metas_comissao', label: 'Metas de Comissão', module: 'Configurações' },
  { id: 'integracoes', label: 'Integrações', module: 'Configurações' },
  { id: 'backup', label: 'Backup', module: 'Configurações' },
]

export const getPermissoes = async (usuarioId: string) => {
  const { data, error } = await supabase
    .from('permissoes_usuario')
    .select('*')
    .eq('usuario_id', usuarioId)
  if (error) throw error

  const permsMap: Record<string, boolean> = {}
  data?.forEach((p) => {
    if (p.funcionalidade) permsMap[p.funcionalidade] = !!p.permitido
  })
  return permsMap
}

export const savePermissoes = async (usuarioId: string, perms: Record<string, boolean>) => {
  const { data: existing } = await supabase
    .from('permissoes_usuario')
    .select('id, funcionalidade')
    .eq('usuario_id', usuarioId)

  const existingMap = new Map(existing?.map((e) => [e.funcionalidade, e.id]))
  const toUpsert: any[] = []

  for (const [func, permitido] of Object.entries(perms)) {
    toUpsert.push({
      id: existingMap.get(func),
      usuario_id: usuarioId,
      funcionalidade: func,
      permitido: permitido,
      data_atualizacao: new Date().toISOString(),
    })
  }

  const inserts = toUpsert
    .filter((u) => !u.id)
    .map((item) => {
      const { id, ...rest } = item
      return rest
    })
  const updates = toUpsert.filter((u) => u.id)

  if (inserts.length > 0) {
    const { error } = await supabase.from('permissoes_usuario').insert(inserts)
    if (error) throw error
  }
  if (updates.length > 0) {
    const { error } = await supabase.from('permissoes_usuario').upsert(updates)
    if (error) throw error
  }
}
