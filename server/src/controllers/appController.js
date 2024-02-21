import {
  createApp,
  getAllApps,
  getAppById,
  getAppByTitle,
} from "../models/app.js";
import {
  internalError,
  notFound,
  missingBody,
} from "../utils/defaultResponses.js";

const create = async (req, res) => {
  const { title, path, description } = req.body;

  if (!title || !path) {
    return missingBody(res);
  }

  const titleExists = await getAppByTitle(title);
  if (titleExists) {
    return res.status(409).json({
      error: { message: "App with entered Title already exists." },
    });
  }

  const app = await createApp({
    title: title,
    path: path,
    description: description ? description : null,
  });
  if (!app) return internalError(res, "Error while creating the app.");

  res.status(201).json({ createdApp: { ...app } });
};

const getAll = async (req, res) => {
  try {
    const includeInfo = req.query["include-info"] === "true";
    const apps = await getAllApps(includeInfo);
    return res.status(200).json({ apps: apps });
  } catch (error) {
    console.error("Error fetching all apps: ", error);
    return internalError(res, "Error while getting all apps.");
  }
};

const getById = async (req, res) => {
  const appId = req.params.appId;

  if (!parseInt(appId)) {
    return res.status(400).json({ error: "Missing app ID." });
  }

  try {
    const includeInfo = req.query["include-info"] === "true";
    const app = await getAppById(parseInt(appId), includeInfo);
    if (!app) {
      return notFound(res);
    }
    return res.status(200).json({ app: app });
  } catch (error) {
    console.error("Error fetching app by Id: ", error);
    return internalError("Error while getting app by id.");
  }
};

export const AppController = { create, getAll, getById };
