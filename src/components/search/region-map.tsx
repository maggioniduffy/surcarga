import { projectLocations } from "@/lib/map-projection";
import type { CatalogLocation } from "@/lib/locations";

const WIDTH = 760;
const HEIGHT = 470;
const PADDING = 60;

/**
 * Schematic corridor map: one node per locations-catalog entry, positioned by
 * its real coordinates. No tiles and no routing API, per architecture-context.md
 * Invariant #4. Corridor lines land here once the trips service can say which
 * routes actually carry traffic. Scales with its container.
 */
export function RegionMap({
  title,
  locations,
}: {
  title: string;
  locations: readonly CatalogLocation[];
}) {
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
      aria-label={title}
    >
      <g stroke="var(--color-line-subtle)" strokeWidth={1}>
        <path d="M0 60H760M0 130H760M0 200H760M0 270H760M0 340H760M0 410H760" />
        <path d="M60 0V470M160 0V470M260 0V470M360 0V470M460 0V470M560 0V470M660 0V470" />
      </g>

      <g fontFamily="var(--font-body)">
        {points.map((point) => {
          const isOilfield = point.type === "oilfield";
          return (
            <g key={point.id}>
              <circle
                cx={point.x}
                cy={point.y}
                r={isOilfield ? 5.5 : 6.5}
                fill={isOilfield ? "var(--color-brand)" : "var(--color-ink)"}
              />
              <text
                x={point.x}
                y={point.y - 14}
                fill="var(--color-ink)"
                fontSize={13.5}
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
