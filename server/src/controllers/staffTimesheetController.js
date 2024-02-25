import { StaffTimesheetModel } from "../models/staffTimesheetModel.js";
import { Responses } from "../utils/responsesUtils.js";

/**
 *
 * @param {{"...":Express.Request, body:{staffId:String,imageUrl:String,currentTime:Date}}} req
 * @param {Express.Response} res
 * @returns {{autoRecord:{id:Number;imageInUrl:String;imageOutUrl:String|null;timeIn:Date;timeOut:Date|null;staffId:Number;createdAt:Date;updatedAt:Date;},clockedIn:Boolean}}
 */
async function autoClock(req, res) {
  const { staffId, imageUrl, time } = req.body;

  const dateObject = new Date(time);
  if (isNaN(dateObject) || dateObject.getTimezoneOffset() !== 0)
    return Responses.wrongBody(res, "UTC date expected.");

  const lastRecord = await StaffTimesheetModel.getLastByStaffId(staffId);

  if (lastRecord && !lastRecord.timeOut) {
    const clockedOutRecord = await StaffTimesheetModel.updateById(
      lastRecord.id,
      false,
      { imageOutUrl: imageUrl, timeOut: time }
    );
    if (!clockedOutRecord)
      return Responses.internalError(res, "Error updating clockOut timesheet.");

    return res
      .status(201)
      .json({ autoRecord: clockedOutRecord, clockedIn: false });
  }

  const clockedInRecord = await StaffTimesheetModel.create({
    staffId,
    imageInUrl: imageUrl,
    timeIn: time,
  });
  if (!clockedInRecord)
    return Responses.internalError(res, "Error creating clockIn timesheet.");

  return res.status(201).json({ autoRecord: clockedInRecord, clockedIn: true });
}

async function clockIn(req, res) {
  const { staffId, imageInUrl, timeIn } = req.body;

  const dateObject = new Date(timeIn);
  if (isNaN(dateObject) || dateObject.getTimezoneOffset() !== 0)
    return Responses.wrongBody(res, "UTC date expected.");

  const lastRecord = await StaffTimesheetModel.getLastByStaffId(staffId);
  if (lastRecord && !lastRecord.timeOut) {
    return Responses.conflict(
      res,
      "Cannot clock in while previous timesheet is still open. Please clock out first.",
      "CLOCKOUT_PENDING"
    );
  }

  const clockedInRecord = await StaffTimesheetModel.create({
    staffId,
    imageInUrl,
    timeIn,
  });
  if (!clockedInRecord)
    return Responses.internalError(res, "Error creating clockIn timesheet.");

  return res.status(201).json({ clockedInRecord });
}

async function clockOut(req, res) {
  const { staffTimesheetId, imageOutUrl, timeOut } = req.body;

  const dateObject = new Date(clockOutTime);
  if (isNaN(dateObject) || dateObject.getTimezoneOffset() !== 0)
    return Responses.wrongBody(res, "UTC date expected.");

  try {
    const clockedOutRecord = await StaffTimesheetModel.updateById(
      staffTimesheetId,
      false,
      { staffTimesheetId, imageOutUrl, timeOut }
    );

    return res.status(201).json({ clockedOutRecord });
  } catch (err) {
    return Responses.internalError(res, "Unexpected error Clocking Out.");
  }
}

export const StaffTimesheetController = {
  autoClock,
  clockIn,
  clockOut,
};
