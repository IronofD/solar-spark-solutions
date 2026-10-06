ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS external_sync_status text NOT NULL DEFAULT 'unknown',
  ADD COLUMN IF NOT EXISTS external_sync_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS external_synced_at timestamptz,
  ADD COLUMN IF NOT EXISTS external_sync_error text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'inquiries_external_sync_status_check'
      AND conrelid = 'public.inquiries'::regclass
  ) THEN
    ALTER TABLE public.inquiries
      ADD CONSTRAINT inquiries_external_sync_status_check
      CHECK (external_sync_status IN ('unknown', 'pending', 'synced', 'failed'));
  END IF;
END
$$;