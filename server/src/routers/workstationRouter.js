import express from "express";
import { WorkstationController } from "../controllers/workstationController.js";
import { authRole } from "../middleware/auth.js";
import { GroupedRoles } from "../utils/types.js";
import { internalError } from "../utils/defaultResponses.js";
import validateBody from "../middleware/validateBody.js";

const WorkstationRouter = express.Router();

WorkstationRouter.post(
  "/",
  authRole([...GroupedRoles.ALL_BUT_EMPLOYEE]),
  validateBody(["title", "workstationSettingId"]),
  async (req, res) => {
    try {
      await WorkstationController.create(req, res);
    } catch (err) {
      console.error(err);
      internalError(res);
    }
  }
);

WorkstationRouter.get(
  "/",
  authRole([...GroupedRoles.ALL_BUT_EMPLOYEE]),
  async (req, res) => {
    try {
      await WorkstationController.getAll(req, res);
    } catch (err) {
      console.error(err);
      internalError(res);
    }
  }
);

WorkstationRouter.get("/:workstationId", async (req, res) => {
  try {
    await WorkstationController.getById(req, res);
  } catch (err) {
    console.error(err);
    internalError(res);
  }
});

WorkstationRouter.put(
  "/:workstationId",
  authRole([...GroupedRoles.ALL_BUT_EMPLOYEE]),
  async (req, res) => {
    try {
      await WorkstationController.update(req, res);
    } catch (err) {
      console.error(err);
      internalError(res);
    }
  }
);

WorkstationRouter.delete(
  "/:workstationId",
  authRole([...GroupedRoles.ALL_BUT_EMPLOYEE]),
  async (req, res) => {
    try {
      await WorkstationController.remove(req, res);
    } catch (err) {
      console.error(err);
      internalError(res);
    }
  }
);

export default WorkstationRouter;
