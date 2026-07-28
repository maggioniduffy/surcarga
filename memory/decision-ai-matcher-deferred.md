---
name: decision-ai-matcher-deferred
description: The AI matcher is deferred to a later version and must not appear anywhere in the app for now.
metadata:
  type: project
---

Decided 2026-07-27: the **AI matcher is a later-version feature**. For now it must not
appear anywhere in the app — not in copy, not in UI, not in code. Matching in the current
version is plain **search and filters** (route, region, dates, cargo type) plus the
postulación action, exactly as `project-overview.md` and `architecture-context.md`'s
Matching & Postulación Model describe.

Copy changed in `src/content/es/landing.ts`: "La IA matchea transportistas en tu ruta" → "La ven los
transportistas de esa ruta"; the "Matching por ruta y ventana horaria / Score por desvío en
km" feature card → "Búsqueda por ruta y ventana horaria" with filter language; the
"Matching automático por ruta y fecha" pricing perk → "Visible en las búsquedas por ruta y
fecha".

**Why:** The landing copy was ported verbatim from the design artifact and advertised an AI
component no context file backs (see [[open-landing-copy-scope-conflicts]]). The user chose
to defer rather than build it.

**How to apply:** Avoid "IA", "matching automático", and score/ranking-engine language in
user-facing text and in code identifiers. Unlike [[decision-no-geolocation-tracking]] this
one is deferred, not killed — it can come back as a scoped unit once someone asks for it.
