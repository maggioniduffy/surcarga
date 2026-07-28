---
name: decision-app-screens-design-source
description: The five app screens (panel, publicar carga/viaje, buscar camiones, detalle viaje) are ports of delivered Claude Design artifacts, made responsive and stripped of the artifacts' out-of-scope copy.
metadata:
  type: project
---

Ported 2026-07-28 from the Claude Design project `2d54966f-337b-409e-8ee7-171401eb61f1`
(`Dashboard`, `Publicar Carga`, `Publicar Viaje`, `Buscar Camiones`, `Detalle Viaje`
`.dc.html`). Same relationship to the artifacts as [[decision-landing-design-source]]:
the design is the visual source of truth, the context files are the scope source of truth.

Four things were deliberately **not** carried over from the artifacts:

- **The light/dark theme toggle.** Every artifact shipped a `data-theme` switch and a
  `cargasur-theme` localStorage key. `ui-context.md` says dark-only, no toggle.
- **"CargaSur".** Renamed to Surcarga throughout, same as the landing port.
- **ETA / arrival-time copy.** "Llegada estimada 18:10" and "Ambos llegan hoy" were
  dropped per [[decision-no-geolocation-tracking]]; the declared ingress window and the
  committed delivery date stay, since those are data the publisher entered.
- **Match / compatibility language.** "Mejor match" → "Destacado", "Compatibilidad 96%" →
  a paradas-intermedias count, "matches" → "postulaciones", per
  [[decision-ai-matcher-deferred]].

The artifacts' USD 19 / USD 39 fees and the verification claims were kept verbatim so the
app agrees with the already-shipped landing page — both are still open, see
[[open-landing-copy-scope-conflicts]].

**Why:** These screens are presentation only. Keeping the artifacts' resolved-scope copy
would have re-introduced features the project already decided against.

Naming follows `code-standards.md`'s English-code rule: route segments, directories,
files, identifiers and every enum-ish `id`/`value` slug are English (`trip`, `cargo`,
`carrier`/`shipper`), and only the `label`/`title`/`body` strings are Spanish. That
disagrees with the Prisma schema, which is still Spanish — see the open question in
`progress-tracker.md` before wiring these screens to `users.role`.

**How to apply:** New authenticated screens reuse `src/components/app-shell/`
(`AppHeader` with its `nav`/`actions`/`width` props, `AppFooter`) and the design-language
pieces in `src/components/common/` (`CardPanel`/`CardEyebrow`, `ActionButton`/`ActionLink`,
`TagPill`/`StatusBadge`/`DensityDot`, `RouteArrow`) rather than restyling from scratch.
Form controls compose `src/components/forms/` on top of the shadcn primitives in
`components/ui/`. All sample figures in `src/content/es/*.ts` are placeholder data from
the artifacts and get replaced by real queries when the services land.
