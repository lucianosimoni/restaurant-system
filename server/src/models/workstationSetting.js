import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//TODO: Remove Setting

export async function createWorkstationSetting(data) {
  return await prisma.workstationSetting
    .create({
      data: {
        title: data.title,
        description: data.description,
        apps: {
          connect: data.apps?.map((appId) => ({ id: appId })) || [],
        },
      },
      include: {
        apps: true,
      },
    })
    .then((createdWorkstation) => {
      delete createdWorkstation.passwordHash;
      return createdWorkstation;
    });
}

export async function getAllWorkstationSettings() {
  return await prisma.workstationSetting.findMany();
}

export async function getWorkstationSettingByTitle(workstationSettingTitle) {
  return await prisma.workstationSetting.findUnique({
    where: {
      title: workstationSettingTitle,
    },
  });
}

export async function getWorkstationSettingById(workstationSettingId) {
  return await prisma.workstationSetting.findUnique({
    where: {
      id: workstationSettingId,
    },
    include: {
      apps: true,
    },
  });
}
