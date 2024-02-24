import { PrismaClient } from "@prisma/client";
import { Errors } from "../utils/errorsUtils.js";
const prisma = new PrismaClient();

/**
 * @param {{imageInUrl:String, timeIn:Date, staffId:String}} data
 */
async function create(data) {
  try {
    const createdRecord = await prisma.staffTimesheet.create({
      data: {
        imageInUrl: data.imageInUrl,
        timeIn: data.time,
        staff: {
          connect: {
            id: data.staffId,
          },
        },
      },
      include: { staff: false },
    });

    return createdRecord;
  } catch (err) {
    console.error("Error creating timesheet record.", err);
    throw Errors.dbError(res);
  }
}

async function getAllByStaffId(staffId) {
  try {
    const allRecords = await prisma.staffTimesheet.findMany({
      where: { staffId: staffId },
      orderBy: { timeIn: "desc" },
    });

    return allRecords;
  } catch (err) {
    console.error("Error getting all timesheet records by staffId.", err);
    throw Errors.dbError(res);
  }
}

async function getLastByStaffId(staffId) {
  try {
    const lastRecord = await prisma.staffTimesheet.findFirst({
      where: { staffId: staffId },
      orderBy: { timeIn: "desc" },
    });

    return lastRecord;
  } catch (err) {
    console.error("Error getting last timesheet record by staffId.", err);
    throw Errors.dbError(res);
  }
}

/**
 * @param {String} staffTimesheetId
 * @param {{imageOutUrl:String, timeOut:Date}} data
 */
async function updateById(staffTimesheetId, isClockIn, data) {
  // Clock in update
  if (isClockIn) {
    try {
      const updatedRecord = await prisma.staffTimesheet.update({
        where: { id: staffTimesheetId },
        data: {
          imageInUrl: data.imageUrl,
          timeIn: data.time,
        },
      });

      return updatedRecord;
    } catch (err) {
      console.error("Error updating clockIn timesheet record by staffId.", err);
      throw Errors.dbError(res);
    }
  }
  // Clock out update
  try {
    const updatedRecord = await prisma.staffTimesheet.update({
      where: { id: staffTimesheetId },
      data: {
        imageOutUrl: data.imageUrl,
        timeOut: data.time,
      },
    });

    return updatedRecord;
  } catch (err) {
    console.error("Error updating clockOut timesheet record by staffId.", err);
    throw Errors.dbError(res);
  }
}

async function deleteById(staffTimesheetId) {
  try {
    const deletedRecord = await prisma.staffTimesheet.delete({
      where: { id: staffTimesheetId },
    });

    return deletedRecord;
  } catch (err) {
    console.error("Error deleting timesheet record by id.", err);
    throw Errors.dbError(res);
  }
}

export const StaffTimesheetModel = {
  create,
  getAllByStaffId,
  getLastByStaffId,
  updateById,
  deleteById,
};
