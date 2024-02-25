import { AppModel } from "../models/appModel.js";
import { Responses } from "../utils/responsesUtils.js";

async function create(req, res) {
  const { title, path, description } = req.body;

  const titleExists = await AppModel.exist("title", title);
  if (titleExists) return Responses.conflict(res, "App title already exists.");

  const pathExists = await AppModel.exist("path", path);
  if (pathExists) return Responses.conflict(res, "App path already exists.");

  const app = await AppModel.create({
    title: title,
    path: path,
    description: description,
  });
  if (!app) return Responses.internalError(res, "Error creating the app.");

  res.status(201).json({ createdApp: { ...app } });
}

async function getAll(req, res) {
  try {
    const includeInfo = req.query["include-info"] === "true";
    const apps = await AppModel.getAll(includeInfo);
    return res.status(200).json({ apps });
  } catch (error) {
    console.error("Error fetching all apps: ", error);
    return Responses.internalError(res, "Error getting all apps.");
  }
}

async function getById(req, res) {
  const appId = parseInt(req.params.appId);

  if (!appId) return res.status(400).json({ error: "Missing app ID." });

  try {
    // TODO: Define how the query docs works first, then use it
    // const includeInfo = req.query["include-info"] === "true";
    const app = await AppModel.getById(appId);
    if (!app) return Responses.notFound(res);

    return res.status(200).json({ app: app });
  } catch (error) {
    console.error("Error fetching app by Id: ", error);
    return Responses.internalError("Error getting app by id.");
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
