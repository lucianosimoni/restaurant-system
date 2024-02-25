import { PrismaClient } from "@prisma/client";
import { Errors } from "../utils/errorsUtils.js";
const prisma = new PrismaClient();

async function exist(field, value) {
  try {
    const countedField = await prisma.staffTimesheet.count({
      where: { [field]: value },
    });
    return countedField > 0;
  } catch (err) {
    throw Errors.checkDatabaseError(err);
  }
}

/**
 * @param {{imageInUrl:String, timeIn:Date, staffId:String}} data
 */
async function create(data) {
  console.log("data in timesheet model is:");
  console.log(data);
  try {
    const createdRecord = await prisma.staffTimesheet.create({
      data: {
        imageInUrl: data.imageInUrl,
        timeIn: data.timeIn,
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
    throw Errors.checkDatabaseError(err, "creating a timesheet");
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
    throw Errors.checkDatabaseError(err, "getting all timesheet by staff id");
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
    throw Errors.checkDatabaseError(err, "getting last timesheet by staff id");
  }
}

/**
 * @param {String} staffTimesheetId
 * @param {Boolean} isClockIn
 * @param {{imageOutUrl:String, timeOut:Date}} data
 */
async function updateById(staffTimesheetId, isClockIn, data) {
  if (isClockIn) {
    try {
      const updatedRecord = await prisma.staffTimesheet.update({
        where: { id: staffTimesheetId },
        data: { imageInUrl: data.imageUrl, timeIn: data.time },
      });

      return updatedRecord;
    } catch (err) {
      throw Errors.checkDatabaseError(
        err,
        "updating clockIn timesheet by staff id"
      );
    }
  }

  try {
    const updatedRecord = await prisma.staffTimesheet.update({
      where: { id: staffTimesheetId },
      data: { imageOutUrl: data.imageUrl, timeOut: data.time },
    });

    return updatedRecord;
  } catch (err) {
    throw Errors.checkDatabaseError(
      err,
      "updating clockOut timesheet by staff id"
    );
  }
}

async function deleteById(staffTimesheetId) {
  try {
    const deletedRecord = await prisma.staffTimesheet.delete({
      where: { id: staffTimesheetId },
    });

    return deletedRecord;
  } catch (err) {
    throw Errors.checkDatabaseError(err, "deleting timesheet by id");
  }
}

export const StaffTimesheetModel = {
  exist,
  create,
  getAllByStaffId,
  getLastByStaffId,
  updateById,
  deleteById,
};
