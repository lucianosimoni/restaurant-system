import { WorkstationModel } from "../models/workstationModel.js";
import { AppModel } from "../models/appModel.js";
import { Responses } from "../utils/responsesUtils.js";

import jwt from "jsonwebtoken";
import { StaffModel } from "../models/staffModel.js";

/**
 * @param {{body:{title:"string",description:"string",usableApps:[1,2,3]}}} req - `Express Request` with a json body
 * @param {Express.Response} res
 * @returns {createdWorkstationSetting}
 */
async function create(req, res) {
  const { title, usableApps, authenticatedById, description, imageUrl } =
    req.body;

  const titleExists = await WorkstationModel.exist("title", title);
  if (titleExists)
    return Responses.conflict(res, "Workstation Title already exists.");

  // Reduce to array to Unique to avoid dDos attacks.
  const uniqueAppIds = usableApps.filter(
    (appId, index) => usableApps.indexOf(appId) == index
  );
  for (const appId of uniqueAppIds) {
    const appExists = await AppModel.exist("id", appId);
    if (!appExists)
      return Responses.wrongBody(res, "One or more apps do not exist.");
  }

  const staffExists = await StaffModel.exist(
    "authenticatedBy",
    authenticatedById
  );
  if (!staffExists) return Responses.wrongBody(res, "Staff id does not exist.");

  const workstation = await WorkstationModel.create({
    title: title,
    usableApps: usableApps,
    description: description ? description : null,
    imageUrl: imageUrl ? imageUrl : null,
  });
  if (!workstation)
    return Responses.internalError(
      res,
      "Internal error while creating the workstation."
    );

  const token = jwt.sign(
    { workstationId: workstation.id },
    process.env.JWT_SECRET_KEY
  );
  res.status(201).json({
    createdWorkstation: {
      ...workstation,
      token,
    },
  });
}

async function getAll(req, res) {
  try {
    const includeInfo = req.query["include-info"] === "true";
    const workstations = await await WorkstationModel.getAll(includeInfo);

    return res.status(200).json({ workstations: workstations });
  } catch (err) {
    console.error(err);
    return Responses.internalError(res, "Error getting all workstations.");
  }
}

async function getById(req, res) {
  const workstationId = parseInt(req.params.workstationId);

  if (!workstationId)
    return Responses.wrongParams(res, "Invalid workstationId param.");

  try {
    const includeInfo = req.query["include-info"] === "true";
    const workstation = await WorkstationModel.getById(
      workstationId,
      includeInfo
    );
    if (!workstation) return Responses.notFound(res);

    return res.status(200).json({ workstation: workstation });
  } catch (err) {
    console.error(err);
    return Responses.internalError("Error getting workstation by id.");
  }
}

async function updateById(req, res) {
  const workstationId = parseInt(req.params.workstationId);
  const { title, description, imageUrl, usableApps } = req.body;

  if (!workstationId)
    return Responses.wrongParams(res, "Invalid workstationId param.");

  try {
    const updatedWorkstation = await WorkstationModel.updateById(
      workstationId,
      { title, description, imageUrl, usableApps }
    );

    res.status(200).json({ updatedWorkstation });
  } catch (err) {
    console.error(err);
    return Responses.internalError(res, "Error updating workstation by id.");
  }
}

async function deleteById(req, res) {
  const workstationId = parseInt(req.params.workstationId);

  if (!workstationId)
    return Responses.wrongParams(res, "Invalid workstationId param.");

  try {
    const deletedWorkstation = await WorkstationModel.deleteById(workstationId);

    res.status(204).json({ deletedWorkstation });
  } catch (err) {
    console.error(err);
    return Responses.internalError(res, "Error while deleting workstation.");
  }
}

export const WorkstationController = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
