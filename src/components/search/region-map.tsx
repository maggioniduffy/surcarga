/**
 * Schematic corridor map. Straight lines between catalog points, colour-coded
 * by availability density — no tiles and no routing API, per the architecture's
 * map invariant. Scales with its container instead of a fixed 760px canvas.
 */
export function RegionMap({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 760 470" className="block h-auto w-full" role="img" aria-label={title}>
      <g stroke="var(--color-line-subtle)" strokeWidth={1}>
        <path d="M0 60H760M0 130H760M0 200H760M0 270H760M0 340H760M0 410H760" />
        <path d="M60 0V470M160 0V470M260 0V470M360 0V470M460 0V470M560 0V470M660 0V470" />
      </g>

      <g fill="none" strokeWidth={2.5} strokeLinecap="round">
        <path d="M158 96 L392 214" stroke="var(--color-route-high)" />
        <path d="M392 214 L604 132" stroke="var(--color-route-high)" />
        <path d="M392 214 L286 342" stroke="var(--color-route-medium)" />
        <path d="M286 342 L512 372" stroke="var(--color-route-medium)" />
        <path d="M392 214 L556 300" stroke="var(--color-route-low)" />
        <path d="M158 96 L286 342" stroke="var(--color-route-low)" opacity={0.75} />
        <path d="M604 132 L556 300" stroke="var(--color-route-medium)" opacity={0.8} />
        <path d="M512 372 L392 214" stroke="var(--color-route-high)" opacity={0.8} />
      </g>

      <g
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray="14 200"
        className="animate-route-dash"
      >
        <path d="M512 372 L392 214 L604 132" />
      </g>

      <g fontFamily="var(--font-body)">
        <circle cx={158} cy={96} r={6.5} fill="var(--color-ink)" />
        <text x={158} y={74} fill="var(--color-ink)" fontSize={14.5} fontWeight={600} textAnchor="middle">
          Rincón de los Sauces
        </text>

        <circle cx={392} cy={214} r={7.5} fill="var(--color-brand)" />
        <circle cx={392} cy={214} r={15} fill="none" stroke="var(--color-brand)" strokeOpacity={0.35} />
        <text x={392} y={192} fill="var(--color-ink)" fontSize={15.5} fontWeight={700} textAnchor="middle">
          Añelo
        </text>

        <circle cx={286} cy={342} r={6.5} fill="var(--color-ink)" />
        <text x={286} y={368} fill="var(--color-ink)" fontSize={14.5} fontWeight={600} textAnchor="middle">
          Cutral Có
        </text>

        <circle cx={512} cy={372} r={6.5} fill="var(--color-ink)" />
        <text x={512} y={398} fill="var(--color-ink)" fontSize={14.5} fontWeight={600} textAnchor="middle">
          Neuquén Capital
        </text>

        <g fontSize={12.5} fontWeight={500}>
          <rect
            x={580}
            y={118}
            width={48}
            height={21}
            rx={5}
            fill="var(--color-status-urgent-bg)"
            stroke="var(--color-line-warm-raised)"
          />
          <text x={604} y={132.5} textAnchor="middle" fill="var(--color-brand)" dominantBaseline="middle">
            B-12
          </text>

          <rect
            x={538}
            y={286}
            width={36}
            height={21}
            rx={5}
            fill="var(--color-surface-raised)"
            stroke="var(--color-line-raised)"
          />
          <text x={556} y={300.5} textAnchor="middle" fill="var(--color-ink-muted)" dominantBaseline="middle">
            A-7
          </text>

          <rect
            x={222}
            y={180}
            width={36}
            height={21}
            rx={5}
            fill="var(--color-surface-raised)"
            stroke="var(--color-line-raised)"
          />
          <text x={240} y={194.5} textAnchor="middle" fill="var(--color-ink-muted)" dominantBaseline="middle">
            C-4
          </text>

          <rect
            x={446}
            y={76}
            width={42}
            height={21}
            rx={5}
            fill="var(--color-surface-raised)"
            stroke="var(--color-line-raised)"
          />
          <text x={467} y={90.5} textAnchor="middle" fill="var(--color-ink-muted)" dominantBaseline="middle">
            LB-9
          </text>
        </g>

        <g fill="none" stroke="var(--color-topo-line)" strokeWidth={2} strokeDasharray="4 5">
          <path d="M604 132 L467 90" />
          <path d="M392 214 L240 194" />
        </g>

        <g>
          <rect
            x={404}
            y={228}
            width={150}
            height={26}
            rx={7}
            fill="var(--color-surface-sunken)"
            stroke="var(--color-line-raised)"
          />
          <text x={418} y={241.5} fontSize={12.5} fill="var(--color-ink-subtle)" dominantBaseline="middle">
            31 camiones · alta
          </text>
        </g>
      </g>
    </svg>
  );
}
