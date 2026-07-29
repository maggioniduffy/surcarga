/**
 * Landing copy. Marketing sections are copy through and through; the two
 * data-backed blocks — the hero counters and the map's recent listing /
 * corridor list — only keep their labels and arrive filled from the services.
 */
export const landing = {
  header: {
    nav: [
      { label: "Cómo funciona", href: "#como-funciona" },
      { label: "Precios", href: "#precios" },
      { label: "Contacto", href: "#contacto" },
    ],
    ctaSignIn: "Ingresar",
    ctaCarrier: "Soy transportista",
    ctaShipper: "Necesito enviar carga",
    ctaDashboard: "Ir al panel",
  },

  hero: {
    eyebrow: "Marketplace de carga para Vaca Muerta",
    titleLead: "Tu carga, en el camión",
    titleAccent: "que ya viaja.",
    subtitle:
      "Conectamos transportistas con espacio libre en la ruta y empresas que necesitan mover equipos, insumos y herramientas a yacimientos, campamentos y bases. Sin intermediarios y sin comisión sobre el flete.",
    ctaShipper: "Publicar mi carga",
    ctaCarrier: "Publicar mi viaje — gratis",
    note: "Los transportistas publican gratis. Las empresas pagan un fee fijo por publicación.",
    /**
     * `value` is only set where the figure is a product fact rather than a
     * measurement — the rest come from the trips service.
     */
    stats: [
      { id: "emptyKm", label: "km en vacío promedio" },
      { id: "monthlyTrips", label: "viajes publicados / mes" },
      { id: "commission", label: "comisión sobre el flete", value: "0%" },
    ],
  },

  problem: {
    eyebrow: "El problema",
    title: "La carga espera. El camión viaja con lugar libre.",
    cards: [
      {
        kicker: "Transportista",
        title: "Viaja con media caja vacía",
        body: "Consigue el retorno por WhatsApp, a última hora y a través de terceros. El espacio que no vende lo paga él: gasoil, peajes y horas de espera.",
      },
      {
        kicker: "Empresa de servicios",
        title: "Necesita mover 6 pallets, no un flete entero",
        body: "No tiene flota propia y contratar un camión completo por una carga puntual no cierra. Termina pagando de más o postergando el envío.",
      },
      {
        kicker: "Yacimiento / operación",
        title: "Necesita el insumo a tiempo, sin visibilidad",
        body: "Nadie sabe qué transporte ya tiene viaje programado al pad ni con qué espacio libre. Cada envío que se posterga se paga en equipos parados.",
      },
    ],
  },

  howItWorks: {
    eyebrow: "Cómo funciona",
    title: "Dos lados, un mismo viaje.",
    carrier: {
      title: "Para transportistas",
      badge: "Gratis",
      steps: [
        {
          title: "Publicás tu viaje y el espacio libre",
          body: "Origen, destino, ventana horaria y capacidad disponible en metros o pallets. Sin costo, siempre.",
        },
        {
          title: "Recibís solicitudes compatibles",
          body: "Solo cargas que entran en tu unidad, en tu ruta y con las habilitaciones que ya tenés vigentes.",
        },
        {
          title: "Coordinás y cobrás directo",
          body: "El flete lo acordás y lo cobrás con la empresa. Surcarga no toca tu tarifa ni cobra comisión.",
        },
      ],
      cta: "Publicar mi viaje",
    },
    shipper: {
      title: "Para empresas",
      badge: "Fee por publicación",
      steps: [
        {
          title: "Publicás tu solicitud de carga",
          body: "Qué mandás, cuánto pesa, a dónde va y para cuándo. Pagás un fee fijo por publicación, sin mensualidad.",
        },
        {
          title: "La ven los transportistas de esa ruta",
          body: "Tu carga aparece en las búsquedas por ruta, región y fecha de quienes ya viajan por ahí, y te postulan.",
        },
        {
          title: "Coordinás el envío directamente",
          body: "Elegís al transportista, acuerdan tarifa entre ustedes y coordinan la entrega sin intermediarios.",
        },
      ],
      cta: "Publicar una carga",
    },
  },

  features: {
    eyebrow: "Funcionalidades",
    title: "Lo que hace falta para que la carga suba al camión correcto.",
    items: [
      {
        icon: "publish",
        title: "Publicación de viajes sin costo",
        body: "Rutas recurrentes guardadas y capacidad parcial. Gratis para transportistas y flotas.",
      },
      {
        icon: "matching",
        title: "Búsqueda por ruta y ventana horaria",
        body: "Filtros por origen, destino, fecha y tipo de carga para encontrar el viaje que ya pasa por ahí.",
      },
      {
        icon: "documents",
        title: "Documentación y permisos de acceso",
        body: "Seguros, RUTA, cargas peligrosas y habilitaciones por yacimiento, con vencimientos al día.",
      },
      {
        icon: "reputation",
        title: "Historial y reputación",
        body: "Calificaciones por entrega, puntualidad y estado de la carga. Verificación de CUIT y flota.",
      },
      {
        icon: "alerts",
        title: "Alertas de carga en tu ruta",
        body: "Aviso al instante cuando aparece una solicitud compatible con el viaje que ya tenés.",
      },
      {
        icon: "payment",
        title: "Fee fijo por publicación",
        body: "La empresa paga por Mercado Pago y la carga queda visible apenas se confirma el pago.",
      },
    ],
  },

  map: {
    eyebrow: "Mapa de la cuenca",
    title: "Viajes publicados con espacio libre.",
    legend: [
      { label: "Alta disponibilidad", density: "high" },
      { label: "Moderada", density: "medium" },
      { label: "Baja", density: "low" },
    ],
    empty: "Todavía no hay viajes publicados en la cuenca.",
    listing: {
      kicker: "Publicación reciente",
      capacityLabel: "Espacio libre",
      ratingLabel: "Reputación",
      cta: "Enviar solicitud de carga",
      empty: "Todavía no hay publicaciones recientes.",
    },
    corridors: {
      title: "Corredores activos",
      empty: "Todavía no hay corredores con viajes publicados.",
    },
  },

  testimonials: {
    eyebrow: "Testimonios",
    title: "Quienes mueven la cuenca todos los días.",
    empty: "Todavía no hay testimonios publicados.",
  },

  pricing: {
    eyebrow: "Precios",
    title: "Pagás solo cuando publicás una carga.",
    subtitle:
      "Sin mensualidad, sin permanencia y sin comisión sobre el flete. El precio del transporte lo acuerdan las partes.",
    carrierBanner: {
      kicker: "Transportistas",
      title: "Publicar tu viaje es gratis, siempre.",
      body: "Viajes ilimitados, alertas de carga en tu ruta y perfil con reputación. No cobramos nada sobre lo que facturás.",
      cta: "Crear cuenta de transportista",
    },
    shipperLabel: "Empresas · fee por publicación",
    tiers: [
      {
        name: "Publicación estándar",
        price: "USD 19",
        unit: "por publicación",
        body: "Para carga con fecha flexible. Visible a todos los transportistas de la ruta.",
        cta: "Publicar carga estándar",
        featured: false,
        perks: [
          "Publicación activa 7 días",
          "Visible en las búsquedas por ruta y fecha",
          "Transportistas verificados",
          "Aviso por WhatsApp en cada postulación",
        ],
      },
      {
        name: "Publicación destacada",
        badge: "Urgente",
        price: "USD 39",
        unit: "por publicación",
        body: "Para lo que tiene que salir hoy. Prioridad en el listado y mayor alcance de transportistas.",
        cta: "Publicar carga urgente",
        featured: true,
        perks: [
          "Tope del listado por 48 h",
          "Push a transportistas con desvío de hasta 80 km",
          "Carga peligrosa y sobredimensionada",
          "Soporte de coordinación por WhatsApp",
        ],
      },
    ],
    volume: {
      question: "¿Publicás más de 20 cargas por mes?",
      answer:
        "Packs de publicaciones con fee reducido para operaciones de alto volumen.",
      cta: "Ver packs por volumen →",
      href: "#contacto",
    },
  },

  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que siempre nos preguntan.",
    items: [
      {
        question: "¿Cómo se calcula el fee de publicación?",
        answer:
          "Es un monto fijo por publicación, no un porcentaje: USD 19 la estándar y USD 39 la destacada. No cambia según el valor de la carga ni según el precio del flete. Si publicás por volumen, el fee unitario baja con los packs.",
      },
      {
        question: "¿Hay comisión sobre el flete?",
        answer:
          "No. La tarifa del transporte se acuerda y se cobra directamente entre la empresa y el transportista. Surcarga solo cobra el fee de publicación.",
      },
      {
        question: "¿Cómo se verifica a los transportistas?",
        answer:
          "Validamos CUIT, titularidad de las unidades, seguro de transporte vigente, RUTA y habilitaciones especiales. Cada entrega deja calificación de puntualidad y estado de la carga en el perfil.",
      },
      {
        question: "¿Qué pasa si no encuentro transportista?",
        answer:
          "Si tu publicación vence sin ningún match, te devolvemos el fee como crédito para la próxima publicación. Sin trámite: queda acreditado en la cuenta.",
      },
    ],
  },

  finalCta: {
    eyebrow: "Empezá hoy",
    title: "Publicá tu viaje o tu carga hoy.",
    subtitle:
      "Sumate al marketplace: publicar tu viaje es gratis y publicar tu carga cuesta un fee fijo.",
    ctaShipper: "Necesito enviar carga",
    ctaCarrier: "Soy transportista",
  },

  footer: {
    tagline: "Marketplace de carga para la cuenca de Vaca Muerta. Neuquén, Argentina.",
    columns: [
      {
        title: "Transportistas",
        links: [
          { label: "Publicar un viaje", href: "#como-funciona" },
          { label: "Cargas disponibles", href: "#como-funciona" },
          { label: "Reputación", href: "#precios" },
        ],
      },
      {
        title: "Empresas",
        links: [
          { label: "Publicar una carga", href: "#como-funciona" },
          { label: "Fees y packs", href: "#precios" },
          { label: "Buscar camiones", href: "#contacto" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Términos", href: "#contacto" },
          { label: "Privacidad", href: "#contacto" },
          { label: "Seguros y coberturas", href: "#contacto" },
        ],
      },
    ],
    copyright: "© 2026 Surcarga S.A.S. Todos los derechos reservados.",
    region: "Neuquén · Añelo · Rincón de los Sauces",
  },
} as const;
