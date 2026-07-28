import { routes } from "@/lib/routes";

/**
 * Copy for the role-split panel. The figures below are placeholder sample data
 * from the delivered design artifact — they are replaced by real queries once
 * the viajes/cargas/postulaciones services exist.
 */
export const dashboard = {
  pageTitle: "Panel",

  roleTabs: {
    label: "Cambiar de panel",
    carrier: "Transportista",
    shipper: "Empresa",
  },

  carrier: {
    user: { initials: "HM", name: "Transportes Maidana", meta: "4,9 ★ · 142 entregas" },
    eyebrow: "Panel del transportista",
    greeting: "Buen día, Hugo.",
    summaryLead: "Tenés ",
    summaryHighlight: "5 solicitudes de carga",
    summaryTail: " sin responder para los viajes de esta semana.",
    cta: { label: "Publicar viaje", href: routes.publishTrip },

    stats: [
      { label: "Viajes activos", value: "6", hint: "3 con espacio libre" },
      { label: "Solicitudes recibidas", value: "5", hint: "2 urgentes", featured: true },
      { label: "Espacio vendido (mes)", value: "74%", hint: "+11 pts vs. junio" },
      { label: "Reputación", value: "4,9 ★", hint: "142 entregas · 97% en horario" },
    ],

    requests: {
      eyebrow: "Solicitudes de carga recibidas",
      viewAll: "Ver todas (5) →",
      actions: { reject: "Rechazar", accept: "Aceptar", detail: "Ver detalle" },
      items: [
        {
          id: "req-1",
          badge: "Urgente",
          meta: "Petrosur SRL · hace 12 min",
          title: "6 pallets de bentonita + 1 skid",
          detail: "Neuquén → Pad B-12 · 6,4 m · 7,2 t · para tu viaje de hoy 14:30",
          urgent: true,
        },
        {
          id: "req-2",
          badge: undefined,
          meta: "Servicios Bandurria · hace 2 h",
          title: "Herramienta de perforación (2 cajones)",
          detail: "Añelo → Pad A-7 · 2,8 m · 1,9 t · miércoles",
          urgent: false,
        },
        {
          id: "req-3",
          badge: undefined,
          meta: "Halliburton Argentina · ayer",
          title: "4 bolsones de arena",
          detail: "Neuquén → Campamento LB-9 · 4,2 m · 6 t · jueves",
          urgent: false,
        },
      ],
    },

    trips: {
      eyebrow: "Mis viajes publicados",
      viewAll: "Gestionar viajes →",
      columns: ["Ruta", "Salida", "Espacio libre", "Estado"],
      rows: [
        {
          id: "vj-1",
          cells: ["Neuquén → Pad B-12", "Hoy 14:30", "8 m / 9 t", "2 solicitudes"],
          statusTone: "brand",
        },
        {
          id: "vj-2",
          cells: ["Rincón → Campamento LB-9", "Mañana 06:00", "12 m / 14 t", "Publicado"],
          statusTone: "published",
        },
        {
          id: "vj-3",
          cells: ["Añelo → Pad A-7", "Mié 05:30", "3 m / 4 t", "1 solicitud"],
          statusTone: "brand",
        },
        {
          id: "vj-4",
          cells: ["Neuquén → Cutral Có", "Vie 07:00", "Completo", "Cerrado"],
          statusTone: "muted",
        },
      ],
    },

    availableCargo: {
      eyebrow: "Cargas disponibles en tus rutas",
      cta: { label: "Explorar cargas", href: routes.searchTrucks },
      items: [
        { id: "c-1", label: "Tubería · Añelo → A-7", value: "3,1 m", density: "low" },
        { id: "c-2", label: "Válvulas · Neuquén → B-12", value: "1,4 m", density: "high" },
        { id: "c-3", label: "Insumos · Rincón → LB-9", value: "5,0 m", density: "high" },
      ],
    },

    history: {
      eyebrow: "Historial reciente",
      items: [
        { id: "h-1", route: "Neuquén → Pad B-12", rating: "5,0 ★", meta: "Halliburton · entregado 24/07" },
        { id: "h-2", route: "Rincón → Base C-4", rating: "4,8 ★", meta: "Servicios Bandurria · entregado 22/07" },
        { id: "h-3", route: "Neuquén → Añelo", rating: "5,0 ★", meta: "Petrosur · entregado 19/07" },
      ],
    },

    notice: {
      title: "Acceso a Loma Campana vence en 45 días",
      body: "Renovalo para seguir recibiendo solicitudes de ese yacimiento.",
      cta: "Actualizar documentación",
    },
  },

  shipper: {
    user: { initials: "PS", name: "Petrosur SRL", meta: "Compras · Neuquén" },
    eyebrow: "Panel de la empresa",
    greeting: "Hola, Valeria.",
    summaryLead: "Tenés ",
    summaryHighlight: "3 publicaciones activas",
    summaryTail: " y 7 transportistas interesados esperando respuesta.",
    cta: { label: "Publicar una carga", href: routes.publishCargo },

    stats: [
      { label: "Publicaciones activas", value: "3", hint: "1 destacada", featured: true },
      { label: "Postulaciones recibidas", value: "7", hint: "4 verificados 4,5 ★+" },
      { label: "Envíos en curso", value: "2", hint: "Entrega comprometida hoy" },
      { label: "Gasto en publicaciones (jul)", value: "USD 152", hint: "8 publicaciones · 0% comisión" },
    ],

    listings: {
      eyebrow: "Publicaciones activas",
      viewAll: "Ver historial →",
      unit: { one: "postulación", many: "postulaciones" },
      actions: { primary: "Ver postulaciones", secondary: "Ver postulaciones" },
      items: [
        {
          id: "cg-1",
          badge: "Destacada",
          meta: "USD 39 pagados · publicada hace 12 min",
          title: "6 pallets de bentonita + 1 skid",
          detail: "Neuquén → Pad B-12 · retiro hoy · 6,4 m · 7,2 t",
          count: 4,
          featured: true,
        },
        {
          id: "cg-2",
          badge: undefined,
          meta: "USD 19 pagados · vence en 5 días",
          title: "2 cajones de herramienta",
          detail: "Neuquén → Pad A-7 · retiro miércoles · 2,8 m · 1,9 t",
          count: 2,
          featured: false,
        },
        {
          id: "cg-3",
          badge: undefined,
          meta: "USD 19 pagados · vence en 2 días",
          title: "Contenedor de repuestos",
          detail: "Neuquén → Rincón de los Sauces · 3,0 m · 4,5 t",
          count: 1,
          featured: false,
        },
      ],
    },

    shipments: {
      eyebrow: "Historial de envíos",
      viewAll: "Exportar →",
      columns: ["Carga", "Transportista", "Entrega", "Estado"],
      rows: [
        {
          id: "sh-1",
          cells: ["4 bolsones de arena", "T. Maidana", "Hoy", "En curso"],
          statusTone: "brand",
        },
        {
          id: "sh-2",
          cells: ["Skid de válvulas", "Log. Patagonia", "Hoy", "En curso"],
          statusTone: "brand",
        },
        {
          id: "sh-3",
          cells: ["Tubería 6 m", "Ruta Sur Cargas", "24/07", "Entregado"],
          statusTone: "published",
        },
        {
          id: "sh-4",
          cells: ["Insumos de campamento", "T. Neuquén", "21/07", "Entregado"],
          statusTone: "published",
        },
      ],
    },

    spend: {
      eyebrow: "Gasto en publicaciones",
      total: "USD 152",
      period: "julio 2026",
      axisStart: "ene",
      axisEnd: "jul",
      chartLabel: "Gasto mensual en publicaciones, de enero a julio",
      /** Bar heights as a percentage of the chart box. */
      bars: [32, 46, 38, 64, 58, 82, 100],
      breakdown: [
        { label: "Estándar (6)", value: "USD 114" },
        { label: "Destacadas (1)", value: "USD 39" },
        { label: "Crédito por publicación vencida", value: "− USD 19", positive: true },
      ],
    },

    packOffer: {
      eyebrow: "Pack por volumen",
      body: "Publicás 8 cargas por mes. Con el pack de 20 el fee unitario baja a USD 14 y ahorrarías USD 100.",
      cta: "Ver packs",
    },

    nextExpiry: {
      eyebrow: "Próximo vencimiento",
      title: "Contenedor de repuestos",
      body: "La publicación vence en 2 días con 1 postulación. Si vence sin acuerdo, el fee vuelve como crédito.",
    },
  },
} as const;
