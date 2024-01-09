import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createWorkstationSetting(data) {
  return await prisma.workstationSetting
    .create({
      data: {
        title: data.title,
        description: data.description,
        screens: {
          connect: data.screens?.map((screenId) => ({ id: screenId })) || [],
        },
      },
      include: {
        screens: true,
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
      screens: true,
    },
  });
}
