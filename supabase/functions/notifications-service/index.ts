import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

const CHATWOOT_API_URL = Deno.env.get('CHATWOOT_API_URL') ?? ''
const CHATWOOT_API_TOKEN = Deno.env.get('CHATWOOT_API_TOKEN') ?? ''
const CHATWOOT_ACCOUNT_ID = Deno.env.get('CHATWOOT_ACCOUNT_ID') ?? ''
const CHATWOOT_INBOX_ID = Deno.env.get('CHATWOOT_INBOX_ID') ?? ''

async function sendChatwootMessage(phone: string, message: string) {
  if (!CHATWOOT_API_URL || !CHATWOOT_API_TOKEN || !CHATWOOT_ACCOUNT_ID || !CHATWOOT_INBOX_ID) {
    throw new Error('Chatwoot credentials not fully configured in env.')
  }

  const formattedPhone = phone.replace(/\D/g, '')
  const phoneWithPlus = formattedPhone.startsWith('+') ? formattedPhone : `+${formattedPhone}`

  // 1. Search Contact
  const searchRes = await fetch(
    `${CHATWOOT_API_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/contacts/search?q=${encodeURIComponent(phoneWithPlus)}`,
    {
      headers: { api_access_token: CHATWOOT_API_TOKEN },
    },
  )

  if (!searchRes.ok) throw new Error(`Search Contact failed: ${searchRes.statusText}`)

  const searchData = await searchRes.json()
  let contactId = searchData.payload?.[0]?.id

  // 2. Create Contact if not found
  if (!contactId) {
    const createRes = await fetch(
      `${CHATWOOT_API_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          api_access_token: CHATWOOT_API_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phoneWithPlus,
          name: `Contact ${phoneWithPlus}`,
        }),
      },
    )

    if (!createRes.ok) {
      const err = await createRes.text()
      throw new Error(`Create Contact failed: ${err}`)
    }

    const createData = await createRes.json()
    contactId = createData.payload?.contact?.id
  }

  if (!contactId) throw new Error('Could not resolve contact ID')

  // 3. Create Conversation
  const convRes = await fetch(
    `${CHATWOOT_API_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/conversations`,
    {
      method: 'POST',
      headers: {
        api_access_token: CHATWOOT_API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact_id: contactId,
        inbox_id: CHATWOOT_INBOX_ID,
      }),
    },
  )

  if (!convRes.ok) throw new Error(`Create Conversation failed: ${await convRes.text()}`)

  const convData = await convRes.json()
  const conversationId = convData.id

  if (!conversationId) throw new Error('Could not resolve conversation ID')

  // 4. Send Message
  const msgRes = await fetch(
    `${CHATWOOT_API_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/conversations/${conversationId}/messages`,
    {
      method: 'POST',
      headers: {
        api_access_token: CHATWOOT_API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
        message_type: 'outgoing',
        private: false,
      }),
    },
  )

  if (!msgRes.ok) throw new Error(`Send Message failed: ${await msgRes.text()}`)

  return true
}

Deno.cron('Process Notification Queue', '* * * * *', async () => {
  const { data: queue, error } = await supabase
    .from('notification_queue')
    .select('*')
    .eq('status', 'pending')
    .limit(20)

  if (error || !queue || queue.length === 0) return

  for (const item of queue) {
    try {
      await sendChatwootMessage(item.phone, item.message)
      await supabase
        .from('notification_queue')
        .update({
          status: 'sent',
          processed_at: new Date().toISOString(),
        })
        .eq('id', item.id)
    } catch (err: any) {
      await supabase
        .from('notification_queue')
        .update({
          status: 'failed',
          error_log: err.message,
          processed_at: new Date().toISOString(),
        })
        .eq('id', item.id)
    }
  }
})

Deno.cron('Check Expiring Certificates', '0 8 * * *', async () => {
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 30)
  const dateStr = targetDate.toISOString().split('T')[0]

  const { data: certs, error } = await supabase
    .from('certificates')
    .select('id, client_name_rs, telefone_1, email')
    .eq('data_expiracao', dateStr)

  if (error || !certs) return

  const queueItems = certs
    .filter((c) => c.telefone_1)
    .map((c) => ({
      phone: c.telefone_1,
      message: `Olá ${c.client_name_rs}, seu certificado digital expirará em 30 dias. Entre em contato para renovar!`,
      reference_id: c.id,
      notification_type: 'EXPIRY_REMINDER',
    }))

  if (queueItems.length > 0) {
    await supabase.from('notification_queue').insert(queueItems)
  }
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  return new Response(JSON.stringify({ status: 'Notifications Service Running' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
