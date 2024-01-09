import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createScreen(data) {
  return await prisma.screen
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
    .then((createdScreen) => {
      delete createdScreen.passwordHash;
      return createdScreen;
    });
}

export async function getAllScreens(includeInfo = true) {
  return await prisma.screen
    .findMany({
      include: {
        info: includeInfo,
      },
    })
    .then((screens) => {
      return screens.map((screen) => {
        const { passwordHash, ...sanitizedData } = screen;
        return sanitizedData;
      });
    });
}

export async function getScreenByTitle(screenTitle, includeInfo = true) {
  return await prisma.screen.findUnique({
    where: {
      title: screenTitle,
    },
    include: {
      info: includeInfo,
    },
  });
}

export async function getScreenById(screenId, includeInfo = true) {
  return await prisma.screen.findUnique({
    where: {
      id: screenId,
    },
    include: {
      info: includeInfo,
    },
  });
}
