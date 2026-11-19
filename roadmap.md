# Roadmap

- [x] Blog section: /blog index + /blog/$slug with 4 Kerala solar articles, JSON-LD, sitemap entries, nav link
- [x] Verify blog builds and renders
- [x] Dedicated Kerala landing page at /solar-company-kerala with useful content, LocalBusiness JSON-LD, sitemap + footer link
- [x] Diagnose and fix inquiry delivery to the external database, including a native form-submit fallback
- [x] Add admin inquiry delivery-status visibility and a secure retry action for unsynced leads
- [ ] Plan and migrate all Supabase-backed features (database, sign-in, photo files, and external inquiry copy) to Turso and Clerk; preserve records and keep the current setup intact until cutover is verified
- [ ] Connect the provided Turso database using a newly rotated token; the old token was shared in chat and must not be reused
- [ ] Confirm whether sign-in should use Clerk or a custom Turso-backed login before changing authentication
