import {
  createWorkstationSetting,
  getAllWorkstationSettings,
  getWorkstationSettingById,
  getWorkstationSettingByTitle,
} from "../models/workstationSetting.js";
import { getScreenById } from "../models/screen.js";
import {
  internalError,
  notFound,
  missingBody,
} from "../utils/defaultResponses.js";

const create = async (req, res) => {
  const { title, description, screens } = req.body;

  if (!title) {
    return missingBody(res);
  }

  const titleExists = await getWorkstationSettingByTitle(title);
  if (titleExists) {
    return res.status(409).json({
      error: {
        message: "Workstation Setting with entered Title already exists.",
      },
    });
  }

  // Check if each screen exists
  const screensChecked = await Promise.all(
    screens.map(async (screenId) => await getScreenById(screenId))
  ).then((screensChecked) => screensChecked);
  if (screensChecked.some((screen) => screen === null)) {
    return notFound(res, "One or more screens do not exist.");
  }

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
};

const getAll = async (req, res) => {
  try {
    const workstationSettings = await getAllWorkstationSettings();
    return res.status(200).json({ workstationSettings: workstationSettings });
  } catch (error) {
    console.error("Error fetching all workstationSettings: ", error);
    return internalError(res, "Error while getting all workstationSettings.");
  }
};

const getById = async (req, res) => {
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
};

export const WorkstationSettingController = { create, getAll, getById };
