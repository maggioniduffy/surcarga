import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const ciudades = [
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

const yacimientos = [{ name: "Loma Campana", latitude: -38.5167, longitude: -69.05 }] as const;

async function main() {
  for (const ciudad of ciudades) {
    await prisma.ubicacion.upsert({
      where: { name: ciudad.name },
      update: {},
      create: { ...ciudad, type: "ciudad" },
    });
  }

  for (const yacimiento of yacimientos) {
    await prisma.ubicacion.upsert({
      where: { name: yacimiento.name },
      update: {},
      create: { ...yacimiento, type: "yacimiento" },
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
