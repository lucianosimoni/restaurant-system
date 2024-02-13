import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const masterStaff = await prisma.staff.upsert({
    where: { username: process.env.MASTER_USERNAME },
    update: {},
    create: {
      username: process.env.MASTER_USERNAME,
      passwordHash: process.env.MASTER_HASH,
      info: {
        create: {
          firstName: process.env.MASTER_FIRST,
          lastName: process.env.MASTER_LAST,
        },
      },
      role: process.env.MASTER_ROLE,
    },
  });
  console.log({ masterStaff });
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
