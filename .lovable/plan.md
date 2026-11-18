# Replace Supabase across Java Solar Solutions

## Goal
Move the website's app data, inquiry copies, admin access, and project-photo files off Supabase. Use Turso for app records and photo bytes, and Clerk for sign-in. Keep the current services and data unchanged until the replacement is connected and verified.

## Rollout
1. **Prepare the new services.** Set up Turso and Clerk credentials securely; do not put private credentials in the website code. Confirm the live databases can be reached before changing the app.
2. **Preserve existing data.** Copy inquiry history, gallery records, and any existing project photos. Link photo bytes and gallery records by stable IDs. Keep the old data intact until migrated counts and representative records match.
3. **Replace app connections.** Move public gallery reads, admin gallery edits, inquiry submissions, inquiry status/retries, role checks, and MCP inquiry/gallery access to the new setup. Keep admin-only actions protected by a server-verified Clerk identity and admin assignment.
4. **Move sign-in.** Replace the Supabase sign-in and session checks with Clerk. Existing Supabase passwords cannot be carried over as passwords; the existing admin will need to be established in Clerk, and any other users will need to sign in or reset their passwords there.
5. **Move photo uploads.** Store project photos as Turso BLOB data, served through an app endpoint. BLOB files are read or written whole rather than streamed, so the upload will need a practical file-size limit and image compression; very large images may be rejected.
6. **Verify before cutover.** Check public gallery reads, admin sign-in and permissions, create/edit/delete project flows, photo upload/display, inquiries, retries, and MCP behavior. Do not delete or disable old data/services until these checks pass.
7. **Retire Supabase usage.** After verification, remove Supabase calls and the external-database keep-alive job, then confirm the site no longer depends on Supabase.

## Technical approach
- Use a Worker-compatible Turso client with server-only database URL and access token; keep all reads/writes inside server functions or server routes.
- Use Clerk's TanStack Start middleware and server-side identity verification. Store admin authorization separately from user-editable profile fields.
- Represent photo files as bounded BLOBs in Turso, with metadata and gallery references in the same database.
- Rework or preserve the MCP OAuth flow only if it can be securely moved off Supabase; verify compatibility before retiring its existing authorization service.
- Add focused checks for inquiry persistence and admin-only retry authorization.

## Dependencies and limits
- The migration needs Turso database credentials and Clerk application keys, entered through secure connection/secret forms after the new code path is ready.
- An admin must be identified in Clerk during setup. Existing user passwords are not portable from Supabase Auth.
- Turso is not object storage; keeping image bytes in the database trades simpler single-service storage for larger database transfers and memory use. The file-size limit should be confirmed before large-image uploads are enabled.
- No provider credentials, records, accounts, or scheduled jobs will be changed or deleted until the replacement is verified.
