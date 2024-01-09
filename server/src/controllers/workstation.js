import { internalError } from "../utils/defaultResponses.js";
import { getAllWorkstations } from "../models/workstation.js";

export async function getAll(req, res) {
  try {
    const includeInfo = req.query.includeInfo === "true";
    const workstations = await getAllWorkstations(includeInfo);
    return res.status(200).json({ workstations: workstations });
  } catch (error) {
    console.error("Error fetching all workstations: ", error);
    return internalError(res, "Error while getting all workstations.");
  }
}
