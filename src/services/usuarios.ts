import { supabase } from '@/lib/supabase/client'

export interface UsuarioData {
  id: string
  email: string
  nome: string
  tipo_usuario: string
  role?: string
  status: boolean
  meta_comissao_minima?: number
  percentual_comissao_padrao?: number
  ativo: boolean
}

export const getUsuarios = async (): Promise<UsuarioData[]> => {
  const { data, error } = await supabase.from('usuarios').select('*').order('nome')
  if (error) throw error
  return data || []
}

export const createUsuario = async (usuario: Partial<UsuarioData>): Promise<UsuarioData> => {
  const payload = { ...usuario }
  if (payload.tipo_usuario === 'admin') payload.role = 'admin'
  const { data, error } = await supabase.from('usuarios').insert([payload]).select().single()
  if (error) throw error
  return data
}

export const updateUsuario = async (
  id: string,
  usuario: Partial<UsuarioData>,
): Promise<UsuarioData> => {
  const payload = { ...usuario }
  if (payload.tipo_usuario === 'admin') payload.role = 'admin'
  const { data, error } = await supabase
    .from('usuarios')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export const checkUsuarioLinks = async (id: string): Promise<boolean> => {
  const [
    { count: pedidosCount, error: pedidosErr },
    { count: comissoesCount, error: comissoesErr },
  ] = await Promise.all([
    supabase
      .from('pedidos')
      .select('*', { count: 'exact', head: true })
      .or(`vendedor_id.eq.${id},agente_id.eq.${id}`),
    supabase
      .from('comissoes')
      .select('*', { count: 'exact', head: true })
      .or(`vendedor_id.eq.${id},agente_id.eq.${id}`),
  ])

  if (pedidosErr) throw pedidosErr
  if (comissoesErr) throw comissoesErr

  return (pedidosCount || 0) > 0 || (comissoesCount || 0) > 0
}

export const deleteUsuario = async (id: string): Promise<void> => {
  const { error } = await supabase.from('usuarios').delete().eq('id', id)
  if (error) throw error
}
