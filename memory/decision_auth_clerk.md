---
name: decision-auth-clerk
description: Auth is Clerk, not Supabase Auth — connected via native Third-Party Auth, with app-level checks as the primary authorization layer since Prisma bypasses RLS
metadata:
  type: decision
  project: project-vaca-muerta-logistica
---

Authentication is **Clerk**, confirmed by the user — this replaces the earlier assumed Supabase Auth. Clerk connects to Supabase via the native **Third-Party Auth** integration (the old JWT-template integration is deprecated since April 2025). Clerk user IDs are strings (`user_xxx`), so any column referencing a user must be `text`, not `uuid`, and Postgres's `auth.uid()` doesn't resolve them — use `auth.jwt()->>'sub'` in RLS instead. A Clerk webhook syncs identity into the app's own `users` table, where `role` lives as an app-owned column.

**Why:** The app's primary data access path is Prisma with a direct Postgres connection, which runs as a privileged role and does not automatically evaluate Clerk-JWT-based RLS the way `supabase-js`/PostgREST does. RLS still protects Storage access and any direct client-side Supabase queries, but it is not a safety net for Prisma-backed tables.

**How to apply:** Treat app-level checks (Clerk session + role + ownership, verified in the server action/route handler before any Prisma write) as the primary authorization control for trips, cargos, locations, applications, and payments — not RLS. Still define RLS on `locations` and on Storage buckets as defense-in-depth. Full detail in `context/architecture-context.md` → Auth and Access Model.
