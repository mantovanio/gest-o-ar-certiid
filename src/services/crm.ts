import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

export type Lead = Database['public']['Tables']['crm_agente_ia']['Row']

export const getLeads = async () => {
  const { data, error } = await supabase
    .from('crm_agente_ia')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const updateLeadStatus = async (id: string, newStatus: string) => {
  const { data, error } = await supabase
    .from('crm_agente_ia')
    .update({ status_lead: newStatus, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}
