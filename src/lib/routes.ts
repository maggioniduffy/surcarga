/** Every in-app URL in one place, so nav copy never hardcodes a path. */
export const routes = {
  home: "/",
  dashboard: "/dashboard",
  searchTrucks: "/search-trucks",
  publishCargo: "/publish-cargo",
  publishTrip: "/publish-trip",
  trip: (id: string) => `/trips/${id}`,
} as const;
