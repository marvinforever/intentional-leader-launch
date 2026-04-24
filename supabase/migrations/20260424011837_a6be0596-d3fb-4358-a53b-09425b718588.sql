ALTER TABLE public.invoice_requests
  ADD COLUMN IF NOT EXISTS ap_contact_name text,
  ADD COLUMN IF NOT EXISTS ap_email text;