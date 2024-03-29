import {
  createWorkstationSetting,
  getAllWorkstationSettings,
  getWorkstationSettingById,
  getWorkstationSettingByTitle,
} from "../models/workstationSetting.js";
import { AppModel } from "../models/appModel.js";
import { Responses } from "../utils/responsesUtils.js";

//TODO: Remove Setting

/**
 *
 * @param {{body:{title:"string",description:"string",apps:[1,2,3]}}} req - `Express Request` with a json body
 * @param {Express.Response} res
 * @returns {createdWorkstationSetting}
 */
const create = async (req, res) => {
  const { title, description, apps } = req.body;

  if (!title) {
    return Responses.missingBody(res);
  }

  const titleExists = await getWorkstationSettingByTitle(title);
  if (titleExists) {
    return Responses.conflict(
      res,
      "Workstation Setting with entered Title already exists."
    );
  }

  // Check if each app exists
  const appsChecked = await Promise.all(
    apps.map(async (appId) => await AppModel.getById(appId))
  ).then((appsChecked) => appsChecked);
  if (appsChecked.some((app) => app == null)) {
    return Responses.wrongBody(res, "One or more apps do not exist.");
  }

  const createdWorkstationSetting = await createWorkstationSetting({
    title,
    description,
    apps,
  });
  if (!createdWorkstationSetting) {
    return Responses.internalError(
      res,
      "Error while creating workstation setting."
    );
  }

  return res.status(201).json({ createdWorkstationSetting });
};

const getAll = async (req, res) => {
  try {
    const workstationSettings = await getAllWorkstationSettings();
    return res.status(200).json({ workstationSettings: workstationSettings });
  } catch (error) {
    console.error("Error fetching all workstationSettings: ", error);
    return Responses.internalError(
      res,
      "Error while getting all workstationSettings."
    );
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
      return Responses.notFound(res);
    }
    return res.status(200).json({ workstationSetting: workstationSetting });
  } catch (error) {
    console.error("Error fetching workstation setting by Id: ", error);
    return Responses.internalError(
      "Error while getting workstation setting by id."
    );
  }
};

export const WorkstationSettingController = { create, getAll, getById };
