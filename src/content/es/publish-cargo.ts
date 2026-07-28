/**
 * Copy for the empresa-side publishing form. Fee amounts and the option lists
 * are placeholder sample data from the delivered design artifact — the real
 * ubicaciones options come from the catalog and the fee from the payment service.
 */
export const publishCargo = {
  user: { initials: "PS", name: "Petrosur SRL", meta: "Compras · Neuquén" },

  badge: "Fee fijo por publicación",
  title: "Publicá tu carga",
  subtitle:
    "Describí qué necesitás mover y a dónde. Los transportistas que ya viajan por esa ruta reciben tu solicitud.",

  steps: [
    { label: "Carga", done: true },
    { label: "Urgencia", done: true },
    { label: "Pago del fee", done: false },
  ],

  cargo: {
    eyebrow: "Qué mandás",
    description: { label: "Descripción de la carga", value: "6 pallets de bentonita + 1 skid de válvulas" },
    type: {
      label: "Tipo de carga",
      value: "pallets",
      options: [
        { value: "pallets", label: "Pallets" },
        { value: "skids", label: "Skids" },
        { value: "tools", label: "Herramienta" },
        { value: "pipe", label: "Tubería" },
        { value: "bulk-bags", label: "Bolsones" },
        { value: "full-load", label: "Equipo completo" },
      ],
    },
    packages: { label: "Cantidad de bultos", value: "7" },
    dimensions: [
      { id: "length", label: "Largo (m)", value: "6,4" },
      { id: "width", label: "Ancho (m)", value: "2,3" },
      { id: "height", label: "Alto (m)", value: "1,8" },
      { id: "weight", label: "Peso (t)", value: "7,2" },
    ],
    matchHintLead: "Entra en ",
    matchHintCount: "18 camiones",
    matchHintTail: " con espacio publicado esta semana en esa ruta.",
  },

  route: {
    eyebrow: "Origen y destino",
    origin: {
      label: "Retiro en",
      value: "neuquen-pi",
      options: [
        { value: "neuquen-pi", label: "Neuquén Capital · Parque Industrial" },
        { value: "anelo", label: "Añelo (ciudad)" },
        { value: "cutral-co", label: "Cutral Có" },
        { value: "plaza-huincul", label: "Plaza Huincul" },
      ],
    },
    destination: {
      label: "Entrega en",
      value: "pad-b12",
      options: [
        { value: "pad-b12", label: "Pad B-12 · Loma Campana" },
        { value: "pad-a7", label: "Pad A-7 · Bandurria Sur" },
        { value: "lb-9", label: "Campamento LB-9" },
        { value: "base-c4", label: "Base C-4 · Añelo" },
        { value: "rincon", label: "Rincón de los Sauces" },
      ],
    },
    readyAt: { label: "Listo para retirar", value: "2026-07-27" },
    deliverBy: { label: "Entregar antes de", value: "2026-07-29" },
    window: {
      label: "Ventana de ingreso",
      value: "evening",
      options: [
        { value: "evening", label: "17:30 – 19:00" },
        { value: "morning", label: "06:00 – 09:00" },
        { value: "any", label: "Cualquier horario" },
      ],
    },
  },

  requirements: {
    eyebrow: "Requisitos especiales",
    options: [
      { id: "hazardous", label: "Carga peligrosa (IMO / ONU)", checked: false },
      { id: "refrigerated", label: "Refrigerada / cadena de frío", checked: false },
      { id: "crane", label: "Requiere hidrogrúa o autoelevador", checked: true },
      { id: "oversized", label: "Sobredimensionada / con escolta", checked: false },
      { id: "site-access", label: "Acceso autorizado al yacimiento", checked: true },
      { id: "hse", label: "Inducción HSE de la operadora", checked: false },
    ],
    notes: {
      label: "Notas para el transportista",
      optional: "(opcional)",
      placeholder: "Ej: los pallets se retiran por portón 3, presentarse con remito y DNI.",
    },
  },

  tiers: {
    eyebrow: "Urgencia y visibilidad",
    intro: "Define el fee de esta publicación. No hay comisión sobre el flete en ninguno de los dos casos.",
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
    origin: "Neuquén",
    destination: "Pad B-12",
    rows: [
      { label: "Carga", value: "7 bultos · 7,2 t" },
      { label: "Espacio requerido", value: "6,4 m" },
      { label: "Retiro", value: "lun 27/07" },
    ],
    tierLabel: "Tipo",
    visibilityLabel: "Visibilidad",
    feeLabel: "Fee de publicación",
    taxLabel: "IVA 21%",
    commissionLabel: "Comisión sobre el flete",
    commissionValue: "0%",
    totalLabel: "Total a pagar hoy",
    paymentMethodLabel: "Medio de pago",
    paymentMethod: "Visa •••• 4417",
    changePayment: "Cambiar",
    submitLead: "Pagar ",
    submitTail: " y publicar",
    saveDraft: "Guardar borrador",
    creditNote:
      "Si la publicación vence sin ninguna postulación, el fee vuelve como crédito para la próxima.",
  },

  usage: {
    eyebrow: "Consumo del mes",
    total: "USD 152",
    detail: "en 8 publicaciones",
    body: "Con el pack de 20 publicaciones el fee unitario baja a USD 14.",
    cta: "Ver packs",
  },
} as const;
