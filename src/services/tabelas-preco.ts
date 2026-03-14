import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

export type TabelaPreco = Database['public']['Tables']['tabelas_preco']['Row'] & {
  usuario?: { nome: string }
  produto?: { nome: string }
}

export const getTabelasPreco = async () => {
  const { data, error } = await supabase
    .from('tabelas_preco')
    .select(`
      *,
      usuario:usuarios!tabelas_preco_usuario_id_fkey(nome),
      produto:produtos!tabelas_preco_produto_id_fkey(nome)
    `)
    .order('data_criacao', { ascending: false })

  if (error) throw error
  return data as any[] as TabelaPreco[]
}

export const createTabelaPreco = async (payload: Partial<TabelaPreco>) => {
  const cleanPayload = {
    nome: payload.nome,
    usuario_id: payload.usuario_id || null,
    produto_id: payload.produto_id || null,
    preco_venda: payload.preco_venda || 0,
    ativo: payload.ativo !== false,
  }
  const { data, error } = await supabase
    .from('tabelas_preco')
    .insert(cleanPayload)
    .select()
    .single()
  if (error) throw error
  return data
}

export const updateTabelaPreco = async (id: string, payload: Partial<TabelaPreco>) => {
  const cleanPayload = {
    nome: payload.nome,
    usuario_id: payload.usuario_id || null,
    produto_id: payload.produto_id || null,
    preco_venda: payload.preco_venda || 0,
    ativo: payload.ativo !== false,
  }
  const { data, error } = await supabase
    .from('tabelas_preco')
    .update(cleanPayload)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export const deleteTabelaPreco = async (id: string) => {
  const { error } = await supabase.from('tabelas_preco').delete().eq('id', id)
  if (error) throw error
}
