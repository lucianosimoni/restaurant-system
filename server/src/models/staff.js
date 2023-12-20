import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createStaff(staffData) {
  return await prisma.staff
    .create({
      data: {
        credential: staffData.credential,
        passwordHash: staffData.passwordHash,
        staffInfo: {
          create: {
            firstName: staffData.firstName,
            lastName: staffData.lastName,
          },
        },
      },
      include: {
        staffInfo: true,
      },
    })
    .then((createdStaff) => {
      delete createdStaff.passwordHash;
      return createdStaff;
    });
}

export async function getStaffById(staffId) {
  try {
    const staff = await prisma.staff.findUnique({
      where: {
        id: staffId,
      },
    });
    return staff;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getStaffByCredential(staffCredential) {
  try {
    const staff = await prisma.staff.findUnique({
      where: {
        credential: staffCredential,
      },
      include: {
        staffInfo: true,
      },
    });
    return staff;
  } catch (error) {
    console.error(error);
    return null;
  }
}
