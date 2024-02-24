import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @param {*} data
 */
async function create(data) {
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

async function getAll(includeInfo = true) {
  return await prisma.workstation.findMany({
    include: {
      info: includeInfo,
    },
  });
}

async function getByTitle(workstationTitle, includeInfo = true) {
  return await prisma.workstation.findUnique({
    where: {
      title: workstationTitle,
    },
    include: {
      info: includeInfo,
    },
  });
}

async function getById(workstationId, includeInfo = true) {
  return await prisma.workstation.findUnique({
    where: {
      id: workstationId,
    },
    include: {
      info: includeInfo,
    },
  });
}

async function updateById(workstationId, data) {
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

async function deleteById(workstationId) {
  return await prisma.workstation.delete({
    where: {
      id: workstationId,
    },
  });
}

export const WorkstationModel = {
  create,
  getAll,
  getById,
  getByTitle,
  updateById,
  deleteById,
};
