import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// TODO: Transform whole file into one object export as in the controllers/

/**
 * @param {{imageInUrl:String, timeIn:Date, staffId:String}} data
 */
async function create(data) {
  return await prisma.staffTimesheet
    .create({
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
    })
    .then((createdRecord) => createdRecord);
}

async function getAllByStaffId(staffId) {
  return await prisma.staffTimesheet.findMany({
    where: {
      staffId: staffId,
    },
    orderBy: {
      timeIn: "desc",
    },
  });
}

async function getLastByStaffId(staffId) {
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
