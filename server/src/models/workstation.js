import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// TODO: Transform whole file into one object export as in the controllers/

export async function createWorkstation(data) {
  return await prisma.workstation.create({
    data: {
      title: data.title,
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
  });
}

export async function getAllWorkstations(includeInfo = true) {
  return await prisma.workstation.findMany({
    include: {
      info: includeInfo,
    },
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

export async function updateWorkstation(workstationId, data) {
  return await prisma.workstation.update({
    where: {
      id: workstationId,
    },
    data: {
      title: data.title,
      info: {
        update: {
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
  });
}

export async function deleteWorkstation(workstationId) {
  return await prisma.workstation.delete({
    where: {
      id: workstationId,
    },
  });
}
