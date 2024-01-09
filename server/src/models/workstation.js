import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createWorkstation(data) {
  return await prisma.workstation
    .create({
      data: {
        title: data.title,
        passwordHash: data.passwordHash,
        info: {
          create: {
            description: data.description,
            imageUrl: data.imageUrl,
          },
        },
        setting: {
          connect: {
            id: data.workstationSettingId,
          },
        },
      },
      include: {
        info: true,
        setting: true,
        sectors: true,
      },
    })
    .then((createdWorkstation) => {
      delete createdWorkstation.passwordHash;
      return createdWorkstation;
    });
}

export async function getAllWorkstations(includeInfo = true) {
  return await prisma.workstation
    .findMany({
      include: {
        info: includeInfo,
      },
    })
    .then((workstations) => {
      return workstations.map((workstation) => {
        const { passwordHash, ...sanitizedData } = workstation;
        return sanitizedData;
      });
    });
}

export async function getWorkstationByTitle(
  workstationTitle,
  includeInfo = true
) {
  return await prisma.workstation.findUnique({
    where: {
      title: workstationTitle,
    },
    include: {
      info: includeInfo,
    },
  });
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
