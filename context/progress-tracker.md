# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

Phase 0 — scaffolding. No product features (search, matching, payments, map, notifications) implemented yet; those are separate units per `ai-workflow-rules.md`.

## Current Goal

Get a working Next.js + TypeScript + Tailwind + shadcn/ui project with the base Prisma data model in place and the location catalog seeded, so feature units can start on solid ground.

## Completed

- Confirmed actual installed versions against `node_modules` (not assumed): Next.js 16.2.12 (App Router, `src/` dir, Turbopack), Tailwind CSS v4.3.3, TypeScript, Prisma 7.9.1. See [[decision-stack-versions]].
- Confirmed `proxy.ts` is the current Next.js 16 convention (not `middleware.ts`) by reading `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md` — no `proxy.ts` written yet since there's no auth logic to route yet.
- Applied the dark-only theme direction from `ui-context.md` to `src/app/globals.css` and `src/app/layout.tsx`: brand orange (`#FF5A1F`/`#FF7038`), status color tokens (published/confirmed/pending/urgent/featured, route density), Archivo (`--font-display`) + IBM Plex Sans (`--font-body`) via `next/font/google`, `lang="es"`, `dark` class always applied (no toggle).
- Installed and initialized shadcn/ui (`components.json`, style `base-nova`, `components/ui/button.tsx` generated). Wired its generated font/color variables into the project's own token names rather than leaving duplicate Geist fonts.
- Created the folder structure from `code-standards.md` File Organization: `app/(public)` (holds the landing page, moved from `app/page.tsx`), `app/(auth)`, `app/(dashboard)`, `app/api`, `lib/services`, `lib/db`, `components/ui`, `content` (empty dirs hold `.gitkeep`).
- Wrote `prisma/schema.prisma` with the six base entities (`User`, `Ubicacion`, `Viaje`, `Carga`, `Postulacion`, `Payment`) per `architecture-context.md` — data model only, no business logic. Required moving to Prisma 7's driver-adapter pattern; see [[decision-prisma7-driver-adapter]]. A few structural fields/enums weren't literally specified and are flagged in [[decision-schema-assumptions]] and below.
- Created `src/lib/db/client.ts` (Prisma Client singleton with `@prisma/adapter-pg`) and `prisma/seed.ts` (idempotent `upsert` seed for the ubicaciones catalog), wired via `prisma.config.ts` `migrations.seed`.
- Verified end-to-end against a throwaway local Postgres+PostGIS Docker container (user-approved, then torn down): `prisma migrate dev` created and applied `prisma/migrations/20260727223516_init`, `prisma db seed` inserted all 9 base cities and Loma Campana correctly. `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass.

## In Progress

Nothing actively in progress — phase 0 scaffolding is done pending the open questions below.

## Next Up

- Pick the next unit per `ai-workflow-rules.md` scoping rules (e.g. auth/role signup flow, or the ubicaciones "add inline while publishing" flow) — needs a user decision on priority.
- Provision a real Postgres+PostGIS database (Supabase or otherwise, see Open Questions) and point `DATABASE_URL` at it; `.env` currently holds the original placeholder connection string.
- Wire actual auth (Supabase Auth assumed, unconfirmed) before building any `app/(dashboard)/layout.tsx` Server Layout Guard.

## Open Questions
- ORM: Prisma was assumed over Drizzle in architecture-context.md — confirm.
- Database host: Supabase was assumed over Neon (bundles Auth + Storage) — confirm.
- Auth provider: Supabase Auth was assumed over Auth.js, to pair with the Supabase Postgres pick — confirm.
- Map library: MapLibre GL JS was assumed over Leaflet — confirm.
- File/object storage provider: assumed Supabase Storage as a consequence of the Supabase pick — confirm.
- Email fallback provider: Resend vs. Postmark not yet chosen.
- Exact fixed listing fee amount and currency (ARS presumably) for a carga publication — not specified in the source description.
- Stripe fallback: scope and trigger conditions undefined; not to be implemented until explicitly requested.
- Seed list confirmed for the base cities (Rincón de los Sauces, Cutral Có, Neuquén, Añelo, Centenario, Cipolletti, Catriel, El Chañar, Plottier) and yacimientos like Loma Campana; the catalog is otherwise extensible by any authenticated user at publish time. Still open: the fuller starting list of yacimientos/bases/campamentos beyond Loma Campana, if one exists, so the catalog doesn't launch nearly empty on the yacimiento side.
- How `admin` accounts are created/granted (no public self-signup implied) — manual DB grant, a separate invite flow, or something else — not yet specified.
- Whether new user-added ubicaciones need any lightweight duplicate/typo check before insert (e.g. "Loma Campana" vs "Loma la Campana") or whether that's left entirely to admin cleanup after the fact.
- ~~Exact Next.js, Tailwind, and Prisma versions to pin~~ — resolved, see [[decision-stack-versions]]: Next.js 16.2.12, Tailwind v4.3.3, Prisma 7.9.1.
- `Postulacion` status values (`pending`/`confirmed`/`rejected`) were invented for the initial schema — architecture-context.md's Matching & Postulación Model doesn't specify a state machine, only that a record is created and a notification fires. Needs confirmation before the postulación flow is built. See [[decision-schema-assumptions]].
- `Carga` status values beyond `pending_payment`/`published` (`confirmed`, `completed`) were inferred from the Core User Flow narrative, not stated as an explicit enum in architecture-context.md. Needs confirmation. See [[decision-schema-assumptions]].
- The "Destacada" (featured) badge in `ui-context.md`'s status color system has no backing field or business rule anywhere in `architecture-context.md` or `project-overview.md` — unclear if it's a paid upsell, an algorithmic flag, or purely presentational. Not modeled in the schema.
- `Ubicacion.type` (ciudad vs. yacimiento) and the `Postulacion` requirement that both `viajeId` and `cargaId` be present (no support yet for the "direct contact" case mentioned in project-overview.md) are both schema-level assumptions — see [[decision-schema-assumptions]].
- No real Postgres/PostGIS database is provisioned yet — `.env` holds a placeholder `DATABASE_URL`; schema/migration/seed were only verified against a throwaway local Docker container that was torn down afterward.

## Architecture Decisions
- Assumed Supabase as a single cohesive provider for Postgres+PostGIS, Auth, and Storage, over a Neon + Auth.js split — reduces the number of separate systems to integrate; flagged for confirmation.
- Assumed Prisma as the ORM over Drizzle, for migration tooling and ecosystem maturity; flagged for confirmation.
- Assumed MapLibre GL JS over Leaflet for the map, for better vector-tile styling flexibility matching the dark/orange theme; flagged for confirmation.
- Theme is dark-only, no toggle, matching the Vaquia design benchmark and the delivered `.dc.html` screens (near-black background, `#FF5A1F` orange accent).
- Role (`transportista` | `empresa`) is stored as a single enum column on `users`, set once at signup and treated as immutable.
- Confirmed as a modular monolith inside a single Next.js project, organized by domain — no microservices at this stage.
- Fixed fee per carga listing, paid before the listing becomes searchable; drivers never pay to publish or contact; no commission taken on freight.
- Auth gating for the dashboard route group is placed in a Server Layout Guard (`app/(dashboard)/layout.tsx`), not in `proxy.ts` — see Session Notes below for why.
- Added a narrow `admin` role (third value on `users.role`) whose only granted capability is editing/deleting ubicaciones catalog entries — not a general back-office role. The ubicaciones catalog is open-write (any authenticated user can add a missing location while publishing) but admin-only for edit/delete, enforced at the RLS layer.

## Session Notes
Generated 2026-07-27. Framework/tooling notes to verify against the actual installed versions before scaffolding:
- **Next.js 16** renamed `middleware.ts` to `proxy.ts`; the framework's own guidance is that `proxy.ts` handles routing-boundary concerns (rewrites, redirects, headers) and should not hold authentication/session logic — auth checks belong in Server Components/layouts closer to the data layer (a "Server Layout Guard" pattern). This was a deliberate response to real middleware-based auth-bypass vulnerabilities in earlier versions. Confirm the installed Next.js version actually matches this convention before writing routing/auth code.
- **Tailwind CSS v4** replaces `tailwind.config.js` with CSS-first configuration via the `@theme` directive directly in the global stylesheet. If v4 is confirmed as the installed version, design tokens (colors, fonts, radii) should be defined there, not in a JS config file.
- Six screens were referenced from the provided design export: Landing, Buscar Camiones (search/browse), Detalle Viaje (trip detail), Publicar Carga, Publicar Viaje, Dashboard. Observed and carried into `ui-context.md`: brand orange `#FF5A1F` (hover `#FF7038`), Archivo for display type, IBM Plex Sans for body, radii clustering at 6–10px (controls) and 12–16px (cards), and status badges for Publicado / Urgente / Destacada.
