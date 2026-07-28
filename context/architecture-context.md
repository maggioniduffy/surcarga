# Architecture Context

## Stack

| Layer                 | Technology                                                                                                                                                               | Role                                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework             | Next.js (App Router)                                                                                                                                                     | Full-stack app: public marketing pages, authenticated dashboard, server actions/route handlers                                                       |
| UI / Styling          | Tailwind CSS + shadcn/ui                                                                                                                                                 | Utility styling on top of CSS-variable design tokens; shadcn/ui for component primitives                                                             |
| Database              | PostgreSQL + PostGIS, hosted on **Supabase** (confirmed — chosen for bundled Storage and geospatial-ready Postgres)                                                      | Structured data (users, viajes, cargas, ubicaciones, postulaciones, payments) plus geospatial queries via PostGIS                                    |
| ORM                   | **Prisma** (assumption — Drizzle was the alternative; Prisma chosen for migration tooling and ecosystem maturity)                                                        | Schema definition, migrations, typed queries                                                                                                         |
| Auth                  | **Clerk** (confirmed — replaces the earlier Supabase Auth assumption)                                                                                                    | Two roles: `carrier`, `shipper`, plus `admin`. Connected to Supabase via native Third-Party Auth (not the deprecated JWT-template integration) |
| File / Object Storage | **Supabase Storage** (confirmed, not Amazon/S3)                                                                                                                          | Cargo photos, company logos, driver documents                                                                                                        |
| Payments              | Mercado Pago (primary, confirmed in description); Stripe (documented enterprise fallback only, not implemented unless requested)                                         | Fixed listing fee charged to empresas when publishing a carga                                                                                        |
| Notifications         | WhatsApp Business API (primary, confirmed — high priority per sector norms); Resend or Postmark (email fallback, provider **not yet finalized** — flag as open question) | Postulación, payment confirmation, and match events                                                                                                  |
| Maps                  | **MapLibre GL JS** (assumption — Leaflet was the alternative; MapLibre chosen for vector-tile styling flexibility that better matches the dark/orange visual theme)      | Rendering the region map with color-coded straight-line routes over a custom GeoJSON layer                                                           |
| Hosting               | Vercel                                                                                                                                                                   | Deployment target for the Next.js app                                                                                                                |

## System Boundaries

- `app/(public)/` — landing page, search/browse (public-readable listings), marketing content. No auth required.
- `app/(auth)/` — sign up / sign in, role selection (transportista vs. empresa) at account creation.
- `app/(dashboard)/` — authenticated, role-gated area: publishing forms (Publicar Carga, Publicar Viaje), the dashboard itself, and detail views tied to the user's own listings or postulaciones.
- `app/api/` (or server actions where internal) — mutation endpoints, plus webhook receivers for Mercado Pago payment confirmation.
- No admin route group in this phase (see project-overview.md Out Of Scope).

## Storage Model

Structured, relational data — users, viajes, cargas, ubicaciones, postulaciones, payments — lives in Postgres (PostGIS-enabled for location/distance queries). Binary and large content — cargo photos, company logos, driver license/document uploads — lives in Supabase Storage and is referenced from Postgres rows by URL/key, never embedded as base64 in the database.

## Auth and Access Model

