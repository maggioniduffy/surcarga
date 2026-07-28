---
name: decision-prisma7-driver-adapter
description: Prisma 7 requires a driver adapter (@prisma/adapter-pg) — no datasource url in schema.prisma, connection lives in prisma.config.ts and the PrismaClient constructor
metadata:
  type: decision
  project: project-vaca-muerta-logistica
---

Prisma 7.9.1 rejects `url = env("DATABASE_URL")` inside the `datasource` block in `prisma/schema.prisma` (`P1012` at generate/validate time). The connection string lives only in `prisma.config.ts` (`datasource.url`), and `PrismaClient` must be constructed with a driver adapter: `new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) })`. The singleton lives at `src/lib/db/client.ts`. Seed script (`prisma/seed.ts`) instantiates its own adapter/client the same way, and is wired via `migrations.seed` in `prisma.config.ts` (`tsx prisma/seed.ts`).

**Why:** This is a hard breaking change from pre-7 Prisma (which training data assumes) — confirmed by running `prisma validate` and hitting the error, then cross-checked against the bundled `prisma-database-setup` skill.

**How to apply:** Any future Prisma/db work in this repo should read `src/lib/db/client.ts` and `prisma.config.ts` as the source of truth for how the client is wired, not assume the older `datasource { url = env(...) }` pattern. Requires `pg` + `@prisma/adapter-pg` (+ `@types/pg` dev dep).
