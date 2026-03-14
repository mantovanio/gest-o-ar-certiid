import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// Public URL: https://[PROJECT_REF].supabase.co/functions/v1/webhook-novo-pedido

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const body = await req.json()

    // Clean empty strings for foreign keys to avoid UUID cast errors
    const payload = { ...body }
    if (!payload.cliente_id) payload.cliente_id = null
    if (!payload.produto_id) payload.produto_id = null
    if (!payload.vendedor_id) payload.vendedor_id = null
    if (!payload.agente_id) payload.agente_id = null

    const { data, error } = await supabase.from('pedidos').insert([payload]).select().single()

    if (error) throw error

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 201,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
