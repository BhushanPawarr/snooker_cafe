import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const tableCount = await prisma.table.count();
  if (tableCount === 0) {
    await prisma.table.createMany({
      data: [
        { name: "Table 1", hourlyRate: 150 },
        { name: "Table 2", hourlyRate: 150 },
        { name: "Table 3", hourlyRate: 150 },
        { name: "Table 4", hourlyRate: 200 },
        { name: "Table 5", hourlyRate: 200 },
        { name: "Table 6", hourlyRate: 250 },
      ],
    });
    console.log("Seeded 6 placeholder tables.");
  }

  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "cafe12345";

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { username },
  });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.adminUser.create({ data: { username, passwordHash } });
    console.log(`Seeded admin user "${username}" (password from .env).`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
