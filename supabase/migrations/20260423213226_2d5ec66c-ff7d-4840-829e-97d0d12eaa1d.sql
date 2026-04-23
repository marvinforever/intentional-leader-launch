CREATE POLICY "Deny all client access"
ON public.invoice_requests
AS RESTRICTIVE
FOR ALL
TO public
USING (false)
WITH CHECK (false);