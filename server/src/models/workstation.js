import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllWorkstations(includeInfo = true) {
  try {
    const workstations = await prisma.workstation.findMany({
      include: {
        info: includeInfo,
      },
    });

    const sanitizedWorkstation = workstations.map((workstation) => {
      const { passwordHash, ...sanitizedData } = workstation;
      return sanitizedData;
    });

    return sanitizedWorkstation;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getWorkstationById(workstationId, includeInfo = true) {
  return await prisma.workstation.findUnique({
    where: {
      id: workstationId,
    },
    include: {
      info: includeInfo,
    },
  });
}
