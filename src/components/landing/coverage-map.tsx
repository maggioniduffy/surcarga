import { landing } from "@/content/es";
import { projectLocations } from "@/lib/map-projection";
import type { CatalogLocation } from "@/lib/locations";

const WIDTH = 760;
const HEIGHT = 440;
const PADDING = 60;

/**
 * Schematic view of the basin: one node per locations-catalog entry, placed by
 * its real coordinates. Deliberately not a tile layer — the product draws
 * routes as straight segments between catalog points, and corridor lines only
 * appear once the trips service can colour them by real traffic.
 */
export function CoverageMap({ locations }: { locations: readonly CatalogLocation[] }) {
  const points = projectLocations(locations, {
    width: WIDTH,
    height: HEIGHT,
    padding: PADDING,
  });

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="block h-auto w-full"
      role="img"
      aria-label={landing.map.title}
    >
      <g stroke="var(--color-surface-raised)" strokeWidth={1}>
        <path d="M0 60H760M0 130H760M0 200H760M0 270H760M0 340H760M0 410H760" />
        <path d="M60 0V440M160 0V440M260 0V440M360 0V440M460 0V440M560 0V440M660 0V440" />
      </g>

      <g fontFamily="var(--font-body)">
        {points.map((point) => {
          const isOilfield = point.type === "oilfield";
          return (
            <g key={point.id}>
              <circle
                cx={point.x}
                cy={point.y}
                r={isOilfield ? 6 : 6.5}
                fill={isOilfield ? "var(--color-brand)" : "var(--color-ink)"}
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={13}
                fill="none"
                stroke={isOilfield ? "var(--color-brand)" : "var(--color-ink)"}
                strokeOpacity={0.25}
              />
              <text
                x={point.x}
                y={point.y - 20}
                fill="var(--color-ink)"
                fontSize={14}
                fontWeight={600}
                textAnchor="middle"
              >
                {point.name}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
