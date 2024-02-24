import { StaffTimesheetModel } from "../models/staffTimesheetModel.js";
import { Responses } from "../utils/responsesUtils.js";

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {{}}
 */
async function autoClock(req, res) {
  const { staffId, imageUrl, currentTime } = req.body;

  // Verify if in UTC format
  const dateObject = new Date(currentTime);
  if (isNaN(dateObject) || dateObject.getTimezoneOffset() !== 0)
    return Responses.wrongBody(res);

  // 1/2 - Get Last Record
  const lastRecord = await StaffTimesheetModel.getLastByStaffId(staffId);

  // 2/2 - Last is pending: CLOCK OUT
  if (lastRecord && lastRecord.timeIn && !lastRecord.timeOut) {
    const clockedOutRecord = await StaffTimesheetModel.updateById(
      lastRecord.id,
      {
        imageOutUrl: imageUrl,
        timeOut: currentTime,
      }
    );
    if (!clockedOutRecord) return Responses.internalError(res);

    return res
      .status(201)
      .json({ autoRecord: clockedOutRecord, clockedIn: false });
  }

  // 2/2 - Last is filled: CLOCK IN
  const clockedInRecord = await StaffTimesheetModel.create({
    staffId,
    imageInUrl: imageUrl,
    timeIn: currentTime,
  });
  if (!clockedInRecord) return Responses.internalError(res);

  return res.status(201).json({ autoRecord: clockedInRecord, clockedIn: true });
}

async function clockIn(req, res) {
  const { staffId, imageUrl, clockInTime } = req.body;

  // Verify if in UTC format
  const dateObject = new Date(clockInTime);
  if (isNaN(dateObject) || dateObject.getTimezoneOffset() !== 0)
    return Responses.wrongBody(res);

  const clockedInRecord = await StaffTimesheetModel.create({
    staffId,
    imageInUrl: imageUrl,
    timeIn: clockInTime,
  });
  if (!clockedInRecord) return Responses.internalError(res);

  return res.status(201).json({ clockedInRecord });
}

async function clockOut(req, res) {
  const { staffTimesheetId, staffId, imageUrl, clockOutTime } = req.body;

  if (!staffTimesheetId || !staffId || !imageUrl || !clockOutTime) {
    return Responses.missingBody(res);
  }

  // Verify if in UTC format
  const dateObject = new Date(clockOutTime);
  if (isNaN(dateObject) || dateObject.getTimezoneOffset() !== 0) {
    return Responses.wrongBody(res);
  }

  const clockedOutRecord = await updateTimeRecord({
    staffTimesheetId,
    staffId,
    imageUrl,
    time: clockOutTime,
  });
  if (!clockedOutRecord) return Responses.internalError(res);

  return res.status(201).json({ clockedOutRecord });
}

export const StaffTimesheetController = {
  autoClock,
  clockIn,
  clockOut,
};
