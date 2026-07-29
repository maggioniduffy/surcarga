/**
 * Copy for the transportista-side publishing form. Fields start blank; origin,
 * destination and stop options come from the locations catalog. The unit and
 * accepted-cargo taxonomies below have no column in prisma/schema.prisma yet —
 * see memory/open-form-taxonomies-unbacked.md.
 */
export const publishTrip = {
  badge: "Publicar es gratis",
  title: "Publicá tu viaje",
  subtitle:
    "Contanos por dónde vas y cuánto lugar te queda. Te avisamos cuando aparezca una carga compatible en tu ruta.",

  steps: [{ label: "Ruta" }, { label: "Capacidad" }, { label: "Revisión" }],

  locationPlaceholder: "Seleccioná una ubicación",

  route: {
    eyebrow: "Ruta",
    origin: { label: "Origen" },
    destination: { label: "Destino" },
    stops: {
      label: "Paradas intermedias",
      optional: "(opcional)",
      add: "+ Agregar parada",
      remove: "Quitar parada",
      empty: "Todavía no agregaste paradas.",
    },
    departureDate: { label: "Fecha de salida" },
    departureTime: { label: "Hora de salida" },
    flexibility: {
      label: "Flexibilidad",
      options: [
        { value: "exact", label: "Horario exacto" },
        { value: "2h", label: "± 2 horas" },
        { value: "6h", label: "± 6 horas" },
        { value: "all-day", label: "Todo el día" },
      ],
    },
    recurring: {
      label: "Este viaje se repite todas las semanas",
      days: [
        { id: "mon", label: "Lun" },
        { id: "tue", label: "Mar" },
        { id: "wed", label: "Mié" },
        { id: "thu", label: "Jue" },
        { id: "fri", label: "Vie" },
        { id: "sat", label: "Sáb" },
        { id: "sun", label: "Dom" },
      ],
    },
  },

  capacity: {
    eyebrow: "Unidad y capacidad libre",
    unit: {
      label: "Unidad",
      empty: "Todavía no cargaste ninguna unidad.",
    },
    weight: { label: "Peso disponible", suffix: "toneladas" },
    meters: {
      label: "Metros lineales libres",
      min: 1,
      max: 13.5,
      step: 0.5,
      minLabel: "1 m",
      maxLabel: "13,5 m (unidad completa)",
    },
    loading: {
      label: "Carga y descarga",
      options: [
        { value: "side-and-rear", label: "Lateral y trasera" },
        { value: "rear-only", label: "Solo trasera" },
        { value: "own-crane", label: "Con hidrogrúa propia" },
      ],
    },
    height: { label: "Altura útil", suffix: "metros" },
  },

  accepted: {
    eyebrow: "Qué carga aceptás",
    intro: "Solo vas a recibir solicitudes que coincidan con lo que marques acá.",
    options: [
      { id: "pallets", label: "Pallets" },
      { id: "skids", label: "Skids" },
      { id: "tools", label: "Herramienta" },
      { id: "pipe", label: "Tubería" },
      { id: "bulk-bags", label: "Bolsones" },
      { id: "valves", label: "Válvulas y skids chicos" },
      { id: "hazardous", label: "Carga peligrosa" },
      { id: "refrigerated", label: "Refrigerada" },
      { id: "oversized", label: "Sobredimensionada" },
    ],
    warning: "Para carga peligrosa necesitás la habilitación cargada en tu perfil.",
    warningCta: "Subir documentación",
    notes: {
      label: "Notas para el dador de carga",
      optional: "(opcional)",
      placeholder: "Ej: la carga tiene que estar lista antes de las 13:30 en Parque Industrial.",
    },
  },

  preview: {
    eyebrow: "Vista previa de tu viaje",
    emptyRoute: "Elegí origen y destino",
    emptySchedule: "Elegí fecha y hora de salida",
    spaceLabel: "Espacio libre",
    typesLabel: "Tipos aceptados",
  },

  free: {
    title: "Publicar es gratis",
    body: "Sin fee, sin comisión sobre el flete y sin límite de viajes. El precio lo acordás vos con la empresa.",
    submit: "Publicar viaje",
    saveDraft: "Guardar como borrador",
  },

  waitingCargo: {
    eyebrow: "Cargas esperando en esta ruta",
    empty: "Todavía no hay cargas esperando en esta ruta.",
    footnote: "Publicá el viaje para poder responder estas solicitudes.",
  },
} as const;
