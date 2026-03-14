import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { phone, message } = await req.json()

    if (!phone || !message) {
      throw new Error('phone and message are required')
    }

    const n8nUrl = Deno.env.get('N8N_WEBHOOK_URL_WHATSAPP')
    if (!n8nUrl) throw new Error('N8N_WEBHOOK_URL_WHATSAPP is not configured')

    const n8nRes = await fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, message }),
    })

    if (!n8nRes.ok) {
      throw new Error(`Failed to send to n8n: ${n8nRes.statusText}`)
    }

    return new Response(JSON.stringify({ success: true, message: 'Mensagem enfileirada no n8n' }), {
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
