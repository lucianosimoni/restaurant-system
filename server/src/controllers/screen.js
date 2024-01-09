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

  console.log("verifying title & path");

  if (!title || !path) {
    return missingBody(res);
  }
  console.log("register screen title & path ok");
  const titleExists = await getScreenByTitle(title);
  if (titleExists) {
    console.log("title exists");

    return res.status(409).json({
      error: { message: "Screen with entered Title already exists." },
    });
  }
  console.log("creating screen");

  const screen = await createScreen({
    title: title,
    path: path,
    description: description ? description : null,
  });
  if (!screen) return internalError(res, "Error while creating the screen.");

  console.log("returning 201 res with createdScreen");

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
