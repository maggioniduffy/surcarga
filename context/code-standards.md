# Code Standards

## General

- Keep modules focused and small — if a file is doing more than one job (e.g. a form component that also contains matching logic), split it.
- Fix the root cause of a bug, not the symptom — don't patch around a broken invariant.
- Single responsibility per file/component/function; name things after what they do.
- Every implementation decision defers to `architecture-context.md` — if a change would contradict a stated invariant or model, stop and resolve it there first, don't route around it in code.
- ALL CODE AND FILES MUST BE WRITTEN IN ENGLISH
- UI LANGUAGE: SPANISH

## TypeScript

- Strict mode on; `any` is not allowed — use `unknown` plus narrowing, or a proper generic/type.
- Validate all external input (form submissions, webhook payloads, route handler bodies) at the boundary with a schema library (Zod recommended, pairs cleanly with Prisma + server actions).
- Naming: camelCase for variables/functions, PascalCase for components/types/interfaces.
- Prefer `interface` for object shapes that may be extended (e.g. a `Cargo` base shape used across variants); use `type` for unions, intersections, and aliases.
- Domain types should be sourced from the Prisma schema (generated Prisma Client types) as the source of truth, not hand-duplicated — hand-written types are for shapes that don't map 1:1 to a database table (e.g. API response DTOs, form state).

## Next.js (App Router)

- Server Components are the default; mark a component `'use client'` only when it needs interactivity — forms, the map, search filters, dashboard tabs.
- **Routing/file conventions — verify against current Next.js docs before scaffolding.** As of Next.js 16, `middleware.ts` has been renamed to `proxy.ts`, and the framework's own guidance is to keep authentication/session logic out of that file — `proxy.ts` is for routing-boundary concerns (rewrites, redirects, headers), while auth gating should live in Server Layout Guards, i.e. a `layout.tsx` in the protected route group (`app/(dashboard)/layout.tsx`) that checks the session server-side before rendering children. Confirm this is still accurate for the Next.js version actually installed before implementing.
- Auth gating therefore lives in the dashboard's server layout, not scattered across individual page components, and not in `proxy.ts`.
- Route handlers (`app/api/**/route.ts`) and server actions stay thin — parse/validate input, call into `lib/services/`, return a response. No business logic inline in the handler.

## Styling

- Use CSS custom property tokens only — colors, radii, and spacing come from variables (e.g. `--color-status-published-bg`, `--font-display`), never raw hardcoded hex values or ad hoc utility classes like `text-orange-500` for brand color.
- **Verify current Tailwind version before scaffolding.** If Tailwind v4 is in use, theme tokens are defined in CSS via the `@theme` directive in the global stylesheet, not in a `tailwind.config.js` file — confirm the installed major version before writing config.
- Reference the border-radius scale defined in `ui-context.md`; don't invent new radius values ad hoc.
- All user-facing copy is Spanish and lives in content/dictionary files (see ui-context.md, Content Language) — never hardcode Spanish strings directly inside a component.

## API / Data Mutation Routes

- All mutations are validated (Zod) at the boundary before touching the database.
- Auth and ownership are enforced before any write: confirm the session, confirm the role matches the action (e.g. only `shipper` can publish a cargo), confirm the acting user owns the resource being modified.
- Prefer Next.js Server Actions for internal form mutations that originate from the app itself (Publicar Carga, Publicar Viaje, postulación creation). Use Route Handlers for anything that needs a stable external HTTP endpoint — the Mercado Pago payment webhook and any outbound WhatsApp/email integration triggers.
- Handlers and actions stay thin; validation and business rules live in `lib/services/`.

## Data and Storage

- Structured entities — `users`, `trips`, `cargos`, `locations`, `applications`, `payments` — live in Postgres via the ORM; no structured entity is stored as unstructured JSON blobs without reason.
- Binary/large content — cargo photos, company logos, driver documents — lives in object storage (Supabase Storage per the current assumption) and is referenced from a Postgres column by URL/key; never embed binary content as base64 in the database.
- Authorization is enforced in app code: verify the Clerk session, `users.role`, and record ownership in the server action or route handler before any Prisma read/write. Prisma connects as a privileged role and bypasses RLS, so RLS is never the enforcement layer for Prisma-backed tables. Where RLS does apply (Storage buckets, direct `supabase-js` queries), scope policies by `auth.jwt()->>'sub'` and `role` — `auth.uid()` does not resolve a Clerk subject. See architecture-context.md, Auth and Access Model.

## File Organization

- `app/(public)/` — landing, search/browse, other unauthenticated pages.
- `app/(auth)/` — sign up, sign in, role selection.
- `app/(dashboard)/` — authenticated, role-gated views (includes the server layout guard).
- `app/api/` — route handlers for webhooks and external-integration endpoints.
- `lib/services/` — business logic: matching, payments, notifications.
- `lib/db/` — schema, migrations, query helpers.
- `components/ui/` — shadcn/ui primitives (protected, not hand-modified).
- `components/{domain}/` — composed domain components (e.g. `components/cargo/cargo-card.tsx`, `components/trip/trip-form.tsx`). Directory and file names are English, per the General rules above, matching the Prisma models (`Cargo`, `Trip`).
- `content/` or `lib/i18n/` — Spanish copy/dictionary files. Only the copy is Spanish: keys, option `value`/`id` slugs and file names are English.
- Name files after the responsibility they contain, not the technology behind them.
