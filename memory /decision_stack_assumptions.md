---
name: decision-stack-assumptions
description: Supabase, Prisma, and MapLibre GL were assumed for Vaca Muerta Logística over the named alternatives, pending confirmation
metadata:
  type: decision
  project: project-vaca-muerta-logistica
---

Where the project description named two alternatives, these were picked as defaults: **Supabase** (Postgres+PostGIS, Auth, Storage) over Neon+Auth.js, **Prisma** over Drizzle as the ORM, and **MapLibre GL JS** over Leaflet for the map. Confirmed (not assumed): Next.js App Router + Tailwind, Mercado Pago as the primary payment processor, WhatsApp Business API as the primary notification channel, Vercel for hosting, and a modular monolith architecture (no microservices).

**Why:** Supabase was chosen to consolidate DB, Auth, and Storage into one provider instead of three. Prisma was chosen for migration tooling maturity. MapLibre was chosen for vector-tile styling flexibility that fits the dark/orange visual theme. None of these were explicitly locked in by the user — they're documented assumptions, not requirements.

**How to apply:** Treat these as the default to scaffold against unless the user says otherwise, but don't present them as settled decisions — they're flagged as open questions in `context/progress-tracker.md`. If the user confirms or changes any of them, update `context/architecture-context.md`, `context/code-standards.md`, and `context/progress-tracker.md` together, and update or remove this memory file so it doesn't go stale.
