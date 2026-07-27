import { landing } from "@/content/es";

const DENSITY_STROKE = {
  high: "var(--color-route-high)",
  medium: "var(--color-route-medium)",
  low: "var(--color-route-low)",
} as const;

/**
 * Schematic view of the basin — straight lines between catalog points, coloured
 * by corridor availability. Deliberately not a real map tile layer: the product
 * draws routes as straight GeoJSON segments between catalog coordinates.
 */
export function CoverageMap() {
  const { nodes } = landing.map;

  return (
    <svg viewBox="0 0 760 440" className="block h-auto w-full" role="img" aria-label={landing.map.title}>
      <g stroke="var(--color-surface-raised)" strokeWidth={1}>
        <path d="M0 60H760M0 130H760M0 200H760M0 270H760M0 340H760M0 410H760" />
        <path d="M60 0V440M160 0V440M260 0V440M360 0V440M460 0V440M560 0V440M660 0V440" />
      </g>

      <g fill="none" strokeWidth={2.5} strokeLinecap="round">
        <path d="M158 96 L392 214" stroke={DENSITY_STROKE.high} />
        <path d="M392 214 L604 132" stroke={DENSITY_STROKE.high} />
        <path d="M392 214 L286 342" stroke={DENSITY_STROKE.medium} />
        <path d="M286 342 L512 372" stroke={DENSITY_STROKE.medium} />
        <path d="M392 214 L556 300" stroke={DENSITY_STROKE.low} />
        <path d="M158 96 L286 342" stroke={DENSITY_STROKE.low} opacity={0.75} />
        <path d="M604 132 L556 300" stroke={DENSITY_STROKE.medium} opacity={0.8} />
      </g>

      {/* A single vehicle tracing the busiest corridor. */}
      <g
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray="14 200"
        className="animate-route-dash"
      >
        <path d="M158 96 L392 214 L604 132" />
      </g>

      <g fontFamily="var(--font-body)">
        <g>
          <circle cx={158} cy={96} r={6.5} fill="var(--color-ink)" />
          <circle cx={158} cy={96} r={13} fill="none" stroke="var(--color-ink)" strokeOpacity={0.25} />
          <text x={158} y={72} fill="var(--color-ink)" fontSize={15} fontWeight={600} textAnchor="middle">
            {nodes.rincon}
          </text>
        </g>
        <g>
          <circle cx={392} cy={214} r={7.5} fill="var(--color-brand)" />
          <circle cx={392} cy={214} r={15} fill="none" stroke="var(--color-brand)" strokeOpacity={0.35} />
          <text x={392} y={192} fill="var(--color-ink)" fontSize={16} fontWeight={700} textAnchor="middle">
            {nodes.anelo}
          </text>
        </g>
        <g>
          <circle cx={286} cy={342} r={6.5} fill="var(--color-ink)" />
          <text x={286} y={368} fill="var(--color-ink)" fontSize={15} fontWeight={600} textAnchor="middle">
            {nodes.cutralCo}
          </text>
        </g>
        <g>
          <circle cx={512} cy={372} r={6.5} fill="var(--color-ink)" />
          <text x={512} y={398} fill="var(--color-ink)" fontSize={15} fontWeight={600} textAnchor="middle">
            {nodes.neuquen}
          </text>
        </g>

        <g fontSize={12.5} fontWeight={500}>
          <rect x={586} y={118} width={36} height={20} rx={5} fill="var(--color-surface-raised)" stroke="var(--color-line-raised)" />
          <text x={604} y={132} textAnchor="middle" fill="var(--color-ink-muted)" dominantBaseline="middle">
            B-12
          </text>
          <rect x={538} y={286} width={36} height={20} rx={5} fill="var(--color-surface-raised)" stroke="var(--color-line-raised)" />
          <text x={556} y={300} textAnchor="middle" fill="var(--color-ink-muted)" dominantBaseline="middle">
            A-7
          </text>
          <rect x={222} y={180} width={36} height={20} rx={5} fill="var(--color-surface-raised)" stroke="var(--color-line-raised)" />
          <text x={240} y={194} textAnchor="middle" fill="var(--color-ink-muted)" dominantBaseline="middle">
            C-4
          </text>
          <rect x={446} y={76} width={40} height={20} rx={5} fill="var(--color-surface-raised)" stroke="var(--color-line-raised)" />
          <text x={466} y={90} textAnchor="middle" fill="var(--color-ink-muted)" dominantBaseline="middle">
            LB-9
          </text>
        </g>

        <g fill="none" stroke="var(--color-topo-line)" strokeWidth={2} strokeDasharray="4 5">
          <path d="M604 132 L466 90" />
          <path d="M392 214 L240 194" />
        </g>
      </g>
    </svg>
  );
}
