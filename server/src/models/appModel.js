import { PrismaClient } from "@prisma/client";
import { Errors } from "../utils/errorsUtils.js";
const prisma = new PrismaClient();

async function exist(field, value) {
  console.log("checking app existance");
  try {
    const countedField = await prisma.app.count({ where: { [field]: value } });
    return countedField > 0;
  } catch (err) {
    throw Errors.checkDatabaseError(err);
  }
}

/**
 * @param {{title:String, path:String, description:String}} data
 */
async function create(data) {
  try {
    const createdApp = await prisma.app.create({
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
        allowedSectors: true,
        // TODO: after updt schema, add usedAtWorkstations here.
      },
    });

    delete createdApp.passwordHash;
    return createdApp;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "creating app");
  }
}

async function getAll(includeInfo = true) {
  try {
    const apps = await prisma.app.findMany({ include: { info: includeInfo } });
    // TODO: No need to sanitize the apps, right?
    // return apps.map((app) => {
    //   const { passwordHash, ...sanitizedData } = app;
    //   return sanitizedData;
    // });

    return apps;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "getting all apps by id");
  }
}

async function getByTitle(appTitle, includeInfo = true) {
  try {
    const app = await prisma.app.findUnique({
      where: { title: appTitle },
      include: { info: includeInfo },
    });

    return app;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "getting app by title");
  }
}

async function getById(appId, includeInfo = true) {
  try {
    const app = await prisma.app.findUnique({
      where: { id: appId },
      include: { info: includeInfo },
    });

    return app;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "getting app by id");
  }
}

/**
 * @param {Int} appId
 * @param {{title:String, allowedSectors:Array<String>, info:{id:String, description:String} }} data
 */
async function updateById(appId, data) {
  try {
    const updatedApp = await prisma.app.update({
      where: { id: appId },
      data: {
        title: data.title,
        allowedSectors: data.allowedSectors,
        info: {
          update: {
            where: { id: data.info.id },
            data: { description: data.info.description },
          },
        },
      },
    });

    return updatedApp;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "updating app by id");
  }
}

async function deleteById(appId) {
  try {
    const deletedApp = await prisma.app.delete({ where: { id: appId } });

    return deletedApp;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "deleting app by id");
  }
}

export const AppModel = {
  exist,
  create,
  getAll,
  getByTitle,
  getById,
  updateById,
  deleteById,
};
