import { missingBody, wrongBody } from "../utils/defaultResponses.js";
import { createTimeRecord } from "../models/staffTimesheet.js";

export async function registerTimeIn(req, res) {
  const { staffId, imageUrl, timeIn } = req.body;

  if (!staffId || !imageUrl || !timeIn) return missingBody(res);

  const dateObject = new Date(timeIn);
  if (isNaN(dateObject) || dateObject.getTimezoneOffset() !== 0) {
    return wrongBody(res);
  }

  const record = await createTimeRecord({ staffId, imageUrl, timeIn });
  if (!record)
    return res.status(500).json({ error: { message: "An error occurred." } });

  res.status(201).json({ createdRecord: { ...record } });
}
