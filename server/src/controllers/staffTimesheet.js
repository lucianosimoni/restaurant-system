import {
  internalError,
  missingBody,
  wrongBody,
} from "../utils/defaultResponses.js";
import {
  createTimeRecord,
  getLastRecord,
  updateTimeRecord,
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

  // 🔴 No Record: Create
  if (!lastRecord) {
    const createdRecord = await createTimeRecord({
      staffId,
      imageUrl,
      currentTime,
    });
    if (!createdRecord) {
      return internalError(res, "Error while creating timesheet record.");
    }

    return res.status(201).json({ createdRecord: { ...createdRecord } });
  }

  // 🟢 Found Record: Update
  const updatedRecord = await updateTimeRecord(lastRecord.id, currentTime);
  if (!updatedRecord) {
    return internalError(res, "Error while updating timesheet record.");
  }

  res.status(201).json({ updatedRecord: { ...updatedRecord } });
}
