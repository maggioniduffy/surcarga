import { routes } from "@/lib/routes";

/** Header/footer copy shared by every authenticated and browse screen. */
export const appShell = {
  header: {
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    homeLabel: "Ir al inicio",
  },

  /** Light/dark switch, shared by the landing header and the app header. */
  theme: {
    toggle: "Cambiar tema",
    switchToLight: "Cambiar a tema claro",
    switchToDark: "Cambiar a tema oscuro",
  },

  /** Nav sets differ by who is looking at the screen. */
  nav: {
    shipper: [
      { label: "Buscar camiones", href: routes.searchTrucks },
      { label: "Mis publicaciones", href: routes.dashboard },
      { label: "Publicar carga", href: routes.publishCargo },
    ],
    carrier: [
      { label: "Mis viajes", href: routes.dashboard },
      { label: "Cargas disponibles", href: routes.searchTrucks },
      { label: "Publicar viaje", href: routes.publishTrip },
    ],
  },

  footer: {
    links: [
      { label: "Buscar camiones", href: routes.searchTrucks },
      { label: "Publicar viaje", href: routes.publishTrip },
      { label: "Publicar carga", href: routes.publishCargo },
      { label: "Panel", href: routes.dashboard },
    ],
    region: "Neuquén · Añelo · Rincón de los Sauces",
    copyright: "© 2026 Surcarga S.A.S.",
  },
} as const;
