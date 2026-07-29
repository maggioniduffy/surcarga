import { routes } from "@/lib/routes";

/**
 * Copy for the browse/search screen — labels only. Origin/destination options
 * come from the locations catalog and result rows from the trips search
 * service; both arrive as props.
 */
export const searchTrucks = {
  headerCta: { label: "Publicar una carga", href: routes.publishCargo },

  filters: {
    title: "Filtros",
    openLabel: "Mostrar filtros",
    clear: "Limpiar",
    locationPlaceholder: "Seleccioná una ubicación",
    destination: { label: "Destino" },
    origin: { label: "Origen" },
    dates: { label: "Fecha de salida", fromLabel: "Desde", toLabel: "Hasta" },
    cargoTypes: {
      label: "Tipo de carga",
      options: [
        { id: "pallets", label: "Pallets" },
        { id: "skids", label: "Skids" },
        { id: "tools", label: "Herramienta" },
        { id: "pipe", label: "Tubería" },
        { id: "hazardous", label: "Peligrosa" },
        { id: "refrigerated", label: "Refrigerada" },
      ],
    },
    capacity: { label: "Capacidad libre mínima", min: 1, max: 14, minLabel: "1 m", maxLabel: "14 m" },
    toggles: [
      { id: "pad-access", label: "Con acceso autorizado al pad" },
      { id: "verified", label: "Transportista verificado" },
      { id: "min-rating", label: "Reputación 4,5 ★ o más" },
    ],
    apply: "Aplicar filtros",
  },

  results: {
    title: "Camiones con espacio publicado",
    countUnit: { one: "viaje", many: "viajes" },
    countTail: " publicados en la región",
    sort: {
      label: "Ordenar resultados",
      value: "departure",
      options: [
        { value: "departure", label: "Orden: salida más próxima" },
        { value: "capacity", label: "Orden: mayor capacidad" },
        { value: "rating", label: "Orden: mejor reputación" },
        { value: "detour", label: "Orden: menor desvío" },
      ],
    },
    view: { label: "Cambiar vista", list: "Lista", map: "Mapa" },
    loadMore: "Cargar más viajes",
    actions: { request: "Enviar solicitud de carga", detail: "Ver viaje" },
    spaceLabel: "Espacio libre",
    ratingLabel: "Reputación",
    empty: "Todavía no hay viajes publicados con estos filtros.",

    emptyPrompt: {
      title: "¿No encontrás lo que necesitás?",
      body: "Publicá tu solicitud de carga y los transportistas de la ruta te contactan. Fee fijo por publicación.",
      cta: { label: "Publicar una carga", href: routes.publishCargo },
    },
  },

  map: {
    title: "Mapa de viajes publicados en la región",
    legend: [
      { label: "Alta disponibilidad", density: "high" },
      { label: "Moderada", density: "medium" },
      { label: "Baja", density: "low" },
    ],
    corridor: {
      eyebrow: "Corredor seleccionado",
      empty: "Elegí un corredor para ver su detalle.",
    },
    corridorTrips: {
      eyebrow: "Viajes en este corredor",
      empty: "No hay viajes publicados en este corredor.",
      cta: "Ver los viajes en lista",
    },
  },
} as const;
