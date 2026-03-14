import { supabase } from '@/lib/supabase/client'

export interface ClienteData {
  id: string
  documento: string
  nome: string
  email: string
  telefone: string
  razao_social: string
  endereco: string
  cidade: string
  uf: string
  status: string
  origem: string
  data_cadastro?: string
}

export type ClienteFormData = Omit<ClienteData, 'id' | 'data_cadastro'> & { id?: string }

export const getClientes = async (): Promise<ClienteData[]> => {
  const { data, error } = await supabase
    .from('clientes' as any)
    .select('*')
    .order('data_cadastro', { ascending: false })

  if (error) throw error
  return data || []
}

export const createCliente = async (cliente: ClienteFormData): Promise<ClienteData> => {
  const { data, error } = await supabase
    .from('clientes' as any)
    .insert([cliente])
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateCliente = async (id: string, cliente: ClienteFormData): Promise<ClienteData> => {
  const { data, error } = await supabase
    .from('clientes' as any)
    .update(cliente)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const checkPedidosVinculados = async (clienteId: string): Promise<boolean> => {
  const { count, error } = await supabase
    .from('pedidos' as any)
    .select('*', { count: 'exact', head: true })
    .eq('cliente_id', clienteId)

  if (error) throw error
  return (count || 0) > 0
}

export const deleteCliente = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('clientes' as any)
    .delete()
    .eq('id', id)
  if (error) throw error
}
