import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
      include: {
        info: true,
      },
    });

    delete createdStaff.passwordHash;
    return createdStaff;
  } catch (err) {
    console.error(err);
    throw err;
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
    console.error(err);
    throw err;
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
      where: {
        id: staffId,
      },
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
    console.error(err);
    throw err;
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
      where: {
        username: staffUsername,
      },
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
    console.error(err);
    throw err;
  }
}

/**
 * @param {Int} staffId
 * @param {{username:String, passwordHash:String, firstName:String, lastName:String}} data
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
      include: {
        info: true,
      },
    });

    delete updatedStaff.passwordHash;
    return updatedStaff;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function updatePasswordById(staffId, passwordHash) {
  try {
    const updatedStaff = await prisma.staff.update({
      where: {
        id: staffId,
      },
      data: {
        passwordHash,
      },
    });

    delete updatedStaff.passwordHash;
    return updatedStaff;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteById(staffId) {
  try {
    const deletedStaff = await prisma.staff.delete({
      where: { id: staffId },
    });
    return deletedStaff;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const StaffModel = {
  create,
  getAll,
  getById,
  getByUsername,
  updateById,
  updatePasswordById,
  deleteById,
};
