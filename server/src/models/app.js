import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// TODO: Transform whole file into one object export as in the controllers/

export async function createApp(data) {
  return await prisma.app
    .create({
      data: {
        title: data.title,
        path: data.path,
        info: {
          create: {
            description: data.description,
          },
        },
      },
      include: {
        info: true,
        // sectors: true,
        sectors: true,
      },
    })
    .then((createdApp) => {
      delete createdApp.passwordHash;
      return createdApp;
    });
}

export async function getAllApps(includeInfo = true) {
  return await prisma.app
    .findMany({
      include: {
        info: includeInfo,
      },
    })
    .then((apps) => {
      return apps.map((app) => {
        const { passwordHash, ...sanitizedData } = app;
        return sanitizedData;
      });
    });
}

export async function getAppByTitle(appTitle, includeInfo = true) {
  return await prisma.app.findUnique({
    where: {
      title: appTitle,
    },
    include: {
      info: includeInfo,
    },
  });
}

export async function getAppById(appId, includeInfo = true) {
  return await prisma.app.findUnique({
    where: {
      id: appId,
    },
    include: {
      info: includeInfo,
    },
  });
}
