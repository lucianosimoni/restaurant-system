import express from "express";
import { AppController } from "../controllers/appController.js";
import { Responses } from "../utils/responsesUtils.js";
import { Validate } from "../middleware/validateMiddleware.js";

const AppRouter = express.Router();

AppRouter.post(
  "/",
  Validate.body(["title", "path", "description"]),
  async (req, res) => {
    try {
      await AppController.create(req, res);
    } catch (err) {
      console.error(err);
      return Responses.internalError(res);
    }
  }
);

AppRouter.get("/", async (req, res) => {
  try {
    await AppController.getAll(req, res);
  } catch (err) {
    console.error(err);
    return Responses.internalError(res);
  }
});

AppRouter.get("/:appId", async (req, res) => {
  try {
    await AppController.getById(req, res);
  } catch (err) {
    console.error(err);
    return Responses.internalError(res);
  }
});

AppRouter.put(
  "/:appId",
  Validate.body(["title", "path", "info", "allowedSectors"]),
  async (req, res) => {
    try {
      await AppController.updateById(req, res);
    } catch (err) {
      console.error(err);
      return Responses.internalError(res);
    }
  }
);

AppRouter.delete("/:appId", async (req, res) => {
  try {
    await AppController.deleteById(req, res);
  } catch (err) {
    console.error(err);
    return Responses.internalError(res);
  }
});

export default AppRouter;
