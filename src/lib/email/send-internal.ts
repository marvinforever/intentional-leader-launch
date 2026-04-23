// Server-only helper to enqueue a transactional email from internal server
// functions (no auth required — caller must be trusted server code).
import * as React from 'react'
import { render } from '@react-email/components'
import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'intentional-leader-launch'
const SENDER_DOMAIN = 'notify.leadintentional.tools'
const FROM_DOMAIN = 'notify.leadintentional.tools'

interface SendInternalParams {
  templateName: string
  recipientEmail?: string
  templateData?: Record<string, any>
  idempotencyKey?: string
}

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function sendInternalTransactionalEmail(params: SendInternalParams) {
  const { templateName, templateData = {} } = params
  const messageId = crypto.randomUUID()
  const idempotencyKey = params.idempotencyKey || messageId

  const template = TEMPLATES[templateName]
  if (!template) {
    throw new Error(`Template '${templateName}' not found`)
  }

  const recipient = (template.to || params.recipientEmail || '').toLowerCase()
  if (!recipient) {
    throw new Error('No recipient: provide recipientEmail or set template.to')
  }

  const { data: suppressed } = await supabaseAdmin
    .from('suppressed_emails' as any)
    .select('id')
    .eq('email', recipient)
    .maybeSingle()
  if (suppressed) {
    await supabaseAdmin.from('email_send_log' as any).insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: recipient,
      status: 'suppressed',
    })
    return { success: false, reason: 'email_suppressed' as const }
  }

  const { data: existing } = await supabaseAdmin
    .from('email_unsubscribe_tokens' as any)
    .select('token, used_at')
    .eq('email', recipient)
    .maybeSingle()

  let unsubscribeToken: string
  if (existing && !(existing as any).used_at) {
    unsubscribeToken = (existing as any).token
  } else if (!existing) {
    const newToken = generateToken()
    await supabaseAdmin
      .from('email_unsubscribe_tokens' as any)
      .upsert({ email: recipient, token: newToken }, { onConflict: 'email' })
    const { data: stored } = await supabaseAdmin
      .from('email_unsubscribe_tokens' as any)
      .select('token')
      .eq('email', recipient)
      .single()
    unsubscribeToken = (stored as any).token
  } else {
    return { success: false, reason: 'email_suppressed' as const }
  }

  const element = React.createElement(template.component, templateData)
  const html = await render(element)
  const plainText = await render(element, { plainText: true })
  const subject =
    typeof template.subject === 'function'
      ? template.subject(templateData)
      : template.subject

  await supabaseAdmin.from('email_send_log' as any).insert({
    message_id: messageId,
    template_name: templateName,
    recipient_email: recipient,
    status: 'pending',
  })

  const { error: enqueueError } = await supabaseAdmin.rpc('enqueue_email' as any, {
    queue_name: 'transactional_emails',
    payload: {
      message_id: messageId,
      to: recipient,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject,
      html,
      text: plainText,
      purpose: 'transactional',
      label: templateName,
      idempotency_key: idempotencyKey,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  })

  if (enqueueError) {
    await supabaseAdmin.from('email_send_log' as any).insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: recipient,
      status: 'failed',
      error_message: 'Failed to enqueue email',
    })
    throw new Error(`Failed to enqueue email: ${enqueueError.message}`)
  }

  return { success: true as const, queued: true, messageId }
}
