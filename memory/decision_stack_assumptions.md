---
name: decision-stack-assumptions
description: Prisma and MapLibre GL remain assumptions for Surcarga; Supabase (DB + Storage), Clerk auth, and the rest of the stack are confirmed
metadata:
  type: decision
  project: project-vaca-muerta-logistica
---

Where the project description named two alternatives, these were picked as defaults and remain assumptions: **Prisma** over Drizzle as the ORM, and **MapLibre GL JS** over Leaflet. Confirmed (not assumed): Next.js App Router + Tailwind, **Supabase** as the Postgres+PostGIS host over Neon, **Clerk** for authentication, **Supabase Storage** (not Amazon/S3), Mercado Pago as the primary payment processor, WhatsApp Business API as the primary notification channel, Vercel for hosting, and a modular monolith architecture (no microservices).

**Why:** Supabase was chosen to consolidate DB and Storage into one provider — note the original "bundles Auth too" rationale lapsed once auth moved to Clerk, but the pick stands on Storage + geospatial-ready Postgres. Prisma was chosen for migration tooling maturity. MapLibre was chosen for vector-tile styling flexibility that fits the dark/orange visual theme. Clerk and Supabase Storage were explicit user decisions, not assumptions — see `decision_auth_clerk.md` for the auth-specific implications.

**How to apply:** Prisma and MapLibre are still the default to scaffold against unless the user says otherwise, and remain the only stack picks still flagged as open questions in `context/progress-tracker.md`. Auth and Storage are settled — don't re-litigate them. If Prisma or MapLibre get confirmed or changed, update `context/architecture-context.md`, `context/code-standards.md`, `context/progress-tracker.md`, and this memory file together.
