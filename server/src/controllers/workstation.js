import { internalError, notFound } from "../utils/defaultResponses.js";
import {
  getAllWorkstations,
  getWorkstationById,
} from "../models/workstation.js";

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

export async function getById(req, res) {
  const workstationId = req.params.workstationId;

  if (!parseInt(workstationId)) {
    return res.status(400).json({ error: "Missing workstation ID." });
  }

  try {
    const includeInfo = req.query.includeInfo === "true";
    const workstation = await getWorkstationById(
      parseInt(workstationId),
      includeInfo
    );
    if (!workstation) {
      return notFound(res);
    }
    return res.status(200).json({ workstation: workstation });
  } catch (error) {
    console.error("Error fetching workstation by Id: ", error);
    return internalError("Error while getting workstation by id.");
  }
}
