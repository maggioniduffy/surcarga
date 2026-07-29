import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const cities = [
  { name: "Rincón de los Sauces", latitude: -37.9, longitude: -68.9333 },
  { name: "Cutral Có", latitude: -38.9333, longitude: -69.2333 },
  { name: "Neuquén", latitude: -38.9516, longitude: -68.0591 },
  { name: "Añelo", latitude: -38.35, longitude: -68.7833 },
  { name: "Centenario", latitude: -38.8167, longitude: -68.1333 },
  { name: "Cipolletti", latitude: -38.9333, longitude: -67.9833 },
  { name: "Catriel", latitude: -37.9, longitude: -67.8333 },
  { name: "El Chañar", latitude: -38.75, longitude: -68.35 },
  { name: "Plottier", latitude: -38.9667, longitude: -68.2333 },
] as const;

const oilfields = [
  { name: "Loma Campana", latitude: -38.5167, longitude: -69.05 },
  { name: "Loma La Lata", latitude: -38.55, longitude: -68.75 },
] as const;

async function main() {
  for (const city of cities) {
    await prisma.location.upsert({
      where: { name: city.name },
      update: {},
      create: { ...city, type: "city" },
    });
  }

  for (const oilfield of oilfields) {
    await prisma.location.upsert({
      where: { name: oilfield.name },
      update: {},
      create: { ...oilfield, type: "oilfield" },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
