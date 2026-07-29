import { routes } from "@/lib/routes";

/**
 * Copy for the role-split panel — labels only. Every figure and row on this
 * screen arrives as data from the trips/cargos/applications services; until
 * those exist the panels render their empty states.
 */
export const dashboard = {
  pageTitle: "Panel",

  roleTabs: {
    label: "Cambiar de panel",
    carrier: "Transportista",
    shipper: "Empresa",
  },

  carrier: {
    eyebrow: "Panel del transportista",
    greetingLead: "Hola, ",
    greetingTail: ".",
    greetingFallback: "Hola.",
    summaryLead: "Tenés ",
    summaryTail: " sin responder.",
    summaryUnit: { one: "solicitud de carga", many: "solicitudes de carga" },
    cta: { label: "Publicar viaje", href: routes.publishTrip },

    /** Labels only; `StatCard` takes each value from the panel data by `id`. */
    stats: [
      { id: "activeTrips", label: "Viajes activos" },
      { id: "receivedRequests", label: "Solicitudes recibidas", featured: true },
      { id: "soldSpace", label: "Espacio vendido (mes)" },
      { id: "reputation", label: "Reputación" },
    ],

    requests: {
      eyebrow: "Solicitudes de carga recibidas",
      viewAll: "Ver todas →",
      actions: { reject: "Rechazar", accept: "Aceptar", detail: "Ver detalle" },
      empty: "Todavía no recibiste solicitudes de carga.",
    },

    trips: {
      eyebrow: "Mis viajes publicados",
      viewAll: "Gestionar viajes →",
      columns: ["Ruta", "Salida", "Espacio libre", "Estado"],
      empty: "Todavía no publicaste ningún viaje.",
    },

    availableCargo: {
      eyebrow: "Cargas disponibles en tus rutas",
      cta: { label: "Explorar cargas", href: routes.searchTrucks },
      empty: "No hay cargas publicadas en tus rutas.",
    },

    history: {
      eyebrow: "Historial reciente",
      empty: "Todavía no completaste ningún viaje.",
    },

    notice: {
      eyebrow: "Avisos",
      empty: "No tenés avisos pendientes.",
    },
  },

  shipper: {
    eyebrow: "Panel de la empresa",
    greetingLead: "Hola, ",
    greetingTail: ".",
    greetingFallback: "Hola.",
    summaryLead: "Tenés ",
    summaryTail: " esperando respuesta.",
    summaryUnit: { one: "publicación activa", many: "publicaciones activas" },
    cta: { label: "Publicar una carga", href: routes.publishCargo },

    stats: [
      { id: "activeListings", label: "Publicaciones activas", featured: true },
      { id: "applications", label: "Postulaciones recibidas" },
      { id: "inTransit", label: "Envíos en curso" },
      { id: "spend", label: "Gasto en publicaciones" },
    ],

    listings: {
      eyebrow: "Publicaciones activas",
      viewAll: "Ver historial →",
      unit: { one: "postulación", many: "postulaciones" },
      actions: { primary: "Ver postulaciones", secondary: "Ver postulaciones" },
      empty: "Todavía no publicaste ninguna carga.",
    },

    shipments: {
      eyebrow: "Historial de envíos",
      viewAll: "Exportar →",
      columns: ["Carga", "Transportista", "Entrega", "Estado"],
      empty: "Todavía no tenés envíos registrados.",
    },

    spend: {
      eyebrow: "Gasto en publicaciones",
      chartLabel: "Gasto mensual en publicaciones",
      empty: "Todavía no registraste pagos de publicación.",
    },

    packOffer: {
      eyebrow: "Pack por volumen",
      empty: "No hay packs disponibles para tu consumo actual.",
    },

    nextExpiry: {
      eyebrow: "Próximo vencimiento",
      empty: "No tenés publicaciones por vencer.",
    },
  },
} as const;
