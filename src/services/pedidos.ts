import { supabase } from '@/lib/supabase/client'

export interface PedidoData {
  id: string
  numero_pedido?: string
  cliente_id?: string
  produto_id?: string
  vendedor_id?: string
  agente_id?: string
  data_pedido?: string
  valor_venda?: number
  desconto?: number
  valor_final?: number
  status_pedido?: string
  status_pagamento?: string
  data_pagamento?: string
  protocolo_certificadora?: string
  numero_nf?: string
  observacoes?: string
  cliente?: { nome: string }
  produto?: { nome: string }
  vendedor?: { nome: string }
  agente?: { nome: string }
}

export type PedidoFormData = Omit<
  PedidoData,
  'id' | 'cliente' | 'produto' | 'vendedor' | 'agente'
> & {
  id?: string
}

export const getDropdownData = async () => {
  const [clientesRes, produtosRes, usuariosRes] = await Promise.all([
    supabase.from('clientes').select('id, nome').order('nome'),
    supabase.from('produtos').select('id, nome').eq('ativo', true).order('nome'),
    supabase
      .from('usuarios')
      .select('id, nome, role, tipo_usuario')
      .eq('ativo', true)
      .order('nome'),
  ])

  return {
    clientes: clientesRes.data || [],
    produtos: produtosRes.data || [],
    usuarios: usuariosRes.data || [],
  }
}

export const getPedidos = async (): Promise<PedidoData[]> => {
  const { data, error } = await supabase
    .from('pedidos')
    .select(`
      *,
      cliente:clientes!pedidos_cliente_id_fkey(nome),
      produto:produtos!pedidos_produto_id_fkey(nome),
      vendedor:usuarios!pedidos_vendedor_id_fkey(nome),
      agente:usuarios!pedidos_agente_id_fkey(nome)
    `)
    .order('data_pedido', { ascending: false })

  if (error) throw error
  return data || []
}

export const createPedido = async (pedido: PedidoFormData): Promise<PedidoData> => {
  const { data, error } = await supabase
    .from('pedidos')
    .insert([cleanPayload(pedido)])
    .select()
    .single()

  if (error) throw error
  return data
}

export const updatePedido = async (id: string, pedido: PedidoFormData): Promise<PedidoData> => {
  const { data, error } = await supabase
    .from('pedidos')
    .update(cleanPayload(pedido))
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deletePedido = async (id: string): Promise<void> => {
  const { error } = await supabase.from('pedidos').delete().eq('id', id)
  if (error) throw error
}

// Utility to clean empty string foreign keys to null to avoid UUID cast errors
const cleanPayload = (data: PedidoFormData) => {
  const payload: any = { ...data }
  if (!payload.cliente_id) payload.cliente_id = null
  if (!payload.produto_id) payload.produto_id = null
  if (!payload.vendedor_id) payload.vendedor_id = null
  if (!payload.agente_id) payload.agente_id = null

  payload.valor_venda = payload.valor_venda ? Number(payload.valor_venda) : null
  payload.desconto = payload.desconto ? Number(payload.desconto) : null
  payload.valor_final = payload.valor_final ? Number(payload.valor_final) : null
  return payload
}
