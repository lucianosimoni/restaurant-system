import {
  internalError,
  notFound,
  missingBody,
} from "../utils/defaultResponses.js";
import {
  createWorkstationSetting,
  getAllWorkstationSettings,
  getWorkstationSettingById,
  getWorkstationSettingByTitle,
} from "../models/workstationSetting.js";

export async function register(req, res) {
  const { title, description, screens } = req.body;

  if (!title) {
    return missingBody(res);
  }

  // TODO: Check if each screen exists

  const createdWorkstationSetting = await createWorkstationSetting({
    title,
    description,
    screens,
  });
  if (!createdWorkstationSetting) {
    return internalError(res, "Error while creating workstation setting.");
  }

  return res
    .status(201)
    .json({ createdWorkstationSetting: { ...createdWorkstationSetting } });
}

export async function getAll(req, res) {
  try {
    const workstationSettings = await getAllWorkstationSettings();
    return res.status(200).json({ workstationSettings: workstationSettings });
  } catch (error) {
    console.error("Error fetching all workstationSettings: ", error);
    return internalError(res, "Error while getting all workstationSettings.");
  }
}

export async function getById(req, res) {
  const workstationSettingId = req.params.workstationSettingId;

  if (!parseInt(workstationSettingId)) {
    return res.status(400).json({ error: "Missing workstation setting ID." });
  }

  try {
    const workstationSetting = await getWorkstationSettingById(
      parseInt(workstationSettingId)
    );
    if (!workstationSetting) {
      return notFound(res);
    }
    return res.status(200).json({ workstationSetting: workstationSetting });
  } catch (error) {
    console.error("Error fetching workstation setting by Id: ", error);
    return internalError("Error while getting workstation setting by id.");
  }
}
