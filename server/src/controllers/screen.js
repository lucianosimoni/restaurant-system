import {
  internalError,
  notFound,
  missingBody,
} from "../utils/defaultResponses.js";
import {
  createScreen,
  getAllScreens,
  getScreenById,
  getScreenByTitle,
} from "../models/screen.js";

export async function register(req, res) {
  const { title, path, description } = req.body;

  if (!title || !path) {
    return missingBody(res);
  }

  const titleExists = await getScreenByTitle(title);
  if (titleExists) {
    return res.status(409).json({
      error: { message: "Screen with entered Title already exists." },
    });
  }

  const screen = await createScreen({
    title: title,
    path: path,
    description: description ? description : null,
  });
  if (!screen) return internalError(res, "Error while creating the screen.");

  res.status(201).json({ createdScreen: { ...screen } });
}

export async function getAll(req, res) {
  try {
    const includeInfo = req.query["include-info"] === "true";
    const screens = await getAllScreens(includeInfo);
    return res.status(200).json({ screens: screens });
  } catch (error) {
    console.error("Error fetching all screens: ", error);
    return internalError(res, "Error while getting all screens.");
  }
}

export async function getById(req, res) {
  const screenId = req.params.screenId;

  if (!parseInt(screenId)) {
    return res.status(400).json({ error: "Missing screen ID." });
  }

  try {
    const includeInfo = req.query["include-info"] === "true";
    const screen = await getScreenById(parseInt(screenId), includeInfo);
    if (!screen) {
      return notFound(res);
    }
    return res.status(200).json({ screen: screen });
  } catch (error) {
    console.error("Error fetching screen by Id: ", error);
    return internalError("Error while getting screen by id.");
  }
}
