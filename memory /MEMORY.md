# Memory Index

- [Project: Vaca Muerta Logística](project_vaca_muerta_logistica.md) — Next.js marketplace app connecting truck drivers and oil & gas companies in Vaca Muerta, scaffolded as npm package `surcarga` at repo root
- [Decision: Role Model](decision_role_model.md) — users.role is transportista | empresa | admin, immutable, admin scoped only to ubicaciones moderation
- [Decision: Ubicaciones Catalog](decision_ubicaciones_catalog.md) — extensible location catalog: any authenticated user can add, only admin can edit/delete
- [Decision: Stack Assumptions](decision_stack_assumptions.md) — Supabase (DB+Auth+Storage), Prisma, MapLibre GL chosen over alternatives, pending confirmation
- [Decision: Stack Versions](decision_stack_versions.md) — confirmed installed versions: Next.js 16.2.12, Tailwind v4.3.3, Prisma 7.9.1, shadcn/ui
- [Decision: Prisma 7 Driver Adapter](decision_prisma7_driver_adapter.md) — no datasource url in schema.prisma; connection via prisma.config.ts + @prisma/adapter-pg in src/lib/db/client.ts
- [Decision: Schema Assumptions](decision_schema_assumptions.md) — non-obvious fields/enums added to the initial Prisma schema not literally specified in architecture-context.md
