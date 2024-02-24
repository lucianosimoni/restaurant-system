import { WorkstationModel } from "../models/workstationModel.js";
import { AppModel } from "../models/appModel.js";
import {
  conflict,
  internalError,
  notFound,
  wrongBody,
} from "../utils/defaultResponses.js";

import jwt from "jsonwebtoken";
import { StaffModel } from "../models/staffModel.js";

/**
 * @param {{body:{title:"string",description:"string",usableApps:[1,2,3]}}} req - `Express Request` with a json body
 * @param {Express.Response} res
 * @returns {createdWorkstationSetting}
 */
const create = async (req, res) => {
  const { title, usableApps, authenticatedById, description, imageUrl } =
    req.body;

  const titleExists = await getWorkstationByTitle(title);
  if (titleExists) {
    return conflict(res, "Workstation Title already exists.");
  }

  // TODO: Check if works
  // Check if each usable app ID exists
  const appsChecked = await Promise.all(
    usableApps.map(async (appId) => await AppModel.getById(appId))
  ).then((appsChecked) => appsChecked);
  if (appsChecked.some((app) => app == null)) {
    return wrongBody(res, "One or more usableApps do not exist.");
  }

  // TODO: Check if works
  const staffAuthenticated = await StaffModel.getById(authenticatedById);
  if (!staffAuthenticated) {
    return wrongBody(res, "Body argument authenticatedById does not exist.");
  }

  const workstation = await WorkstationModel.create({
    title: title,
    usableApps: usableApps,
    description: description ? description : null,
    imageUrl: imageUrl ? imageUrl : null,
  });
  if (!workstation)
    return internalError(res, "Internal error while creating the workstation.");

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
};

const getAll = async (req, res) => {
  try {
    const includeInfo = req.query["include-info"] === "true";
    const workstations = await await WorkstationModel.getAll(includeInfo);
    return res
      .status(200)
      .json({ workstations: await WorkstationModel.workstations });
  } catch (error) {
    console.error("Error fetching all workstations: ", error);
    return internalError(res, "Error while getting all workstations.");
  }
};

const getById = async (req, res) => {
  const workstationId = req.params.workstationId;

  if (!parseInt(workstationId)) {
    return res.status(400).json({ error: "Missing workstation ID." });
  }

  try {
    const includeInfo = req.query["include-info"] === "true";
    const workstation = await WorkstationModel.getById(
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
};

const updateById = async (req, res) => {
  const workstationId = req.params.workstationId;
  const { title, description, imageUrl, usableApps } = req.body;

  try {
    const updatedWorkstation = await WorkstationModel.updateById(
      workstationId,
      {
        title,
        description,
        imageUrl,
        usableApps,
      }
    );

    if (!updatedWorkstation) {
      return notFound(res);
    }

    res.status(200).json({ updatedWorkstation });
  } catch (error) {
    console.error("Error updating workstation: ", error);
    return internalError(res, "Error while updating workstation.");
  }
};

const deleteById = async (req, res) => {
  const workstationId = req.params.workstationId;

  try {
    const deletedWorkstation = await WorkstationModel.deleteById(workstationId);

    if (!deletedWorkstation) {
      return notFound(res);
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting workstation: ", error);
    return internalError(res, "Error while deleting workstation.");
  }
};

export const WorkstationController = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
