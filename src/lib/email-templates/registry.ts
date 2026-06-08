import type { ComponentType } from 'react'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

import { template as invoiceRequestNotification } from './invoice-request-notification'
import { template as foundingClassClaimNotification } from './founding-class-claim-notification'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'invoice-request-notification': invoiceRequestNotification,
  'founding-class-claim-notification': foundingClassClaimNotification,
}
