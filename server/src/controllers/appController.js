import { AppModel } from "../models/appModel.js";
import { Responses } from "../utils/defaultResponses.js";

async function create(req, res) {
  const { title, path, description } = req.body;

  const titleExists = await AppModel.getByTitle(title);
  if (titleExists) {
    return res.status(409).json({
      error: { message: "App with entered Title already exists." },
    });
  }

  const app = await AppModel.create({
    title: title,
    path: path,
    description: description,
  });
  if (!app) {
    return Responses.internalError(res, "Error while creating the app.");
  }

  res.status(201).json({ createdApp: { ...app } });
}

async function getAll(req, res) {
  try {
    const includeInfo = req.query["include-info"] === "true";
    const apps = await AppModel.getAll(includeInfo);
    return res.status(200).json({ apps: apps });
  } catch (error) {
    console.error("Error fetching all apps: ", error);
    return Responses.internalError(res, "Error while getting all apps.");
  }
}

async function getById(req, res) {
  const appId = req.params.appId;

  if (!parseInt(appId)) {
    return res.status(400).json({ error: "Missing app ID." });
  }

  try {
    const includeInfo = req.query["include-info"] === "true";
    const app = await AppModel.getById(parseInt(appId), includeInfo);
    if (!app) {
      return Responses.notFound(res);
    }
    return res.status(200).json({ app: app });
  } catch (error) {
    console.error("Error fetching app by Id: ", error);
    return Responses.internalError("Error while getting app by id.");
  }
}

// TODO: Fix it
async function updateById(req, res) {
  const { title, path, info, allowedSectors } = req.body;

  return res.status(200).json({ todo: "yet to be implemented" });
}

// TODO: Fix it
async function deleteById(req, res) {
  return res.status(200).json({ todo: "yet to be implemented" });
}

export const AppController = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
