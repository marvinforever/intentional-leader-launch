import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface InvoiceRequestNotificationProps {
  company_name?: string
  contact_name?: string
  billing_email?: string
  phone?: string
  billing_address?: string
  license_type?: string
  seat_count?: number
  amount_usd?: number
  notes?: string | null
  record_id?: string
  received_at?: string
}

const InvoiceRequestNotification = ({
  company_name = 'Unknown Company',
  contact_name = 'Unknown',
  billing_email = '',
  phone = '',
  billing_address = '',
  license_type = '',
  seat_count = 1,
  amount_usd = 0,
  notes,
  record_id,
  received_at,
}: InvoiceRequestNotificationProps) => {
  const formattedAmount = `$${amount_usd.toLocaleString('en-US')}`
  const licenseLabel =
    license_type === 'company' ? 'Company License' : `Individual License × ${seat_count}`

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{`New Invoice Request: ${company_name} (${formattedAmount})`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Invoice Request</Heading>
          <Text style={subtitle}>The Intentional Agribusiness Leader</Text>

          <Section style={amountBox}>
            <Text style={amountLabel}>Total Amount</Text>
            <Text style={amountValue}>{formattedAmount}</Text>
            <Text style={amountSub}>{licenseLabel}</Text>
          </Section>

          <Hr style={hr} />

          <Heading as="h2" style={h2}>Contact</Heading>
          <Text style={fieldRow}><strong>Company:</strong> {company_name}</Text>
          <Text style={fieldRow}><strong>Name:</strong> {contact_name}</Text>
          <Text style={fieldRow}><strong>Email:</strong> {billing_email}</Text>
          <Text style={fieldRow}><strong>Phone:</strong> {phone}</Text>

          <Heading as="h2" style={h2}>Billing Address</Heading>
          <Text style={addressBlock}>{billing_address}</Text>

          {notes ? (
            <>
              <Heading as="h2" style={h2}>Notes</Heading>
              <Text style={addressBlock}>{notes}</Text>
            </>
          ) : null}

          <Hr style={hr} />
          <Text style={meta}>
            {received_at ? `Received ${new Date(received_at).toLocaleString('en-US')}` : null}
            {record_id ? ` · Record ID: ${record_id}` : null}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: InvoiceRequestNotification,
  subject: (data: Record<string, any>) =>
    `New Invoice Request — ${data.company_name ?? 'Unknown'} ($${(data.amount_usd ?? 0).toLocaleString('en-US')})`,
  displayName: 'Invoice request notification',
  to: 'mark@themomentumcompany.com',
  previewData: {
    company_name: 'Acme Ag Co.',
    contact_name: 'Jane Smith',
    billing_email: 'jane@acme-ag.com',
    phone: '555-123-4567',
    billing_address: '123 Field Rd\nLincoln, NE 68508',
    license_type: 'company',
    seat_count: 1,
    amount_usd: 10000,
    notes: 'Looking forward to it!',
    record_id: 'sample-uuid',
    received_at: new Date().toISOString(),
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '600px' }
const h1 = { fontSize: '24px', fontWeight: 'bold', color: '#0a3d2c', margin: '0 0 4px' }
const h2 = { fontSize: '14px', fontWeight: 'bold', color: '#0a3d2c', margin: '20px 0 8px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }
const subtitle = { fontSize: '13px', color: '#6b6f76', margin: '0 0 20px' }
const amountBox = { backgroundColor: '#f4f8f5', border: '1px solid #d6e6dc', borderRadius: '8px', padding: '16px 20px', textAlign: 'center' as const, margin: '8px 0 16px' }
const amountLabel = { fontSize: '12px', color: '#6b6f76', margin: '0 0 4px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }
const amountValue = { fontSize: '32px', fontWeight: 'bold', color: '#0a3d2c', margin: '0' }
const amountSub = { fontSize: '13px', color: '#55575d', margin: '4px 0 0' }
const fieldRow = { fontSize: '14px', color: '#222', lineHeight: '1.5', margin: '0 0 6px' }
const addressBlock = { fontSize: '14px', color: '#222', lineHeight: '1.5', margin: '0', whiteSpace: 'pre-line' as const }
const hr = { borderColor: '#e6e6e6', margin: '20px 0' }
const meta = { fontSize: '12px', color: '#999', margin: '16px 0 0' }
