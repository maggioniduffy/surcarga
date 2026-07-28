import { brand } from "./brand";
import { routes } from "@/lib/routes";

/**
 * Copy for a single published viaje. Everything below is placeholder sample
 * data from the delivered design artifact until the viaje service exists.
 */
export const tripDetail = {
  user: { initials: "PS", name: "Petrosur SRL", meta: "Compras · Neuquén" },
  back: { label: "Volver a resultados", href: routes.searchTrucks },

  badges: { featured: "Destacado", available: "Espacio disponible" },
  reference: "Viaje #VJ-4821 · publicado hace 12 min",
  title: { origin: "Neuquén Capital", destination: "Pad B-12" },
  meta: ["Sale hoy 14:30", "Ventana de ingreso 17:30 – 19:00", "218 km"],

  metrics: [
    { id: "space", label: "Espacio libre", value: "8 m" },
    { id: "weight", label: "Peso disponible", value: "9 t" },
    { id: "detour", label: "Desvío desde ruta", value: "12 km" },
    { id: "stops", label: "Paradas intermedias", value: "1", accent: true },
  ],

  stops: {
    eyebrow: "Ruta y paradas",
    items: [
      {
        id: "origin",
        name: "Neuquén Capital",
        meta: "Origen · carga 13:00 – 14:15",
        body: "Depósito propio en Parque Industrial Neuquén. Recibe carga paletizada con montacargas.",
      },
      {
        id: "stop",
        name: "Añelo · Base C-4",
        badge: "Parada intermedia",
        body: "Descarga parcial 16:00. Queda espacio libre en el último tramo: 8 m lineales.",
      },
      {
        id: "destination",
        name: "Pad B-12 · Loma Campana",
        meta: "Destino · ventana de ingreso 17:30 – 19:00",
        body: "Acceso autorizado y vigente. Último tramo 14 km de ripio consolidado.",
      },
    ],
  },

  unit: {
    eyebrow: "Unidad y carga aceptada",
    rows: [
      { label: "Unidad", value: "Semirremolque chasis 13,5 m" },
      { label: "Dominio", value: "AF 481 QK" },
      { label: "Altura útil", value: "2,60 m" },
      { label: "Carga / descarga", value: "Lateral y trasera" },
      { label: "Sujeción", value: "Fajas y esquineros propios" },
    ],
    acceptsLabel: "Acepta",
    accepts: ["Pallets", "Skids", "Herramienta", "Bolsones", "Válvulas"],
    rejectsLabel: "No acepta",
    rejects: ["Peligrosa", "Refrigerada", "Sobredimensionada"],
  },

  documents: {
    eyebrow: "Documentación verificada",
    items: [
      { id: "insurance", label: "Seguro de transporte", meta: "vence 12/2026", ok: true },
      { id: "ruta", label: "RUTA vigente", meta: "vence 03/2027", ok: true },
      { id: "site-access", label: "Acceso Loma Campana", meta: "vence 09/2026", ok: true },
      { id: "hse", label: "Inducción HSE del operador", meta: "vence 11/2026", ok: true },
      { id: "vtv", label: "VTV de la unidad", meta: "vence 05/2027", ok: true },
      { id: "hazardous", label: "Habilitación carga peligrosa", meta: "no presentada", ok: false },
    ],
  },

  reputation: {
    eyebrow: "Historial y calificaciones",
    viewAll: "Ver las 142 entregas →",
    stats: [
      { id: "average", label: "Promedio general", value: "4,9", accent: true },
      { id: "on-time", label: "Entregas en horario", value: "97%" },
      { id: "deliveries", label: "Entregas completadas", value: "142" },
      { id: "claims", label: "Reclamos por daño", value: "0" },
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Halliburton Argentina",
        rating: "5,0 ★",
        date: "jun 2026",
        body: "“Entregó en el pad antes de la ventana y con remito firmado en la app. Muy prolijo con la sujeción.”",
      },
      {
        id: "rev-2",
        author: "Servicios Bandurria",
        rating: "4,8 ★",
        date: "may 2026",
        body: "“Avisó la demora en portería al instante. Coordinación directa y sin vueltas.”",
      },
    ],
  },

  carrier: {
    initials: "HM",
    name: "Transportes Maidana",
    meta: "Rincón de los Sauces · 6 unidades",
    tags: [
      { label: "CUIT verificado", tone: "published" },
      { label: "Flota verificada", tone: "published" },
      { label: `4 años en ${brand.name}`, tone: "urgent" },
    ],
    responseTime: "Responde en promedio en 18 min",
  },

  request: {
    eyebrow: "Enviar carga en este viaje",
    body: "Publicás tu solicitud dirigida a este viaje. Si el transportista acepta, coordinan el flete directamente entre ustedes.",
    feeLabel: "Fee de publicación",
    feeValue: "USD 19",
    commissionLabel: "Comisión sobre el flete",
    commissionValue: "0%",
    creditNote: "Si el viaje se completa sin tu carga, el fee vuelve como crédito.",
    submit: "Enviar solicitud de carga",
    secondary: "Consultar disponibilidad",
    footnote: "Se cobra al confirmar la publicación",
  },

  otherTrips: {
    eyebrow: "Otros viajes al Pad B-12",
    items: [
      { id: "VJ-4820", label: "Mañana 06:00 · 12 m", rating: "4,7 ★", density: "high" },
      { id: "VJ-4816", label: "Mié 05:30 · 3 m", rating: "4,4 ★", density: "medium" },
      { id: "VJ-4809", label: "Jue 06:00 · 9 m", rating: "5,0 ★", density: "high" },
    ],
  },
} as const;
