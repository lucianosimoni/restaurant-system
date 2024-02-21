import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// TODO: Transform whole file into one object export as in the controllers/

export async function createStaff(data) {
  return await prisma.staff
    .create({
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
    })
    .then((createdStaff) => {
      delete createdStaff.passwordHash;
      return createdStaff;
    });
}

export async function getStaffById(
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
    return staff;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getStaffByUsername(
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
    return staff;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllStaff(
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
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateStaffById(staffId, data) {
  try {
    const updatedStaff = await prisma.staff.update({
      where: { id: staffId },
      data: {
        username: data.username,
        passwordHash: data.passwordHash,
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
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteStaffById(staffId) {
  try {
    const deletedStaff = await prisma.staff.delete({
      where: { id: staffId },
    });
    return deletedStaff;
  } catch (error) {
    console.error(error);
    return null;
  }
}
