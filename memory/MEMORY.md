# Memory Index

Short, atomic facts and decisions for quick recall across sessions. These never override
the files in `context/` — if a memory file and a context file disagree, `context/` wins
and the memory file is stale and should be corrected or removed.

## Project

- [Project: Vaca Muerta Logística](project_vaca_muerta_logistica.md) — two-sided marketplace connecting transportistas and oil & gas empresas in Vaca Muerta; scaffolded as the npm package `surcarga` at the repo root.

## Stack and infrastructure

- [Stack assumptions](decision_stack_assumptions.md) — only Prisma and MapLibre GL are still assumptions; Supabase (DB + Storage), Clerk, Mercado Pago, WhatsApp, and Vercel are confirmed.
- [Stack versions](decision_stack_versions.md) — confirmed installed: Next.js 16.2.12, Tailwind v4.3.3, Prisma 7.9.1.
- [Prisma 7 driver adapter](decision_prisma7_driver_adapter.md) — Prisma 7 requires `@prisma/adapter-pg`; no `datasource url` in `schema.prisma`, connection lives in `prisma.config.ts` and the client constructor.
- [Supabase client setup](decision-supabase-client-setup.md) — clients live in `src/lib/supabase/`; the session-refresh proxy helper is intentionally unwired because Clerk owns sessions.
- [Auth is Clerk](decision_auth_clerk.md) — Clerk via Supabase's native Third-Party Auth; app-level session/role/ownership checks are the primary authorization layer because Prisma bypasses RLS.
- [Clerk ↔ Next.js wiring](decision-clerk-nextjs-integration.md) — `@clerk/nextjs` v7 installed; `proxy.ts` needs `/__clerk/:path*`, auth pages live in `app/(auth)/`, and v7 uses `<Show when=...>` instead of `SignedIn`/`SignedOut`.

## Data model

- [English domain naming](decision-english-domain-naming.md) — the schema was renamed to English on 2026-07-28 (`Trip`, `Cargo`, `Location`, `Application`, `carrier`/`shipper`) via a hand-written data-preserving RENAME migration.

- [Role model](decision_role_model.md) — `users.role` is `carrier` | `shipper` | `admin`, immutable after signup/grant; `admin` is scoped only to locations moderation.
- [Locations catalog](decision_locations_catalog.md) — any authenticated user can add a location; only `admin` can edit or delete one.
- [Locations stay in one table](decision-locations-single-table.md) — cities and yacimientos share `locations` via `LocationType`; `Loma La Lata` added to the seed and both maps project from real coordinates.
- [Form taxonomies are unbacked](open-form-taxonomies-unbacked.md) — tipo de carga, requisitos, flexibilidad, carga/descarga and recurrence days render as controls with no Prisma column; schema + migration owed.
- [Schema assumptions](decision_schema_assumptions.md) — enum values and structural fields invented in `prisma/schema.prisma` that the context files don't literally specify; flagged for confirmation.

## Product scope

- [No geolocation tracking](decision-no-geolocation-tracking.md) — position/ETA/live tracking is permanently deleted from the product, not deferred.
- [AI matcher deferred](decision-ai-matcher-deferred.md) — matching is search + filters for now; the AI matcher must not appear anywhere in the app.

## Screens

- [No sample data on the screens](decision-blank-content-no-sample-data.md) — every screen is a prop-driven shell with empty states; `src/content/es/` holds copy only, never records.
- [Inline scripts go through `<InlineScript>`](decision-inline-script-wrapper.md) — a bare `<script>` in a component makes React error; the wrapper is `text/javascript` on the server, inert `text/plain` on the client.
- [Locations degrade when the DB is unreachable](decision-locations-degrade-when-db-unreachable.md) — `listLocations()` returns `[]` on Prisma connection errors so the catalog screens render empty states instead of 500ing; temporary, revisit once Supabase is live.
- [Light theme + no ES/EN toggle](decision-light-theme.md) — dark-only was reversed on 2026-07-28; dark stays the default, only the surface/line/ink scales flip, and fixed-dark panels need `on-dark-panel`.
- [App screens design source](decision-app-screens-design-source.md) — panel, publicar carga/viaje, buscar camiones and detalle viaje are ports of Claude Design artifacts, made responsive; the theme toggle, "CargaSur", ETA copy and match/compatibility language were deliberately dropped.
- [Landing design source](decision-landing-design-source.md) — the landing page is a port of a delivered Claude Design artifact; brand is Surcarga, never "CargaSur".
- [Landing copy scope conflicts](open-landing-copy-scope-conflicts.md) — ported copy still advertises USD pricing, verification claims, and invented stats/testimonials the context files don't back (tracking and AI matching are now resolved).