- Identity provider: **Clerk** (confirmed). Users authenticate through Clerk; Clerk owns the credential/session lifecycle, not Supabase Auth.
- Clerk connects to Supabase via native **Third-Party Auth** (the pre-2025 JWT-template integration is deprecated and not used). This lets Supabase verify Clerk-issued JWTs directly, primarily relevant for Storage access and any client-side `supabase-js` queries.
- Clerk user IDs are strings (`user_xxx`), not UUIDs. Any column referencing a Clerk user (`users.id`, `createdBy` on `locations`, etc.) must be `text`, not `uuid`. Postgres's `auth.uid()` helper returns a UUID and does **not** resolve Clerk identities — use `auth.jwt()->>'sub'` where RLS needs to check the Clerk user.
- A Clerk webhook (`user.created`/`user.updated`/`user.deleted`) syncs identity into the app's own `users` table in Postgres, where `role` (`carrier` | `shipper` | `admin`) lives as an app-owned column — Clerk does not store this role.
- Because role isn't known at the moment Clerk creates the identity, an **onboarding step** is required: after first sign-in, if the synced `users` row has no `role` set, the Server Layout Guard redirects to a role-selection screen (`app/(auth)/onboarding/`) before allowing access to `app/(dashboard)/`. This screen only offers a choice between `carrier` and `shipper` — `admin` is never selectable there. Role is written once and becomes immutable per the rule below.
- `admin` accounts are seeded directly (e.g. a seed script or a one-off manual grant/SQL update at app initialization), not through any public signup or onboarding flow. There is no in-app path for a user to become `admin`.
- Role is set once at signup (or granted separately for `admin`, which is not a public self-signup option) and treated as immutable afterward.
- `admin` is a narrow role in this phase — its only granted capability is editing and deleting locations catalog entries (see Location Catalog Model below). It does not imply a broader back-office; see project-overview.md Out Of Scope.
- App-level enforcement: route-group gating in the dashboard area, checked via a **Server Layout Guard** — i.e., a `layout.tsx` in `app/(dashboard)/` that verifies the Clerk session server-side before rendering. (As of Next.js 16, `middleware.ts` has been renamed to `proxy.ts`; Clerk's own middleware for route protection typically still runs at that boundary for redirect purposes, but the authoritative session/role check for data access happens closer to the data layer, not solely in `proxy.ts`. Verify current Clerk + Next.js 16 integration docs before implementing.)
- **Data-level enforcement is split, and this is a real architectural nuance, not just config:** the app's primary data access path is **Prisma with a direct Postgres connection** (`DATABASE_URL`/`DIRECT_URL`), which runs as a privileged Postgres role and does **not** automatically evaluate Clerk-JWT-based RLS policies the way `supabase-js`/PostgREST does. This means:
  - Ownership and role checks for viajes, cargas, and postulaciones must be enforced explicitly in the server action / route handler before any Prisma write or sensitive read — this is the primary authorization layer, not a fallback.
  - RLS policies on Postgres (scoped by `auth.jwt()->>'sub'` and `role`) remain valuable as defense-in-depth specifically where a client-side Supabase call can happen directly (e.g. Storage uploads/downloads), and should still be defined on `locations` (`insert` open to any authenticated role, `update`/`delete` restricted to `role = 'admin'`) in case that table is ever queried via `supabase-js` instead of Prisma.
  - Do not assume RLS alone protects a Prisma-backed table — treat it as a secondary control, not the control.

## Location Catalog Model

- **Input:** The locations catalog is seeded with base cities (Rincón de los Sauces, Cutral Có, Neuquén, Añelo, Centenario, Cipolletti, Catriel, El Chañar, Plottier) and known yacimientos (e.g. Loma Campana). Any authenticated user — transportista, empresa, or admin — can add a new yacimiento or ciudad (name + geographic coordinates) inline from the Publicar Carga / Publicar Viaje location picker when the one they need isn't listed.
- **Execution:** New entries are validated (name required, coordinates required and within a reasonable Vaca Muerta bounding box) and inserted immediately into the shared catalog — no approval gate blocks a user from using the location they just added. Editing or deleting an existing entry is restricted to `role = 'admin'` at the RLS layer, not just the app layer.
- **Output:** The catalog is shared across all users; a location added by one user is immediately available to everyone in the location picker and on the map. Admins can later correct or remove bad/duplicate entries without touching the users who created them.

## Trip Publishing Model

- **Input:** Transportista submits a viaje (origin, destination from the locations catalog, available capacity, travel dates).
- **Execution:** Viaje is validated and stored immediately (no payment gate); indexed for search against open cargas by route/location proximity.
- **Output:** Viaje appears in search results and the transportista's dashboard; visible to empresas browsing for capacity.

## Cargo Publishing & Payment Model

- **Input:** Empresa submits a carga (origin, destination, cargo description, needed dates, urgency flag) and initiates the fixed listing fee payment.
- **Execution:** Carga is created in a `pending_payment` state; Mercado Pago checkout is launched; a webhook confirms payment.
- **Output:** Only on webhook-confirmed payment does the carga transition to `published` and become publicly searchable; if payment fails or is abandoned, the carga stays hidden.

## Matching & Postulación Model

- **Input:** A transportista (or empresa) initiates contact on a published carga/viaje pair via a postulación action.
- **Execution:** Postulación record is created linking the two listings; a notification event is emitted.
- **Output:** Both parties see the postulación in their respective dashboards; the receiving party gets a WhatsApp notification (email fallback).

## Notification Model

- **Input:** Domain events — new postulación, payment confirmed, match confirmed.
- **Execution:** Event triggers a WhatsApp Business API message to the relevant user; if WhatsApp delivery fails or the user has no WhatsApp on file, an email fallback fires via the email provider.
- **Output:** User is notified outside the app, matching how the sector actually communicates.

## Invariants

1. A carga is never publicly searchable before its listing fee payment is confirmed via the Mercado Pago webhook — no client-side or optimistic "publish" path exists.
2. Transportistas are never charged to publish a viaje or to contact an empresa; no commission logic exists anywhere in the payment layer.
3. All location data (yacimientos, bases, campamentos, towns) resolves to an entry in the Vaca Muerta locations catalog with PostGIS coordinates — free-text-only locations are not permitted for viajes or cargas. The catalog itself may be extended by any authenticated user, but existing entries can only be edited or deleted by `admin`.
4. Map route lines are drawn as straight GeoJSON LineStrings between catalog point coordinates — no external routing API is called at runtime.
5. `role` (`carrier` | `shipper` | `admin`) is immutable after signup/grant and gates both UI rendering and RLS policies; there is no shared or ambiguous role state. `admin` grants only locations-moderation capability, not implicit access to other users' cargos, trips, or payments.
6. WhatsApp Business API is the primary channel for time-sensitive events (postulación, payment, match); email is a fallback and is never the only channel for those events.
7. The system remains a modular monolith inside a single Next.js project, organized by domain folder — no new services, workers, or separately deployable units are introduced without a documented architecture change.
