import { supabase } from '@/lib/supabase/client'

export interface ComissaoData {
  id: string
  vendedor_id?: string
  agente_id?: string
  pedido_id?: string
  valor_venda?: number
  percentual_comissao?: number
  valor_comissao_bruto?: number
  imposto_retido?: number
  valor_comissao_liquido?: number
  status?: string
  data_calculo?: string
  data_pagamento?: string
  observacoes?: string
  vendedor?: { nome: string }
  agente?: { nome: string }
  pedido?: { numero_pedido: string; protocolo_certificadora: string }
}

export const getComissoes = async (): Promise<ComissaoData[]> => {
  const { data, error } = await supabase
    .from('comissoes')
    .select(`
      *,
      vendedor:usuarios!comissoes_vendedor_id_fkey(nome),
      agente:usuarios!comissoes_agente_id_fkey(nome),
      pedido:pedidos!comissoes_pedido_id_fkey(numero_pedido, protocolo_certificadora)
    `)
    .order('data_calculo', { ascending: false })

  if (error) throw error
  return data as any[]
}

export const markComissaoAsPaid = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('comissoes')
    .update({ status: 'Pago', data_pagamento: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
}

export const calculateComissoes = async (): Promise<number> => {
  const { data: pedidos, error: errPedidos } = await supabase.from('pedidos').select('*')
  if (errPedidos) throw errPedidos

  const { data: comissoes, error: errComissoes } = await supabase
    .from('comissoes')
    .select('pedido_id')
  if (errComissoes) throw errComissoes

  const calculatedPedidoIds = new Set(comissoes.filter((c) => c.pedido_id).map((c) => c.pedido_id))

  // Consider only valid orders that don't have a commission yet
  const uncalculatedPedidos = pedidos.filter(
    (p) =>
      !calculatedPedidoIds.has(p.id) &&
      (p.vendedor_id || p.agente_id) &&
      Number(p.valor_final || p.valor_venda || 0) > 0,
  )

  if (uncalculatedPedidos.length === 0) return 0

  // Fetch users configuration
  const { data: users, error: errUsers } = await supabase
    .from('usuarios')
    .select('id, percentual_comissao_padrao, percentual_imposto')
  if (errUsers) throw errUsers

  const userMap = new Map(users.map((u) => [u.id, u]))

  const toInsert = uncalculatedPedidos.map((p) => {
    const userId = p.vendedor_id || p.agente_id
    const user = userMap.get(userId)

    const percComissao = Number(user?.percentual_comissao_padrao || 0)
    const percImposto = Number((user as any)?.percentual_imposto || 0)
    const valorVenda = Number(p.valor_final || p.valor_venda || 0)

    const bruto = valorVenda * (percComissao / 100)
    const imposto = bruto * (percImposto / 100)
    const liquido = bruto - imposto

    return {
      pedido_id: p.id,
      vendedor_id: p.vendedor_id,
      agente_id: p.agente_id,
      valor_venda: valorVenda,
      percentual_comissao: percComissao,
      valor_comissao_bruto: bruto,
      imposto_retido: imposto,
      valor_comissao_liquido: liquido,
      status: 'Pendente',
      data_calculo: new Date().toISOString(),
    }
  })

  if (toInsert.length > 0) {
    const { error: errInsert } = await supabase.from('comissoes').insert(toInsert)
    if (errInsert) throw errInsert
  }

  return toInsert.length
}

export const getUsuariosConfig = async () => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nome, meta_comissao_minima, percentual_comissao_padrao, percentual_imposto')
    .order('nome')
  if (error) throw error
  return data
}

export const updateUsuarioConfig = async (id: string, updates: any) => {
  const { error } = await supabase.from('usuarios').update(updates).eq('id', id)
  if (error) throw error
}
