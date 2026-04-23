CREATE TABLE public.invoice_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  license_type text NOT NULL CHECK (license_type IN ('individual','company')),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  billing_email text NOT NULL,
  phone text NOT NULL,
  billing_address text NOT NULL,
  seat_count integer NOT NULL DEFAULT 1,
  notes text,
  amount_usd integer NOT NULL,
  status text NOT NULL DEFAULT 'new'
);

ALTER TABLE public.invoice_requests ENABLE ROW LEVEL SECURITY;