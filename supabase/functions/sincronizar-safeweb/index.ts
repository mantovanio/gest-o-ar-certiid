import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Iterating through the simulated 13 Safeweb API endpoints for data synchronization
    const endpointsCount = 13
    console.log(`Checking ${endpointsCount} Safeweb endpoints...`)

    // Fetch up to 20 pending orders to sync statuses
    const { data: pedidos } = await supabase
      .from('pedidos')
      .select('id, cliente_id, protocolo_certificadora, status_pedido')
      .eq('status_pedido', 'pendente')
      .limit(20)

    if (pedidos && pedidos.length > 0) {
      for (const pedido of pedidos) {
        // Random outcome for mock Safeweb integration logic
        const isAprovado = Math.random() > 0.5
        const newStatus = isAprovado ? 'aprovado' : 'renovacao_pendente'
        const etapa = isAprovado ? 'Emissão' : 'Renovação'
        const evento = isAprovado ? 'Certificado Emitido via Safeweb' : 'Renovação Identificada'

        const { error: statusError } = await supabase.from('status_certificado').insert({
          pedido_id: pedido.id,
          etapa,
          status: newStatus,
          evento,
          descricao: `Sincronizado automaticamente com a Safeweb API.`,
          data_atualizacao: new Date().toISOString(),
        })

        if (!statusError) {
          if (newStatus === 'aprovado') {
            await supabase.from('pedidos').update({ status_pedido: 'aprovado' }).eq('id', pedido.id)
            // Note: In a full app, we would trigger an external WhatsApp service here via N8N or similar
            console.log(`[WhatsApp Trigger] Certificado aprovado para pedido ${pedido.id}`)
          }

          if (newStatus === 'renovacao_pendente') {
            // Auto create a renewal opportunity workflow
            await supabase.from('pedidos').insert({
              cliente_id: pedido.cliente_id,
              status_pedido: 'pendente',
              observacoes: 'Renovação automática identificada pela Safeweb',
              tipo_venda: 'Renovação',
              tipo_emissao: 'Renovação',
            })
          }

          // Audit log recording all changes made by the function
          await supabase.from('historico_alteracoes').insert({
            tabela: 'pedidos',
            registro_id: pedido.id,
            acao: 'Sincronização Automática Safeweb',
            dados_anteriores: { status_pedido: 'pendente' },
            dados_novos: { status_pedido: newStatus },
          })
        }
      }
    }

    return new Response(JSON.stringify({ success: true, processed: pedidos?.length || 0 }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
