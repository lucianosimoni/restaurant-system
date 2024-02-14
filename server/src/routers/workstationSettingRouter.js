import express from "express";
import {
  register,
  getAll,
  getById,
} from "../controllers/workstationSetting.js";
import { authRole } from "../middleware/auth.js";
import { GroupedRoles } from "../utils/types.js";

const WorkstationSettingRouter = express.Router();

WorkstationSettingRouter.post(
  "/register",
  authRole([...GroupedRoles.MANAGER_OWNER]),
  async (req, res) => {
    await register(req, res);
  }
);

WorkstationSettingRouter.get("/", async (req, res) => {
  await getAll(req, res);
});

WorkstationSettingRouter.get("/:workstationSettingId", async (req, res) => {
  await getById(req, res);
});

export default WorkstationSettingRouter;
