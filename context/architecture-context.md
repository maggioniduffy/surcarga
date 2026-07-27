# Architecture Context

## Stack

| Layer | Technology | Role |
|---|---|---|
| Framework | Next.js (App Router) | Full-stack app: public marketing pages, authenticated dashboard, server actions/route handlers |
| UI / Styling | Tailwind CSS + shadcn/ui | Utility styling on top of CSS-variable design tokens; shadcn/ui for component primitives |
| Database | PostgreSQL + PostGIS, hosted on **Supabase** (assumption — Neon was the alternative named; Supabase chosen for its bundled Auth + Storage, reducing the number of separate providers) | Structured data (users, viajes, cargas, ubicaciones, postulaciones, payments) plus geospatial queries via PostGIS |
| ORM | **Prisma** (assumption — Drizzle was the alternative; Prisma chosen for migration tooling and ecosystem maturity) | Schema definition, migrations, typed queries |
| Auth | **Supabase Auth** (assumption — Auth.js was the alternative; chosen to pair with the Supabase Postgres instance and avoid a second identity system) | Two roles: `transportista`, `empresa` |
| File / Object Storage | **Supabase Storage** (assumption, follows from the Supabase pick) | Cargo photos, company logos, driver documents |
| Payments | Mercado Pago (primary, confirmed in description); Stripe (documented enterprise fallback only, not implemented unless requested) | Fixed listing fee charged to empresas when publishing a carga |
| Notifications | WhatsApp Business API (primary, confirmed — high priority per sector norms); Resend or Postmark (email fallback, provider **not yet finalized** — flag as open question) | Postulación, payment confirmation, and match events |
| Maps | **MapLibre GL JS** (assumption — Leaflet was the alternative; MapLibre chosen for vector-tile styling flexibility that better matches the dark/orange visual theme) | Rendering the region map with color-coded straight-line routes over a custom GeoJSON layer |
| Hosting | Vercel | Deployment target for the Next.js app |

## System Boundaries
- `app/(public)/` — landing page, search/browse (public-readable listings), marketing content. No auth required.
- `app/(auth)/` — sign up / sign in, role selection (transportista vs. empresa) at account creation.
- `app/(dashboard)/` — authenticated, role-gated area: publishing forms (Publicar Carga, Publicar Viaje), the dashboard itself, and detail views tied to the user's own listings or postulaciones.
- `app/api/` (or server actions where internal) — mutation endpoints, plus webhook receivers for Mercado Pago payment confirmation.
- No admin route group in this phase (see project-overview.md Out Of Scope).

## Storage Model
Structured, relational data — users, viajes, cargas, ubicaciones, postulaciones, payments — lives in Postgres (PostGIS-enabled for location/distance queries). Binary and large content — cargo photos, company logos, driver license/document uploads — lives in Supabase Storage and is referenced from Postgres rows by URL/key, never embedded as base64 in the database.

## Auth and Access Model
- Identity provider: Supabase Auth (assumption, confirm before scaffolding).
- Role is stored as an enum column on the `users` table: `transportista` | `empresa` | `admin`, set once at signup (or granted separately for `admin`, which is not a public self-signup option) and treated as immutable afterward.
- `admin` is a narrow role in this phase — its only granted capability is editing and deleting ubicaciones catalog entries (see Location Catalog Model below). It does not imply a broader back-office; see project-overview.md Out Of Scope.
- App-level enforcement: route-group gating in the dashboard area, checked via a **Server Layout Guard** — i.e., a `layout.tsx` in `app/(dashboard)/` that verifies the session server-side before rendering. (As of Next.js 16, `middleware.ts` has been renamed to `proxy.ts` and is intended for routing/rewrite concerns at the network boundary, not for holding authentication/session logic — auth checks belong in Server Components/layouts closer to the data layer. Verify this is still current before implementing.)
- Data-level enforcement: Postgres Row Level Security (RLS) policies scoped by `auth.uid()` and the `role` column, so a transportista can never read/write another user's cargas and vice versa, independent of what the app layer does. RLS on `ubicaciones` allows `insert` by any authenticated role but restricts `update`/`delete` to `role = 'admin'`.
- The specific claim/field path for role checks is `users.role`, joined against the authenticated session's user id — exact claim structure to confirm once Supabase Auth is wired up.

## Location Catalog Model
- **Input:** The ubicaciones catalog is seeded with base cities (Rincón de los Sauces, Cutral Có, Neuquén, Añelo, Centenario, Cipolletti, Catriel, El Chañar, Plottier) and known yacimientos (e.g. Loma Campana). Any authenticated user — transportista, empresa, or admin — can add a new yacimiento or ciudad (name + geographic coordinates) inline from the Publicar Carga / Publicar Viaje location picker when the one they need isn't listed.
- **Execution:** New entries are validated (name required, coordinates required and within a reasonable Vaca Muerta bounding box) and inserted immediately into the shared catalog — no approval gate blocks a user from using the location they just added. Editing or deleting an existing entry is restricted to `role = 'admin'` at the RLS layer, not just the app layer.
- **Output:** The catalog is shared across all users; a location added by one user is immediately available to everyone in the location picker and on the map. Admins can later correct or remove bad/duplicate entries without touching the users who created them.

## Trip Publishing Model
- **Input:** Transportista submits a viaje (origin, destination from the ubicaciones catalog, available capacity, travel dates).
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
3. All location data (yacimientos, bases, campamentos, towns) resolves to an entry in the Vaca Muerta ubicaciones catalog with PostGIS coordinates — free-text-only locations are not permitted for viajes or cargas. The catalog itself may be extended by any authenticated user, but existing entries can only be edited or deleted by `admin`.
4. Map route lines are drawn as straight GeoJSON LineStrings between catalog point coordinates — no external routing API is called at runtime.
5. `role` (`transportista` | `empresa` | `admin`) is immutable after signup/grant and gates both UI rendering and RLS policies; there is no shared or ambiguous role state. `admin` grants only ubicaciones-moderation capability, not implicit access to other users' cargas, viajes, or payments.
6. WhatsApp Business API is the primary channel for time-sensitive events (postulación, payment, match); email is a fallback and is never the only channel for those events.
7. The system remains a modular monolith inside a single Next.js project, organized by domain folder — no new services, workers, or separately deployable units are introduced without a documented architecture change.
