import { routes } from "@/lib/routes";

/**
 * Copy for a single published viaje — labels only. The trip itself, its stops,
 * unit, documentation and reputation all arrive as data from the trip service.
 */
export const tripDetail = {
  pageTitle: "Detalle del viaje",
  back: { label: "Volver a resultados", href: routes.searchTrucks },

  badges: { featured: "Destacado", available: "Espacio disponible" },
  empty: "Este viaje no está disponible.",

  metrics: [
    { id: "space", label: "Espacio libre" },
    { id: "weight", label: "Peso disponible" },
    { id: "detour", label: "Desvío desde ruta" },
    { id: "stops", label: "Paradas intermedias", accent: true },
  ],

  stops: {
    eyebrow: "Ruta y paradas",
    empty: "Este viaje todavía no tiene paradas cargadas.",
  },

  unit: {
    eyebrow: "Unidad y carga aceptada",
    acceptsLabel: "Acepta",
    rejectsLabel: "No acepta",
    empty: "El transportista todavía no cargó los datos de la unidad.",
  },

  documents: {
    eyebrow: "Documentación verificada",
    empty: "Todavía no hay documentación cargada.",
  },

  reputation: {
    eyebrow: "Historial y calificaciones",
    viewAll: "Ver todas las entregas →",
    empty: "Este transportista todavía no tiene entregas calificadas.",
  },

  carrier: {
    empty: "Todavía no hay datos del transportista.",
    responseTimeLabel: "Tiempo de respuesta promedio",
  },

  request: {
    eyebrow: "Enviar carga en este viaje",
    body: "Publicás tu solicitud dirigida a este viaje. Si el transportista acepta, coordinan el flete directamente entre ustedes.",
    feeLabel: "Fee de publicación",
    commissionLabel: "Comisión sobre el flete",
    commissionValue: "0%",
    creditNote: "Si el viaje se completa sin tu carga, el fee vuelve como crédito.",
    submit: "Enviar solicitud de carga",
    secondary: "Consultar disponibilidad",
    footnote: "Se cobra al confirmar la publicación",
  },

  otherTrips: {
    eyebrow: "Otros viajes a este destino",
    empty: "No hay otros viajes publicados a este destino.",
  },
} as const;
