import {
  internalError,
  missingBody,
  wrongBody,
} from "../utils/defaultResponses.js";
import {
  createTimeRecord,
  getLastRecord,
  updateLastTimeRecord,
} from "../models/staffTimesheet.js";

export async function autoClock(req, res) {
  const { staffId, imageUrl, currentTime } = req.body;

  if (!staffId || !imageUrl || !currentTime) {
    return missingBody(res);
  }

  // Verify if in UTC format
  const dateObject = new Date(currentTime);
  if (isNaN(dateObject) || dateObject.getTimezoneOffset() !== 0) {
    return wrongBody(res);
  }

  // 🔵 Get Last Record
  const lastRecord = await getLastRecord(staffId);

  // 🟢 No Record: CREATE / IN
  if (!lastRecord) {
    const clockedInRecord = await createTimeRecord({
      staffId,
      imageUrl,
      time: currentTime,
    });
    if (!clockedInRecord) {
      return internalError(res, "Error while creating timesheet record.");
    }

    return res
      .status(201)
      .json({ autoRecord: { ...clockedInRecord }, clockedIn: true });
  }

  // 🔴 Found Record: UPDATE / OUT
  const clockedOutRecord = await updateLastTimeRecord(
    lastRecord.id,
    currentTime
  );
  if (!clockedOutRecord) {
    return internalError(res, "Error while updating timesheet record.");
  }

  return res
    .status(201)
    .json({ autoRecord: { ...clockedOutRecord }, clockedIn: false });
}

export async function clockIn(req, res) {
  const { staffId, imageUrl, clockInTime } = req.body;

  if (!staffId || !imageUrl || !clockInTime) {
    return missingBody(res);
  }

  // Verify if in UTC format
  const dateObject = new Date(clockInTime);
  if (isNaN(dateObject) || dateObject.getTimezoneOffset() !== 0) {
    return wrongBody(res);
  }

  const clockedInRecord = await createTimeRecord({
    staffId,
    imageUrl,
    time: clockInTime,
  });
  if (!clockedInRecord) {
    return internalError(res, "Error while creating timesheet record.");
  }

  return res.status(201).json({ clockedInRecord: { ...clockedInRecord } });
}

export async function clockOut(req, res) {
  const { staffTimesheetId, staffId, imageUrl, clockOutTime } = req.body;

  if (!staffTimesheetId || !staffId || !imageUrl || !clockOutTime) {
    return missingBody(res);
  }

  // Verify if in UTC format
  const dateObject = new Date(clockOutTime);
  if (isNaN(dateObject) || dateObject.getTimezoneOffset() !== 0) {
    return wrongBody(res);
  }

  const clockedInRecord = await createTimeRecord({
    staffId,
    imageUrl,
    time: clockOutTime,
  });
  if (!clockedInRecord) {
    return internalError(res, "Error while creating timesheet record.");
  }

  return res.status(201).json({ clockedInRecord: { ...clockedInRecord } });
}
