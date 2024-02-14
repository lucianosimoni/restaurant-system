import express from "express";
import { WorkstationSettingController } from "../controllers/workstationSettingController.js";
import { authRole } from "../middleware/auth.js";
import { GroupedRoles } from "../utils/types.js";
import { internalError } from "../utils/defaultResponses.js";

const WorkstationSettingRouter = express.Router();

WorkstationSettingRouter.post(
  "/",
  authRole([...GroupedRoles.MANAGER_OWNER]),
  async (req, res) => {
    try {
      await WorkstationSettingController.register(req, res);
    } catch (err) {
      console.error(err);
      internalError(res);
    }
  }
);

WorkstationSettingRouter.get("/", async (req, res) => {
  try {
    await WorkstationSettingController.getAll(req, res);
  } catch (err) {
    console.error(err);
    internalError(res);
  }
});

WorkstationSettingRouter.get("/:workstationSettingId", async (req, res) => {
  try {
    await WorkstationSettingController.getById(req, res);
  } catch (err) {
    console.error(err);
    internalError(res);
  }
});

export default WorkstationSettingRouter;
