/**
 * Copy for the empresa-side publishing form. Fields start blank; origin and
 * destination options come from the locations catalog. The cargo-type and
 * requirement taxonomies below have no column in prisma/schema.prisma yet —
 * see memory/open-form-taxonomies-unbacked.md.
 */
export const publishCargo = {
  badge: "Fee fijo por publicación",
  title: "Publicá tu carga",
  subtitle:
    "Describí qué necesitás mover y a dónde. Los transportistas que ya viajan por esa ruta reciben tu solicitud.",

  steps: [{ label: "Carga" }, { label: "Urgencia" }, { label: "Pago del fee" }],

  locationPlaceholder: "Seleccioná una ubicación",

  cargo: {
    eyebrow: "Qué mandás",
    description: { label: "Descripción de la carga" },
    type: {
      label: "Tipo de carga",
      options: [
        { value: "pallets", label: "Pallets" },
        { value: "skids", label: "Skids" },
        { value: "tools", label: "Herramienta" },
        { value: "pipe", label: "Tubería" },
        { value: "bulk-bags", label: "Bolsones" },
        { value: "full-load", label: "Equipo completo" },
      ],
    },
    packages: { label: "Cantidad de bultos" },
    dimensions: [
      { id: "length", label: "Largo (m)" },
      { id: "width", label: "Ancho (m)" },
      { id: "height", label: "Alto (m)" },
      { id: "weight", label: "Peso (t)" },
    ],
  },

  route: {
    eyebrow: "Origen y destino",
    origin: { label: "Retiro en" },
    destination: { label: "Entrega en" },
    readyAt: { label: "Listo para retirar" },
    deliverBy: { label: "Entregar antes de" },
    window: {
      label: "Ventana de ingreso",
      options: [
        { value: "morning", label: "06:00 – 09:00" },
        { value: "evening", label: "17:30 – 19:00" },
        { value: "any", label: "Cualquier horario" },
      ],
    },
  },

  requirements: {
    eyebrow: "Requisitos especiales",
    options: [
      { id: "hazardous", label: "Carga peligrosa (IMO / ONU)" },
      { id: "refrigerated", label: "Refrigerada / cadena de frío" },
      { id: "crane", label: "Requiere hidrogrúa o autoelevador" },
      { id: "oversized", label: "Sobredimensionada / con escolta" },
      { id: "site-access", label: "Acceso autorizado al yacimiento" },
      { id: "hse", label: "Inducción HSE de la operadora" },
    ],
    notes: {
      label: "Notas para el transportista",
      optional: "(opcional)",
      placeholder: "Ej: los pallets se retiran por portón 3, presentarse con remito y DNI.",
    },
  },

  tiers: {
    eyebrow: "Urgencia y visibilidad",
    intro:
      "Define el fee de esta publicación. No hay comisión sobre el flete en ninguno de los dos casos.",
    options: [
      {
        id: "standard",
        name: "Estándar",
        fee: 19,
        price: "USD 19",
        body: "Visible 7 días a todos los transportistas de la ruta. Para carga con fecha flexible.",
        summaryName: "Estándar",
        visibility: "7 días en el listado",
      },
      {
        id: "featured",
        name: "Destacada",
        fee: 39,
        price: "USD 39",
        body: "Tope del listado 48 h + aviso a transportistas con desvío de hasta 80 km.",
        summaryName: "Destacada · urgente",
        visibility: "Tope 48 h + aviso",
      },
    ],
  },

  summary: {
    eyebrow: "Resumen de la publicación",
    emptyRoute: "Elegí origen y destino",
    /** Filled from live form state; each row shows an em dash until then. */
    rows: [
      { id: "cargo", label: "Carga" },
      { id: "space", label: "Espacio requerido" },
      { id: "pickup", label: "Retiro" },
    ],
    tierLabel: "Tipo",
    visibilityLabel: "Visibilidad",
    feeLabel: "Fee de publicación",
    taxLabel: "IVA 21%",
    commissionLabel: "Comisión sobre el flete",
    commissionValue: "0%",
    totalLabel: "Total a pagar hoy",
    paymentMethodLabel: "Medio de pago",
    paymentMethodEmpty: "Todavía no configuraste un medio de pago",
    changePayment: "Configurar",
    submitLead: "Pagar ",
    submitTail: " y publicar",
    saveDraft: "Guardar borrador",
    creditNote:
      "Si la publicación vence sin ninguna postulación, el fee vuelve como crédito para la próxima.",
  },

  usage: {
    eyebrow: "Consumo del mes",
    empty: "Todavía no publicaste cargas este mes.",
  },
} as const;
