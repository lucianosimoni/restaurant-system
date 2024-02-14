import express from "express";
import { ScreenController } from "../controllers/screenController.js";
import { internalError } from "../utils/defaultResponses.js";
import validateBody from "../middleware/validateBody.js";

const ScreenRouter = express.Router();

ScreenRouter.post(
  "/",
  validateBody(["title", "path", "description"]),
  async (req, res) => {
    try {
      await ScreenController.create(req, res);
    } catch (err) {
      console.error(err);
      return internalError(res);
    }
  }
);

ScreenRouter.get("/", async (req, res) => {
  try {
    await ScreenController.getAll(req, res);
  } catch (err) {
    console.error(err);
    return internalError(res);
  }
});

ScreenRouter.get("/:screenId", async (req, res) => {
  try {
    await ScreenController.getById(req, res);
  } catch (err) {
    console.error(err);
    return internalError(res);
  }
});

export default ScreenRouter;
