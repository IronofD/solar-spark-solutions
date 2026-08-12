ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS service_type text,
  ADD COLUMN IF NOT EXISTS monthly_bill text;