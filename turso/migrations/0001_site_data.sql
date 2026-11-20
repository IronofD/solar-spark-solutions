CREATE TABLE IF NOT EXISTS case_studies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  customer_type TEXT NOT NULL DEFAULT 'home' CHECK (customer_type IN ('home', 'business')),
  system_size TEXT NOT NULL DEFAULT '',
  savings TEXT NOT NULL DEFAULT '',
  bill_before TEXT NOT NULL DEFAULT '',
  bill_after TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  highlights TEXT NOT NULL DEFAULT '[]',
  before_image_url TEXT NOT NULL DEFAULT '',
  after_image_url TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1 CHECK (published IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  location TEXT,
  service_type TEXT,
  monthly_bill TEXT,
  message TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  external_sync_status TEXT NOT NULL DEFAULT 'unknown' CHECK (external_sync_status IN ('unknown', 'pending', 'synced', 'failed')),
  external_sync_attempts INTEGER NOT NULL DEFAULT 0,
  external_synced_at TEXT,
  external_sync_error TEXT
);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries(created_at DESC);

CREATE TABLE IF NOT EXISTS admin_roles (
  clerk_user_id TEXT PRIMARY KEY,
  role TEXT NOT NULL CHECK (role = 'admin'),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS photo_files (
  path TEXT PRIMARY KEY,
  content_type TEXT NOT NULL,
  data BLOB NOT NULL,
  byte_length INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);