# Vaca Muerta Logística

> Working name — confirm final product/brand name before scaffolding. All naming below (routes, tables, copy keys) should be easy to rename later.

## Overview
Vaca Muerta Logística is a two-sided marketplace connecting long-distance truck drivers (transportistas) who have available cargo space with oil and gas companies (empresas) that need to move equipment, supplies, materials, and tools to and from field locations. The platform is scoped exclusively to the oil and gas logistics sector operating in and around Vaca Muerta, Neuquén, Argentina — Añelo, Rincón de los Sauces, Cutral Có, and the surrounding yacimientos, campamentos, and operational bases. It is not a general freight marketplace: every location, route, and cargo type is framed around this one region and this one industry.

## Goals
- Reduce empty-leg trips for transportistas by surfacing cargo that aligns with routes they're already driving.
- Give empresas a fast, low-friction way to publish a cargo need and reach available capacity without negotiating a broker relationship first.
- Make Vaca Muerta's operational geography (yacimientos, bases, campamentos) a first-class part of the product, not an afterthought bolted onto a generic city-to-city freight tool.
- Establish a sustainable, low-complexity monetization model (fixed listing fee) that doesn't require the platform to arbitrate freight pricing or take on commission risk.
- Meet the sector's real communication habits — WhatsApp-first — rather than assuming users will live inside a web dashboard for time-sensitive updates.
- Ship a modular monolith that a small team can operate and extend without premature distributed-systems complexity.

## Core User Flow
1. An empresa lands on the marketing site, understands the value proposition (post a cargo, reach available trucks), and signs up as an "Empresa."
2. The empresa publishes a carga: origin, destination (picked from the Vaca Muerta location catalog), cargo type/description, needed dates, and any urgency flag.
3. The empresa pays the fixed listing fee via Mercado Pago; only after payment confirmation does the carga become publicly searchable.
4. A transportista, who has separately signed up and published a viaje (route + available capacity + dates) or is browsing directly, searches/filters cargas by route, region, or dates and finds a match.
5. The transportista contacts the empresa (in-app postulación, which triggers a WhatsApp Business API notification to the empresa) to coordinate.
6. The empresa reviews interested transportistas in their dashboard, confirms one, and the carga moves to a confirmed/in-progress state.
7. Both sides track the carga/viaje status from their role-specific dashboard until it's marked complete.

## Features

### Cargo & Trip Publishing and Matching
- Empresas publish paid cargo listings (cargas) with origin, destination, cargo details, and timing.
- Transportistas publish free trip listings (viajes) describing an existing route and available capacity.
- Search/browse view lets either side filter by region, route proximity, and dates to find aligned listings.
- A trip detail view shows full route, cargo/capacity details, and a map with the specific origin/destination pins.
- Postulación/contact flow connects a transportista to a carga (or vice versa) and triggers a WhatsApp notification.
- Role-differentiated dashboard shows an empresa their published cargas and incoming postulaciones, and shows a transportista their published viajes and outgoing postulaciones.

### Starter System Designs
- **Users** — role-gated as `transportista` or `empresa`; role is set at signup and drives which forms, dashboard views, and payment paths are available.
- **Viajes** — a transportista's published route: origin, destination, available capacity, travel dates. Free to publish.
- **Cargas** — an empresa's published cargo need: origin, destination, cargo description, needed dates, urgency flag. Requires a paid listing fee before becoming searchable.
- **Ubicaciones** — a curated, *extensible* catalog of Vaca Muerta locations with PostGIS coordinates; both viajes and cargas reference this catalog rather than accepting free-text locations. Seeded with the base cities (Rincón de los Sauces, Cutral Có, Neuquén, Añelo, Centenario, Cipolletti, Catriel, El Chañar, Plottier) and known yacimientos (e.g. Loma Campana). Any user — admin or a transportista/empresa publishing a viaje/carga — can add a new yacimiento or ciudad by name and geographic location if it's missing from the catalog. Only administrators can edit or delete catalog entries afterward.
- **Postulaciones** — the connection/contact record between a viaje and a carga (or a direct contact initiated by either role), which is what triggers notifications and appears in both dashboards.

## Scope

### In Scope
- Two public role types (transportista, empresa) with differentiated signup, publishing forms, and dashboards, plus a minimal `admin` role scoped only to moderating the ubicaciones catalog (see below).
- Publishing, searching, and browsing viajes and cargas scoped to the Vaca Muerta region.
- Fixed-fee payment flow for empresas publishing a carga, via Mercado Pago.
- A map view (search/browse and detail pages) showing simplified, color-coded straight-line routes between catalog locations.
- WhatsApp Business API notifications for key events (new postulación, payment confirmed, match confirmed), with email as a fallback channel.
- A trip/cargo detail page and a role-differentiated dashboard.
- An extensible ubicaciones catalog: any authenticated user (transportista, empresa, or admin) can add a missing yacimiento or ciudad (name + geographic location) while publishing a viaje/carga; only admins can edit or delete existing catalog entries.

### Out Of Scope
- Freight pricing negotiation, bidding, or commission-based transactions — the platform never takes a cut of freight value.
- Turn-by-turn routing, live GPS tracking, or ETAs calculated via a routing API.
- Operating outside the Vaca Muerta region or outside the oil and gas logistics sector.
- General cargo/freight types unrelated to oil and gas field logistics (equipment, supplies, materials, tools only).
- A full admin back-office UI covering users, cargas, viajes, payments, etc. — the only admin surface in scope right now is managing (edit/delete) ubicaciones catalog entries.
- Stripe as a live payment path — it exists only as a documented enterprise fallback, not something to build now unless explicitly requested.

## Success Criteria
- An empresa can complete the full flow — sign up, publish a carga, pay via Mercado Pago, and see it appear as searchable — without needing developer intervention.
- A transportista can sign up, publish a free viaje, and find and contact a matching carga entirely through search/filter, with no manual matching by staff.
- A carga never appears in public search results before its payment is confirmed (verifiable directly against the database state).
- The map on the search/browse and detail views renders color-coded straight-line routes using only the fixed location catalog — no external routing API calls happen at runtime.
- A postulación event reliably produces a WhatsApp notification (or email fallback if WhatsApp delivery fails) to the receiving party.
