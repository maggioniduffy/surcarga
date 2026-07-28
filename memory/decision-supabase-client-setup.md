---
name: decision-supabase-client-setup
description: Supabase JS clients live in src/lib/supabase/; Clerk owns sessions so the Supabase middleware/proxy helper is unwired.
metadata:
  type: project
---

Supabase JS was connected on 2026-07-28 (`@supabase/supabase-js` 2.110.9, `@supabase/ssr` 0.12.3) for project `knyudvcireraowxxqwnd`. Helpers live in `src/lib/supabase/client.ts` (browser), `server.ts` (takes an awaited `cookies()` store), and `proxy.ts` (`updateSession`, currently called by nothing). Keys are in `.env.local` as `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

**Why:** The Supabase quickstart puts these in a top-level `utils/supabase/` and wires a session-refresh middleware, but this project uses `src/` with the File Organization rules in `code-standards.md`, and authenticates with Clerk (see [[decision_auth_clerk]]) — not Supabase Auth. There are no Supabase auth cookies to refresh, so a root `proxy.ts` that calls `updateSession` would be dead weight that also collides with Clerk's own boundary handling.

**How to apply:** Use these clients for Supabase Storage and any direct `supabase-js` query only; structured data still goes through Prisma (`src/lib/db/client.ts`). When the Clerk↔Supabase Third-Party Auth connection is wired, pass the Clerk token to `createServerClient`/`createBrowserClient` via the `accessToken` option so RLS scoped by `auth.jwt()->>'sub'` resolves — see [[decision_role_model]]. Do not create a root `proxy.ts` for Supabase session refresh.
