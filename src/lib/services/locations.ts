import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db/client";
import type { CatalogLocation } from "@/lib/locations";

/** Prisma error codes that mean "the database is unreachable", not "the query is wrong". */
const CONNECTION_ERROR_CODES = new Set(["P1000", "P1001", "P1002", "P1003", "P1017"]);

/**
 * The shared Vaca Muerta locations catalog (architecture-context.md, Location
 * Catalog Model). Cities and yacimientos live in the same table and are told
 * apart by `type`; both are readable by everyone.
 *
 * While no database is provisioned (`DATABASE_URL` is still the placeholder),
 * an unreachable server resolves to an empty catalog so the map and the filters
 * render their empty states instead of crashing the page. Query errors still
 * throw — only connection failures are absorbed.
 */
export async function listLocations(): Promise<CatalogLocation[]> {
  try {
    return await prisma.location.findMany({
      select: { id: true, name: true, type: true, latitude: true, longitude: true },
      orderBy: [{ type: "asc" }, { name: "asc" }],
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      CONNECTION_ERROR_CODES.has(error.code)
    ) {
      console.warn(
        `[locations] database unreachable (${error.code}) — serving an empty catalog. Point DATABASE_URL at the Supabase Postgres instance and run \`prisma db seed\`.`
      );
      return [];
    }
    throw error;
  }
}
