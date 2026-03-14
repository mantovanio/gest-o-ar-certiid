import { supabase } from '@/lib/supabase/client'

export const triggerN8nPedido = async (pedidoId: string) => {
  const { data, error } = await supabase.functions.invoke('enviar-para-n8n', {
    body: { pedido_id: pedidoId },
  })
  if (error) throw error
  return data
}

export const triggerN8nWhatsApp = async (phone: string, message: string) => {
  const { data, error } = await supabase.functions.invoke('enviar-whatsapp-n8n', {
    body: { phone, message },
  })
  if (error) throw error
  return data
}
