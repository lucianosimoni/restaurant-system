import {
  internalError,
  notFound,
  missingBody,
} from "../utils/defaultResponses.js";
import {
  createWorkstation,
  getAllWorkstations,
  getWorkstationById,
  getWorkstationByTitle,
} from "../models/workstation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function register(req, res) {
  const { title, password, workstationSettingId, description, imageUrl } =
    req.body;

  if (!title || !password || !workstationSettingId) {
    return missingBody(res);
  }

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
