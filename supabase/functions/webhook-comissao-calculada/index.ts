import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// Public URL: https://[PROJECT_REF].supabase.co/functions/v1/webhook-comissao-calculada

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const body = await req.json()
    const { id, valor_comissao_bruto, imposto_retido, valor_comissao_liquido, status } = body

    if (!id) throw new Error('id is required')

    const updatePayload: any = {
      valor_comissao_bruto,
      imposto_retido,
      valor_comissao_liquido,
      data_calculo: new Date().toISOString(),
    }

    if (status) updatePayload.status = status

    const { data, error } = await supabase
      .from('comissoes')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
