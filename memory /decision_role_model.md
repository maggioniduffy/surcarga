---
name: decision-role-model
description: users.role in Vaca Muerta Logística is transportista, empresa, or admin — immutable after signup/grant
metadata:
  type: decision
  project: project-vaca-muerta-logistica
---

`users.role` is a three-value enum: **transportista** | **empresa** | **admin**. It is set once (at signup for the two public roles, granted separately for admin — no public self-signup for admin) and is immutable afterward.

**Why:** Role drives which forms, dashboard views, and payment paths a user sees, and gates Row Level Security policies at the data layer. Admin was added specifically so someone can moderate the ubicaciones catalog (edit/delete entries) — it is intentionally narrow, not a general back-office role.

**How to apply:** Never let a user self-assign or change their own role. Gate the dashboard route group via a Server Layout Guard (`app/(dashboard)/layout.tsx`) checking the session, and back it with Postgres RLS scoped by `auth.uid()` + `role`. `admin` should only unlock ubicaciones edit/delete — don't grant it broader access to other users' cargas, viajes, or payments without a documented scope change in `context/architecture-context.md`.
