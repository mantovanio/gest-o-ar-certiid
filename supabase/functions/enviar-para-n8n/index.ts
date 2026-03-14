import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { pedido_id } = await req.json()
    if (!pedido_id) throw new Error('pedido_id is required')

    const n8nUrl = Deno.env.get('N8N_WEBHOOK_URL_PEDIDO')
    if (!n8nUrl) throw new Error('N8N_WEBHOOK_URL_PEDIDO is not configured')

    // Fetch detailed order data to send to n8n
    const { data: pedido, error } = await supabase
      .from('pedidos')
      .select(`*, cliente:clientes(*), produto:produtos(*)`)
      .eq('id', pedido_id)
      .single()

    if (error) throw error

    const n8nRes = await fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'novo_pedido', data: pedido }),
    })

    if (!n8nRes.ok) {
      throw new Error(`Failed to send to n8n: ${n8nRes.statusText}`)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Enviado para n8n com sucesso' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
