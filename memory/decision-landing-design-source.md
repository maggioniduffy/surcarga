---
name: decision-landing-design-source
description: The landing page is a port of a delivered Claude Design artifact; brand is Surcarga, not the artifact's "CargaSur".
metadata:
  type: project
---

The public landing page (`src/app/(public)/page.tsx` + `src/components/landing/`) is a
port of a delivered design artifact, not an original composition. The artifact branded
everything **CargaSur**; the project name is **Surcarga** (repo, `package.json`,
`layout.tsx` metadata), and the port uses Surcarga throughout.

**Why:** The artifact was an earlier naming exploration. Re-introducing "CargaSur"
anywhere would make the project disagree with itself.

**How to apply:** When extending the landing page, match the ported design language —
near-black `--color-surface-base` canvas, `--color-topo-line` contour SVG backgrounds,
uppercase tracked section eyebrows, Archivo display type at heavy weights with tight
negative tracking, `--color-surface-panel` cards on hairline `--color-line` borders.
Never write "CargaSur". Several claims in the ported copy contradict the scope docs —
see [[open-landing-copy-scope-conflicts]].
