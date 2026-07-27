export const brand = {
  name: "Surcarga",
  legalName: "Surcarga S.A.S.",
} as const;

export const landing = {
  header: {
    nav: [
      { label: "Cómo funciona", href: "#como-funciona" },
      { label: "Precios", href: "#precios" },
      { label: "Contacto", href: "#contacto" },
    ],
    locales: { active: "ES", alternate: "EN" },
    ctaTransportista: "Soy transportista",
    ctaEmpresa: "Necesito enviar carga",
  },

  hero: {
    eyebrow: "Marketplace de carga para Vaca Muerta",
    titleLead: "Tu carga, en el camión",
    titleAccent: "que ya viaja.",
    subtitle:
      "Conectamos transportistas con espacio libre en la ruta y empresas que necesitan mover equipos, insumos y herramientas a yacimientos, campamentos y bases. Sin intermediarios y sin comisión sobre el flete.",
    ctaEmpresa: "Publicar mi carga",
    ctaTransportista: "Publicar mi viaje — gratis",
    note: "Los transportistas publican gratis. Las empresas pagan un fee fijo por publicación.",
    stats: [
      { value: "38%", label: "km en vacío promedio" },
      { value: "1.240", label: "viajes publicados / mes" },
      { value: "0%", label: "comisión sobre el flete" },
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
        body: "Nadie sabe qué transporte ya está yendo al pad ni cuándo llega. Cada demora en el ingreso se paga en equipos parados.",
      },
    ],
  },

  howItWorks: {
    eyebrow: "Cómo funciona",
    title: "Dos lados, un mismo viaje.",
    transportista: {
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
    empresa: {
      title: "Para empresas",
      badge: "Fee por publicación",
      steps: [
        {
          title: "Publicás tu solicitud de carga",
          body: "Qué mandás, cuánto pesa, a dónde va y para cuándo. Pagás un fee fijo por publicación, sin mensualidad.",
        },
        {
          title: "La IA matchea transportistas en tu ruta",
          body: "Cruza ruta, ventana horaria, capacidad libre, tipo de carga y accesos autorizados al pad.",
        },
        {
          title: "Coordinás el envío directamente",
          body: "Elegís al transportista, acuerdan tarifa entre ustedes y seguís la carga hasta la entrega.",
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
        title: "Matching por ruta y ventana horaria",
        body: "Score por desvío en km, compatibilidad de carga y horario de ingreso al yacimiento.",
      },
      {
        icon: "tracking",
        title: "Seguimiento en tiempo real",
        body: "Posición, ETA al pad y aviso de demora en portería o en tramos de ripio.",
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
    ],
  },

  map: {
    eyebrow: "Mapa en tiempo real",
    title: "Camiones disponibles en la cuenca, ahora.",
    legend: [
      { label: "Alta disponibilidad", density: "high" },
      { label: "Moderada", density: "medium" },
      { label: "Baja", density: "low" },
    ],
    updatedAt: "Actualizado hace 2 min",
    nodes: {
      rincon: "Rincón de los Sauces",
      anelo: "Añelo",
      cutralCo: "Cutral Có",
      neuquen: "Neuquén Capital",
    },
    listing: {
      kicker: "Publicación reciente",
      age: "hace 4 min",
      route: "Rincón → Pad B-12",
      body: "Semi con 8 m libres, jueves 06:00. Acepta pallets, skids y herramienta liviana.",
      capacityLabel: "Espacio libre",
      capacityValue: "8 m / 9 t",
      ratingLabel: "Reputación",
      ratingValue: "4,9 ★",
      cta: "Enviar solicitud de carga",
    },
    corridors: {
      title: "Corredores activos",
      items: [
        { route: "Neuquén – Añelo", trucks: "31 camiones", density: "high" },
        { route: "Añelo – Cutral Có", trucks: "12 camiones", density: "medium" },
        { route: "Añelo – Pad A-7", trucks: "3 camiones", density: "low" },
        { route: "Rincón – Pad B-12", trucks: "18 camiones", density: "high" },
      ],
    },
  },

  testimonials: {
    eyebrow: "Testimonios",
    title: "Quienes mueven la cuenca todos los días.",
    items: [
      {
        quote:
          "Publico el viaje antes de salir y me llegan las cargas que me sirven. El flete lo arreglo yo, nadie me saca comisión.",
        initials: "HM",
        name: "Hugo Maidana",
        role: "Transportista, flota de 6 unidades",
      },
      {
        quote:
          "Pago un fee por publicación y listo. Antes contrataba un camión entero para seis pallets: la diferencia es enorme.",
        initials: "VC",
        name: "Valeria Correa",
        role: "Compras, empresa de servicios de fractura",
      },
      {
        quote:
          "Ahora sé qué transporte ya viene al pad y con qué permiso de ingreso. Dejamos de esperar sin saber.",
        initials: "DS",
        name: "Damián Sosa",
        role: "Logística de yacimiento, Añelo",
      },
    ],
  },

  pricing: {
    eyebrow: "Precios",
    title: "Pagás solo cuando publicás una carga.",
    subtitle:
      "Sin mensualidad, sin permanencia y sin comisión sobre el flete. El precio del transporte lo acuerdan las partes.",
    transportistaBanner: {
      kicker: "Transportistas",
      title: "Publicar tu viaje es gratis, siempre.",
      body: "Viajes ilimitados, alertas de carga en tu ruta y perfil con reputación. No cobramos nada sobre lo que facturás.",
      cta: "Crear cuenta de transportista",
    },
    empresaLabel: "Empresas · fee por publicación",
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
          "Matching automático por ruta y fecha",
          "Transportistas verificados",
          "Seguimiento del envío",
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
        question: "¿Funciona sin señal en los yacimientos?",
        answer:
          "Sí. La app del conductor funciona offline: guarda remitos, fotos y estados, y sincroniza al recuperar señal. En rutas de ripio sin cobertura tomamos posición vía satelital.",
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
    title: "El próximo camión a Añelo sale en 40 minutos.",
    subtitle:
      "Sumate al marketplace: publicar tu viaje es gratis y publicar tu carga cuesta un fee fijo.",
    ctaEmpresa: "Necesito enviar carga",
    ctaTransportista: "Soy transportista",
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
