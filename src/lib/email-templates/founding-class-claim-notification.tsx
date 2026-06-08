import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  company_name?: string
  contact_name?: string
  email?: string
  phone?: string
  position?: string
  claim_type?: string
  amount_usd?: number
  leaders_count?: number
  note?: string | null
  record_id?: string
  received_at?: string
}

const FoundingClassClaimNotification = ({
  company_name = 'Unknown',
  contact_name = 'Unknown',
  email = '',
  phone = '',
  position = '',
  claim_type = '',
  amount_usd = 0,
  leaders_count = 0,
  note,
  record_id,
  received_at,
}: Props) => {
  const formattedAmount = `$${amount_usd.toLocaleString('en-US')}`
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{`Founding Class Claim: ${company_name} (${formattedAmount})`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Founding Class Claim</Heading>
          <Text style={subtitle}>The Inaugural Offering</Text>

          <Section style={amountBox}>
            <Text style={amountLabel}>{claim_type}</Text>
            <Text style={amountValue}>{formattedAmount}</Text>
            <Text style={amountSub}>{position}</Text>
          </Section>

          <Hr style={hr} />
          <Heading as="h2" style={h2}>Contact</Heading>
          <Text style={fieldRow}><strong>Company:</strong> {company_name}</Text>
          <Text style={fieldRow}><strong>Name:</strong> {contact_name}</Text>
          <Text style={fieldRow}><strong>Email:</strong> {email}</Text>
          <Text style={fieldRow}><strong>Phone:</strong> {phone}</Text>
          <Text style={fieldRow}><strong>Leaders they'll bring:</strong> {leaders_count}</Text>

          {note ? (
            <>
              <Heading as="h2" style={h2}>Note</Heading>
              <Text style={addressBlock}>{note}</Text>
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
  component: FoundingClassClaimNotification,
  subject: (data: Record<string, any>) =>
    `Founding Class Claim — ${data.company_name ?? 'Unknown'} ($${(data.amount_usd ?? 0).toLocaleString('en-US')}) — ${data.claim_type ?? ''}`,
  displayName: 'Founding Class claim notification',
  to: 'mark@themomentumcompany.com',
  previewData: {
    company_name: 'Acme Ag Co.',
    contact_name: 'Jane Smith',
    email: 'jane@acme-ag.com',
    phone: '555-123-4567',
    position: 'Founding Lead Sponsor — $50,000',
    claim_type: 'Pledge / name my number',
    amount_usd: 42000,
    leaders_count: 12,
    note: 'Looking forward to it!',
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