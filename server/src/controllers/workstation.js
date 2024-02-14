import {
  createWorkstation,
  getAllWorkstations,
  getWorkstationById,
  getWorkstationByTitle,
  deleteWorkstation,
} from "../models/workstation.js";
import {
  internalError,
  notFound,
  missingBody,
} from "../utils/defaultResponses.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function create(req, res) {
  const { title, password, workstationSettingId, description, imageUrl } =
    req.body;

  const titleExists = await getWorkstationByTitle(title);
  if (titleExists) {
    return res.status(409).json({
      error: { message: "Workstation with entered Title already exists." },
    });
  }

  // TODO: check if WorkstationSettingID exists

  const hashedPassword = await bcrypt.hash(password, 10);

  const workstation = await createWorkstation({
    title: title,
    passwordHash: hashedPassword,
    workstationSettingId: workstationSettingId,
    description: description ? description : null,
    imageUrl: imageUrl ? imageUrl : null,
  });
  if (!workstation)
    return internalError(res, "Error while creating the workstation.");

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

export async function getAll(req, res) {
  try {
    const includeInfo = req.query["include-info"] === "true";
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
    const includeInfo = req.query["include-info"] === "true";
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

export async function update(req, res) {
  const workstationId = req.params.workstationId;
  const { title, description, imageUrl, workstationSettingId } = req.body;

  try {
    const updatedWorkstation = await updateWorkstation(workstationId, {
      title,
      description,
      imageUrl,
      workstationSettingId,
    });

    if (!updatedWorkstation) {
      return notFound(res);
    }

    res.status(200).json({ updatedWorkstation });
  } catch (error) {
    console.error("Error updating workstation: ", error);
    return internalError(res, "Error while updating workstation.");
  }
}

export async function remove(req, res) {
  const workstationId = req.params.workstationId;

  try {
    const deletedWorkstation = await deleteWorkstation(workstationId);

    if (!deletedWorkstation) {
      return notFound(res);
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting workstation: ", error);
    return internalError(res, "Error while deleting workstation.");
  }
}
