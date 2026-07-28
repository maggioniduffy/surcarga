---
name: decision-clerk-nextjs-integration
description: How Clerk is physically wired into the Next.js 16 app — proxy.ts matcher, (auth) route group, Clerk 7's Show component, and the shadcn appearance theme
metadata:
  type: project
---

Clerk's Next.js SDK (`@clerk/nextjs` ^7.6.2) was installed on 2026-07-28 via `clerk init --app app_3H8dGU87HriHzGYnxZTtPct23lh`, linked to the Clerk application **"Sur Carga"** (development instance only; production is not configured). Concrete wiring:

- `src/proxy.ts` runs `clerkMiddleware()`. Its `config.matcher` must keep `"/__clerk/:path*"` listed **after** `"/(api|trpc)(.*)"` — this is Clerk's auto-proxy path and the CLI does not add it. This is a routing boundary only; it is **not** the authorization layer (see [[decision-auth-clerk]]).
- Sign-in/sign-up pages are catch-all routes moved into the documented `app/(auth)/` group: `src/app/(auth)/sign-in/[[...sign-in]]/` and `.../sign-up/[[...sign-up]]/`. `clerk init` scaffolds them at the app root instead; route groups don't change URLs, so `/sign-in` and `/sign-up` still match the `NEXT_PUBLIC_CLERK_SIGN_{IN,UP}_URL` values written to `.env.local`.
- **Clerk 7 replaced `<SignedIn>`/`<SignedOut>` with `<Show when="signed-in">` / `<Show when="signed-out">`.** Don't reach for the old components from memory.
- `ClerkProvider` sits **inside** `<body>` in `src/app/layout.tsx`, with `appearance={{ theme: shadcn }}` from `@clerk/ui/themes`, plus `@import "@clerk/ui/themes/shadcn.css"` in `globals.css`. Because `globals.css` already maps the shadcn CSS variables (`--background`, `--primary`, …) onto the project's own dark design tokens, Clerk's modals inherit the Surcarga palette with no extra theming.

**Why:** These are the details that don't survive a fresh session — the matcher entry is silently missing, the route-group move contradicts what the CLI generates, and `Show` contradicts every pre-v7 Clerk example.

**How to apply:** Reuse `<Show>` for any auth-conditional UI. When adding the first `app/(dashboard)/` route, add the "Ir al panel" CTA in `src/components/landing/site-header.tsx` (a TODO marks the spot — the link was deliberately left out because the route group is still empty and would 404), and put the authoritative session/role check in the dashboard's `layout.tsx` Server Layout Guard, not in `proxy.ts`.
