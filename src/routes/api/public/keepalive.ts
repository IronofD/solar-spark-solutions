import { createFileRoute } from '@tanstack/react-router'

// Lightweight ping to the external Supabase project so its free-tier
// database never goes idle and gets paused. Schedule this URL to be
// called every few days (Cloud > Jobs).
const EXTERNAL_SUPABASE_REST = 'https://aihkehhgnssnvaogdonu.supabase.co/rest/v1/'
const EXTERNAL_SUPABASE_KEY = 'sb_publishable_juZytPp6ybGh58SrYme1sw_3VMbXc3G'

export const Route = createFileRoute('/api/public/keepalive')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const res = await fetch(`${EXTERNAL_SUPABASE_REST}inquiries?select=id&limit=1`, {
            headers: {
              apikey: EXTERNAL_SUPABASE_KEY,
              Authorization: `Bearer ${EXTERNAL_SUPABASE_KEY}`,
            },
          })
          return Response.json({ ok: res.ok, status: res.status, pingedAt: new Date().toISOString() })
        } catch (err) {
          return Response.json({ ok: false, error: String(err) }, { status: 502 })
        }
      },
    },
  },
})
