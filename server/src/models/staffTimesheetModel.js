import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @param {{imageInUrl:String, timeIn:Date, staffId:String}} data
 */
async function create(data) {
  try {
    const createdRecord = await prisma.staffTimesheet.create({
      data: {
        imageInUrl: data.imageUrl,
        timeIn: data.time,
        staff: {
          connect: {
            id: data.staffId,
          },
        },
      },
      include: {
        staff: false,
      },
    });

    return createdRecord;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getAllByStaffId(staffId) {
  try {
    const allRecords = await prisma.staffTimesheet.findMany({
      where: {
        staffId: staffId,
      },
      orderBy: {
        timeIn: "desc",
      },
    });
    return allRecords;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getLastByStaffId(staffId) {
  try {
  } catch (err) {
    console.error(err);
    throw err;
  }
  return await prisma.staffTimesheet.findFirst({
    where: {
      staffId: staffId,
    },
    orderBy: {
      timeIn: "desc",
    },
  });
}

/**
 * @param {String} staffTimesheetId
 * @param {{imageOutUrl:String, timeOut:Date}} data
 */
async function updateById(staffTimesheetId, data) {
  return await prisma.staffTimesheet.update({
    where: { id: staffTimesheetId },
    data: {
      imageOutUrl: data.imageUrl,
      timeOut: data.time,
    },
  });
}

async function deleteById(staffTimesheetId) {
  return await prisma.staffTimesheet.delete({
    where: { id: staffTimesheetId },
  });
}

export const StaffTimesheetModel = {
  create,
  getAllByStaffId,
  getLastByStaffId,
  updateById,
  deleteById,
};
