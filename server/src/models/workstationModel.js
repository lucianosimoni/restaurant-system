import { PrismaClient } from "@prisma/client";
import { Errors } from "../utils/errorsUtils.js";
const prisma = new PrismaClient();

async function exist(field, value) {
  try {
    const countedField = await prisma.workstation.count({
      where: { [field]: value },
    });
    return countedField > 0;
  } catch (err) {
    throw Errors.checkDatabaseError(err);
  }
}

/**
 * @param {{title:String,description:String,imageUrl:String,}} data
 */
async function create(data) {
  try {
    const createdWorkstation = await prisma.workstation.create({
      data: {
        title: data.title,
        authenticatedBy: { connect: { id: data.authenticatedBy } },
        usableApps: {
          connect: data.usableApps.map((appId) => ({ id: appId })),
        },
        info: {
          create: {
            description: data.description,
            imageUrl: data.imageUrl,
          },
        },
      },
      include: {
        info: true,
        usableApps: true,
      },
    });

    return createdWorkstation;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "creating workstation");
  }
}

async function getAll(includeInfo = true) {
  try {
    const workstations = await prisma.workstation.findMany({
      include: { info: includeInfo },
    });

    return workstations;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "getting all workstations");
  }
}

async function getByTitle(workstationTitle, includeInfo = true) {
  try {
    const workstation = await prisma.workstation.findUnique({
      where: { title: workstationTitle },
      include: { info: includeInfo },
    });

    return workstation;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "getting workstation by title");
  }
}

async function getById(workstationId, includeInfo = true) {
  try {
    const workstation = await prisma.workstation.findUnique({
      where: { id: workstationId },
      include: { info: includeInfo },
    });

    return workstation;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "getting workstation by id");
  }
}

async function updateById(workstationId, data) {
  try {
    const updatedWorkstation = await prisma.workstation.update({
      where: { id: workstationId },
      data: {
        title: data.title,
        authenticatedBy: { connect: { id: data.authenticatedBy } },
        usableApps: {
          set: [],
          connect: data.usableApps.map((appId) => ({ id: appId })),
        },
        info: {
          update: {
            description: data.description,
            imageUrl: data.imageUrl,
          },
        },
      },
      include: {
        info: true,
        usableApps: true,
      },
    });

    return updatedWorkstation;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "updating workstation by id");
  }
}

async function deleteById(workstationId) {
  try {
    const deletedWorkstation = await prisma.workstation.delete({
      where: { id: workstationId },
    });

    return deletedWorkstation;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "deleting workstation by id");
  }
}

export const WorkstationModel = {
  exist,
  create,
  getAll,
  getById,
  getByTitle,
  updateById,
  deleteById,
};
