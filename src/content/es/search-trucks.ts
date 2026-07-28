import { routes } from "@/lib/routes";

/**
 * Copy for the browse/search screen. Result rows are placeholder sample data
 * from the delivered design artifact until the viajes search service exists.
 */
export const searchTrucks = {
  user: { initials: "PS", name: "Petrosur SRL", meta: "Compras · Neuquén" },
  headerCta: { label: "Publicar una carga", href: routes.publishCargo },

  filters: {
    title: "Filtros",
    openLabel: "Mostrar filtros",
    clear: "Limpiar",
    destination: {
      label: "Destino",
      value: "pad-b12",
      options: [
        { value: "pad-b12", label: "Pad B-12 · Loma Campana" },
        { value: "anelo", label: "Añelo (ciudad)" },
        { value: "rincon", label: "Rincón de los Sauces" },
        { value: "cutral-co", label: "Cutral Có" },
        { value: "pad-a7", label: "Pad A-7 · Bandurria Sur" },
        { value: "lb-9", label: "Campamento LB-9" },
        { value: "base-c4", label: "Base C-4 · Añelo" },
      ],
    },
    origin: {
      label: "Origen",
      value: "neuquen",
      options: [
        { value: "neuquen", label: "Neuquén Capital" },
        { value: "any", label: "Cualquier origen" },
        { value: "plaza-huincul", label: "Plaza Huincul" },
        { value: "bahia-blanca", label: "Bahía Blanca" },
      ],
    },
    dates: { label: "Fecha de salida", from: "2026-07-27", to: "2026-07-31", fromLabel: "Desde", toLabel: "Hasta" },
    cargoTypes: {
      label: "Tipo de carga",
      options: [
        { id: "pallets", label: "Pallets", selected: true },
        { id: "skids", label: "Skids", selected: false },
        { id: "tools", label: "Herramienta", selected: false },
        { id: "pipe", label: "Tubería", selected: false },
        { id: "hazardous", label: "Peligrosa", selected: false },
        { id: "refrigerated", label: "Refrigerada", selected: false },
      ],
    },
    capacity: { label: "Capacidad libre mínima", min: 1, max: 14, value: 6, minLabel: "1 m", maxLabel: "14 m" },
    toggles: [
      { id: "pad-access", label: "Con acceso autorizado al pad", checked: true },
      { id: "verified", label: "Transportista verificado", checked: true },
      { id: "min-rating", label: "Reputación 4,5 ★ o más", checked: false },
    ],
    apply: "Aplicar filtros",
  },

  results: {
    title: "Camiones con espacio a Pad B-12",
    countLead: "24 viajes",
    countTail: " publicados entre el 27 y el 31 de julio · Neuquén → Loma Campana",
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
    loadMore: "Cargar 20 viajes más",
    actions: { request: "Enviar solicitud de carga", detail: "Ver viaje" },
    spaceLabel: "Espacio libre",
    ratingLabel: "Reputación",

    items: [
      {
        id: "VJ-4821",
        badge: "Destacado",
        featured: true,
        publishedAt: "Publicado hace 12 min",
        origin: "Neuquén Capital",
        destination: "Pad B-12",
        meta: ["Parada: Añelo (base C-4)", "Desvío 12 km", "Sale hoy 14:30"],
        tags: [
          { label: "Pallets", tone: "neutral" },
          { label: "Skids", tone: "neutral" },
          { label: "Herramienta", tone: "neutral" },
          { label: "Acceso B-12 autorizado", tone: "published" },
        ],
        space: "8 m / 9 t",
        rating: "4,9 ★",
        carrier: { initials: "HM", name: "Transportes Maidana", meta: "142 entregas · verificado" },
      },
      {
        id: "VJ-4820",
        featured: false,
        publishedAt: "Publicado hace 1 h",
        origin: "Neuquén Capital",
        destination: "Pad B-12",
        meta: ["Directo, sin paradas", "Desvío 6 km", "Sale mañana 06:00"],
        tags: [
          { label: "Pallets", tone: "neutral" },
          { label: "Tubería", tone: "neutral" },
          { label: "Acceso B-12 autorizado", tone: "published" },
        ],
        space: "12 m / 14 t",
        rating: "4,7 ★",
        carrier: { initials: "LP", name: "Logística Patagonia", meta: "89 entregas · verificado" },
      },
      {
        id: "VJ-4816",
        featured: false,
        publishedAt: "Publicado hace 3 h",
        origin: "Plaza Huincul",
        destination: "Pad B-12",
        meta: ["Parada: Añelo", "Desvío 22 km", "Sale miércoles 05:30"],
        tags: [
          { label: "Pallets", tone: "neutral" },
          { label: "Carga peligrosa", tone: "neutral" },
          { label: "Acceso en trámite", tone: "pending" },
        ],
        space: "3 m / 4 t",
        rating: "4,4 ★",
        carrier: { initials: "RS", name: "Ruta Sur Cargas", meta: "37 entregas · verificado" },
      },
      {
        id: "VJ-4809",
        featured: false,
        publishedAt: "Publicado ayer",
        origin: "Rincón de los Sauces",
        destination: "Pad B-12",
        meta: ["Parada: campamento LB-9", "Desvío 9 km", "Sale jueves 06:00"],
        tags: [
          { label: "Skids", tone: "neutral" },
          { label: "Herramienta", tone: "neutral" },
          { label: "Refrigerada", tone: "neutral" },
          { label: "Acceso B-12 autorizado", tone: "published" },
        ],
        space: "9 m / 11 t",
        rating: "5,0 ★",
        carrier: { initials: "TN", name: "Transportes Neuquén", meta: "210 entregas · verificado" },
      },
    ],

    emptyPrompt: {
      title: "¿No encontrás lo que necesitás?",
      body: "Publicá tu solicitud de carga y los transportistas de la ruta te contactan. Fee fijo por publicación, desde USD 19.",
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
    updated: "Actualizado hace 2 min",
    corridor: {
      eyebrow: "Corredor seleccionado",
      title: "Neuquén → Pad B-12",
      body: "31 camiones publicados esta semana. Desvío promedio 14 km desde Ruta 7.",
    },
    corridorTrips: {
      eyebrow: "Viajes en este corredor",
      items: [
        { id: "m-1", label: "Hoy 14:30 · 8 m libres", rating: "4,9 ★", density: "high" },
        { id: "m-2", label: "Mañana 06:00 · 12 m", rating: "4,7 ★", density: "high" },
        { id: "m-3", label: "Mié 05:30 · 3 m", rating: "4,4 ★", density: "medium" },
        { id: "m-4", label: "Jue 06:00 · 9 m", rating: "5,0 ★", density: "high" },
      ],
      cta: "Ver los 24 viajes en lista",
    },
  },
} as const;
