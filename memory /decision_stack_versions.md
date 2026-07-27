---
name: decision-stack-versions
description: Confirmed installed versions for Vaca Muerta Logística — Next.js 16.2.12, Tailwind v4.3.3, Prisma 7.9.1
metadata:
  type: decision
  project: project-vaca-muerta-logistica
---

Actual installed versions, confirmed by reading `node_modules/*/package.json` and `node_modules/next/dist/docs/` during scaffolding (not assumed from training data): **Next.js 16.2.12** (App Router, `src/` dir), **Tailwind CSS v4.3.3** (CSS-first `@theme`/`@theme inline` config, no `tailwind.config.js`), **Prisma 7.9.1**, **shadcn/ui** (style `base-nova`, `components.json` present).

**Why:** AGENTS.md requires verifying conventions against the actually-installed docs, not training data, because this Next.js version has breaking changes (e.g. `middleware.ts` → `proxy.ts`, confirmed present at `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`). Prisma 7 also breaks from older Prisma conventions — see [[decision-prisma7-driver-adapter]].

**How to apply:** Don't re-derive or re-guess these versions in future sessions — read them fresh only if `package.json`/`node_modules` actually changed. This resolves the version open questions previously logged in `context/progress-tracker.md`.
