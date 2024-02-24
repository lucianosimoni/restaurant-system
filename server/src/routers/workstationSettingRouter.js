import express from "express";
import { WorkstationSettingController } from "../controllers/workstationSettingController.js";
import { authRole } from "../middleware/authMiddleware.js";
import { GroupedRoles } from "../utils/typesUtils.js";
import { Responses } from "../utils/responsesUtils.js";
import { Validate } from "../middleware/validateMiddleware.js";

//TODO: Remove Setting

const WorkstationSettingRouter = express.Router();

WorkstationSettingRouter.post(
  "/",
  authRole([...GroupedRoles.MANAGER_OWNER]),
  Validate.body(["title", "description", "apps"]),
  async (req, res) => {
    try {
      await WorkstationSettingController.create(req, res);
    } catch (err) {
      console.error(err);
      Responses.internalError(res);
    }
  }
);

WorkstationSettingRouter.get("/", async (req, res) => {
  try {
    await WorkstationSettingController.getAll(req, res);
  } catch (err) {
    console.error(err);
    Responses.internalError(res);
  }
});

WorkstationSettingRouter.get("/:workstationSettingId", async (req, res) => {
  try {
    await WorkstationSettingController.getById(req, res);
  } catch (err) {
    console.error(err);
    Responses.internalError(res);
  }
});

export default WorkstationSettingRouter;
