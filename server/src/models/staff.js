import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createStaff(staffData) {
  return await prisma.staff
    .create({
      data: {
        username: staffData.username,
        passwordHash: staffData.passwordHash,
        info: {
          create: {
            firstName: staffData.firstName,
            lastName: staffData.lastName,
            role: staffData.role,
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

export async function getStaffById(staffId, includeInfo = true) {
  try {
    const staff = await prisma.staff.findUnique({
      where: {
        id: staffId,
      },
      include: {
        info: includeInfo,
      },
    });
    return staff;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getStaffByUsername(staffUsername, includeInfo = true) {
  try {
    const staff = await prisma.staff.findUnique({
      where: {
        username: staffUsername,
      },
      include: {
        info: includeInfo,
      },
    });
    return staff;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllStaff(includeInfo = true) {
  try {
    const allStaff = await prisma.staff.findMany({
      include: {
        info: includeInfo,
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
