import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// Public URL: https://[PROJECT_REF].supabase.co/functions/v1/webhook-status-atualizado

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { pedido_id, etapa, status, descricao, evento } = await req.json()

    if (!pedido_id) throw new Error('pedido_id is required')

    const { data, error } = await supabase
      .from('status_certificado')
      .insert([
        {
          pedido_id,
          etapa,
          status,
          descricao,
          evento,
          data_atualizacao: new Date().toISOString(),
        },
      ])
      .select()
      .single()

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
