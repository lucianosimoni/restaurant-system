import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @param {{title:String, path:String, description:String}} data
 */
async function create(data) {
  try {
    const createdApp = await prisma.app
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
          sectors: true,
        },
      })
      .then((createdApp) => {
        delete createdApp.passwordHash;
        return createdApp;
      });

    return createdApp;
  } catch (err) {
    throw new Error("Database error while creating new app.");
  }
}

async function getAll(includeInfo = true) {
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

async function getByTitle(appTitle, includeInfo = true) {
  return await prisma.app.findUnique({
    where: {
      title: appTitle,
    },
    include: {
      info: includeInfo,
    },
  });
}

async function getById(appId, includeInfo = true) {
  return await prisma.app.findUnique({
    where: {
      id: appId,
    },
    include: {
      info: includeInfo,
    },
  });
}

/**
 * @param {Int} appId
 * @param {{title:String, allowedSectors:Array<String>, info:{id:String, description:String} }} data
 */
async function updateById(appId, data) {
  return await prisma.app.update({
    where: { id: appId },
    data: {
      title: data.title,
      allowedSectors: data.allowedSectors,
      info: {
        update: {
          where: {
            id: data.info.id,
          },
          data: {
            description: data.info.description,
          },
        },
      },
    },
  });
}

async function deleteById(appId) {
  return await prisma.app.delete({ where: { id: appId } });
}

export const AppModel = {
  create,
  getAll,
  getByTitle,
  getById,
  updateById,
  deleteById,
};
