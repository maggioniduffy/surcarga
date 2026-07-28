/**
 * Copy for the transportista-side publishing form. Unit and location option
 * lists are placeholder sample data from the delivered design artifact.
 */
export const publishTrip = {
  user: { initials: "HM", name: "Transportes Maidana", meta: "4,9 ★ · 142 entregas" },

  badge: "Publicar es gratis",
  title: "Publicá tu viaje",
  subtitle:
    "Contanos por dónde vas y cuánto lugar te queda. Te avisamos cuando aparezca una carga compatible en tu ruta.",

  steps: [
    { label: "Ruta", done: true },
    { label: "Capacidad", done: false },
    { label: "Revisión", done: false },
  ],

  route: {
    eyebrow: "Ruta",
    origin: {
      label: "Origen",
      value: "rincon",
      options: [
        { value: "rincon", label: "Rincón de los Sauces" },
        { value: "neuquen", label: "Neuquén Capital" },
        { value: "anelo", label: "Añelo" },
        { value: "cutral-co", label: "Cutral Có" },
        { value: "plaza-huincul", label: "Plaza Huincul" },
        { value: "bahia-blanca", label: "Bahía Blanca" },
      ],
    },
    destination: {
      label: "Destino",
      value: "pad-b12",
      options: [
        { value: "pad-b12", label: "Pad B-12 · Loma Campana" },
        { value: "pad-a7", label: "Pad A-7 · Bandurria Sur" },
        { value: "lb-9", label: "Campamento LB-9" },
        { value: "base-c4", label: "Base C-4 · Añelo" },
        { value: "anelo", label: "Añelo (ciudad)" },
        { value: "neuquen", label: "Neuquén Capital" },
      ],
    },
    stops: {
      label: "Paradas intermedias",
      optional: "(opcional)",
      add: "+ Agregar parada",
      remove: "Quitar parada",
      items: [{ id: "stop-1", label: "Añelo · Base C-4" }],
    },
    departureDate: { label: "Fecha de salida", value: "2026-07-27" },
    departureTime: { label: "Hora de salida", value: "14:30" },
    flexibility: {
      label: "Flexibilidad",
      value: "2h",
      options: [
        { value: "2h", label: "± 2 horas" },
        { value: "exact", label: "Horario exacto" },
        { value: "6h", label: "± 6 horas" },
        { value: "all-day", label: "Todo el día" },
      ],
    },
    recurring: {
      label: "Este viaje se repite todas las semanas",
      days: [
        { id: "mon", label: "Lun", active: true },
        { id: "tue", label: "Mar", active: false },
        { id: "wed", label: "Mié", active: true },
        { id: "thu", label: "Jue", active: false },
        { id: "fri", label: "Vie", active: true },
        { id: "sat", label: "Sáb", active: false },
        { id: "sun", label: "Dom", active: false },
      ],
    },
  },

  capacity: {
    eyebrow: "Unidad y capacidad libre",
    unit: {
      label: "Unidad",
      value: "flatbed-semi",
      options: [
        { value: "flatbed-semi", label: "Semi chasis 13,5 m · AF 481 QK" },
        { value: "sided-semi", label: "Semi barandas 12 m · AD 902 LT" },
        { value: "crane-chassis", label: "Chasis con hidrogrúa · AC 771 BM" },
      ],
    },
    weight: { label: "Peso disponible", value: "9", suffix: "toneladas" },
    meters: {
      label: "Metros lineales libres",
      min: 1,
      max: 13.5,
      step: 0.5,
      value: 8,
      minLabel: "1 m",
      maxLabel: "13,5 m (unidad completa)",
    },
    loading: {
      label: "Carga y descarga",
      value: "side-and-rear",
      options: [
        { value: "side-and-rear", label: "Lateral y trasera" },
        { value: "rear-only", label: "Solo trasera" },
        { value: "own-crane", label: "Con hidrogrúa propia" },
      ],
    },
    height: { label: "Altura útil", value: "2,60", suffix: "metros" },
  },

  accepted: {
    eyebrow: "Qué carga aceptás",
    intro: "Solo vas a recibir solicitudes que coincidan con lo que marques acá.",
    options: [
      { id: "pallets", label: "Pallets", selected: true },
      { id: "skids", label: "Skids", selected: true },
      { id: "tools", label: "Herramienta", selected: true },
      { id: "pipe", label: "Tubería", selected: false },
      { id: "bulk-bags", label: "Bolsones", selected: true },
      { id: "valves", label: "Válvulas y skids chicos", selected: true },
      { id: "hazardous", label: "Carga peligrosa", selected: false },
      { id: "refrigerated", label: "Refrigerada", selected: false },
      { id: "oversized", label: "Sobredimensionada", selected: false },
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
    origin: "Rincón",
    destination: "Pad B-12",
    schedule: "Parada: Añelo · sale lun 27/07 14:30 (± 2 h)",
    spaceLabel: "Espacio libre",
    spaceSuffix: " / 9 t",
    typesLabel: "Tipos aceptados",
    typesSuffix: " de 9",
  },

  free: {
    title: "Publicar es gratis",
    body: "Sin fee, sin comisión sobre el flete y sin límite de viajes. El precio lo acordás vos con la empresa.",
    submit: "Publicar viaje",
    saveDraft: "Guardar como borrador",
  },

  waitingCargo: {
    eyebrow: "Cargas esperando en esta ruta",
    items: [
      { id: "w-1", label: "6 pallets de bentonita", meta: "Urgente", urgent: true },
      { id: "w-2", label: "1 skid de válvulas", meta: "Hoy", urgent: false },
      { id: "w-3", label: "Herramienta de perforación", meta: "Mié", urgent: false },
    ],
    footnote: "Publicá el viaje para poder responder estas solicitudes.",
  },
} as const;
