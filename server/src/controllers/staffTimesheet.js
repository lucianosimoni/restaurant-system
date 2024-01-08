import { missingBody } from "../utils/defaultResponses";
import { createTimeRecord } from "../models/staffTimesheet";

export async function registerTimeIn(req, res) {
  const { staffId, imageUrl, timeIn } = req.body;

  if (!staffId || !imageUrl || !timeIn) {
    return missingBody(res);
  }

  const record = createTimeRecord({ staffId, imageUrl, timeIn });
  if (!record)
    return res.status(500).json({ error: { message: "An error occurred." } });

  res.status(201).json({ createdRecord: { ...record } });
}
