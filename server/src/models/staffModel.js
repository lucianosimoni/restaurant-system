import { PrismaClient } from "@prisma/client";
import { Errors } from "../utils/errorsUtils.js";
const prisma = new PrismaClient();

async function exist(field, value) {
  try {
    const countedField = await prisma.staff.count({
      where: { [field]: value },
    });
    return countedField > 0;
  } catch (err) {
    throw Errors.checkDatabaseError(err);
  }
}

/**
 * @param {{username:String, passwordHash:String, firstName:String, lastName:String}} data
 */
async function create(data) {
  try {
    const createdStaff = await prisma.staff.create({
      data: {
        username: data.username,
        passwordHash: data.passwordHash,
        info: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
        },
      },
      include: { info: true },
    });

    delete createdStaff.passwordHash;
    return createdStaff;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "creating staff");
  }
}

async function getAll(
  includeInfo = true,
  includeTimesheet = false,
  includeSector = false,
  includeSectorLeader = false
) {
  try {
    const allStaff = await prisma.staff.findMany({
      include: {
        info: includeInfo,
        sector: includeSector,
        timesheet: includeTimesheet,
        sectorLeader: includeSectorLeader,
      },
    });

    const sanitizedStaff = allStaff.map((staff) => {
      const { passwordHash, ...sanitizedData } = staff;
      return sanitizedData;
    });

    return sanitizedStaff;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "getting all staff");
  }
}

async function getById(
  staffId,
  includeInfo = true,
  includeTimesheet = true,
  includeSector = true,
  includeSectorLeader = true
) {
  try {
    const staff = await prisma.staff.findUnique({
      where: { id: staffId },
      include: {
        info: includeInfo,
        sector: includeSector,
        timesheet: includeTimesheet,
        sectorLeader: includeSectorLeader,
      },
    });

    delete staff.passwordHash;
    return staff;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "getting staff by id");
  }
}

async function getByUsername(
  staffUsername,
  includeInfo = true,
  includeTimesheet = false,
  includeSector = false,
  includeSectorLeader = false
) {
  try {
    const staff = await prisma.staff.findUnique({
      where: { username: staffUsername },
      include: {
        info: includeInfo,
        sector: includeSector,
        timesheet: includeTimesheet,
        sectorLeader: includeSectorLeader,
      },
    });

    // TODO: Definitly decide if removing the passwordHash is the best practice for this issue.
    // delete staff.passwordHash;
    return staff;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "getting staff by username");
  }
}

/**
 * @param {Int} staffId
 * @param {{username:String, firstName:String, lastName:String}} data
 */
async function updateById(staffId, data) {
  try {
    const updatedStaff = await prisma.staff.update({
      where: { id: staffId },
      data: {
        username: data.username,
        info: {
          update: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
        },
      },
      include: { info: true },
    });

    delete updatedStaff.passwordHash;
    return updatedStaff;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "updating staff by id");
  }
}

async function updatePasswordById(staffId, passwordHash) {
  try {
    const updatedStaff = await prisma.staff.update({
      where: { id: staffId },
      data: { passwordHash },
    });

    delete updatedStaff.passwordHash;
    return updatedStaff;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "updating staff password by id");
  }
}

async function deleteById(staffId) {
  try {
    const deletedStaff = await prisma.staff.delete({
      where: { id: staffId },
    });

    delete deletedStaff.passwordHash;
    return deletedStaff;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "deleting staff by id");
  }
}

export const StaffModel = {
  exist,
  create,
  getAll,
  getById,
  getByUsername,
  updateById,
  updatePasswordById,
  deleteById,
};
