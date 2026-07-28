-- Renames the Spanish domain vocabulary to English per code-standards.md
-- ("ALL CODE AND FILES MUST BE WRITTEN IN ENGLISH"). Spanish stays in the UI
-- copy under src/content/es/ only.
--
-- Written by hand as RENAMEs rather than generated: `prisma migrate diff`
-- cannot infer a rename and would emit DROP + CREATE, which destroys rows.
-- Every statement below preserves data.
--
--   ubicaciones   -> locations        viajes -> trips
--   cargas        -> cargos           postulaciones -> applications
--   Role: transportista/empresa       -> carrier/shipper
--   LocationType: ciudad/yacimiento   -> city/oilfield

-- AlterEnum: Role values
ALTER TYPE "Role" RENAME VALUE 'transportista' TO 'carrier';
ALTER TYPE "Role" RENAME VALUE 'empresa' TO 'shipper';

-- AlterEnum: LocationType values
ALTER TYPE "LocationType" RENAME VALUE 'ciudad' TO 'city';
ALTER TYPE "LocationType" RENAME VALUE 'yacimiento' TO 'oilfield';

-- AlterEnum: enum type names
ALTER TYPE "carga_status" RENAME TO "cargo_status";
ALTER TYPE "postulacion_status" RENAME TO "application_status";

-- RenameTable
ALTER TABLE "ubicaciones" RENAME TO "locations";
ALTER TABLE "viajes" RENAME TO "trips";
ALTER TABLE "cargas" RENAME TO "cargos";
ALTER TABLE "postulaciones" RENAME TO "applications";

-- RenameColumn
ALTER TABLE "applications" RENAME COLUMN "viaje_id" TO "trip_id";
ALTER TABLE "applications" RENAME COLUMN "carga_id" TO "cargo_id";
ALTER TABLE "payments" RENAME COLUMN "carga_id" TO "cargo_id";

-- RenameIndex: primary keys (Postgres keeps the old constraint name on rename)
ALTER INDEX "ubicaciones_pkey" RENAME TO "locations_pkey";
ALTER INDEX "viajes_pkey" RENAME TO "trips_pkey";
ALTER INDEX "cargas_pkey" RENAME TO "cargos_pkey";
ALTER INDEX "postulaciones_pkey" RENAME TO "applications_pkey";

-- RenameIndex: unique constraints
ALTER INDEX "ubicaciones_name_key" RENAME TO "locations_name_key";

-- RenameForeignKey
ALTER TABLE "locations" RENAME CONSTRAINT "ubicaciones_created_by_id_fkey" TO "locations_created_by_id_fkey";
ALTER TABLE "trips" RENAME CONSTRAINT "viajes_user_id_fkey" TO "trips_user_id_fkey";
ALTER TABLE "trips" RENAME CONSTRAINT "viajes_origin_id_fkey" TO "trips_origin_id_fkey";
ALTER TABLE "trips" RENAME CONSTRAINT "viajes_destination_id_fkey" TO "trips_destination_id_fkey";
ALTER TABLE "cargos" RENAME CONSTRAINT "cargas_user_id_fkey" TO "cargos_user_id_fkey";
ALTER TABLE "cargos" RENAME CONSTRAINT "cargas_origin_id_fkey" TO "cargos_origin_id_fkey";
ALTER TABLE "cargos" RENAME CONSTRAINT "cargas_destination_id_fkey" TO "cargos_destination_id_fkey";
ALTER TABLE "applications" RENAME CONSTRAINT "postulaciones_viaje_id_fkey" TO "applications_trip_id_fkey";
ALTER TABLE "applications" RENAME CONSTRAINT "postulaciones_carga_id_fkey" TO "applications_cargo_id_fkey";
ALTER TABLE "applications" RENAME CONSTRAINT "postulaciones_initiated_by_id_fkey" TO "applications_initiated_by_id_fkey";
ALTER TABLE "payments" RENAME CONSTRAINT "payments_carga_id_fkey" TO "payments_cargo_id_fkey";
