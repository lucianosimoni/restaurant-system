import express from "express";
import {
  register,
  getAll,
  getById,
} from "../controllers/workstationSetting.js";
import { authRole } from "../middleware/authRole.js";
import { staffRoles as r } from "../utils/types.js";

const router = express.Router();

router.post(
  "/register",
  authRole([r.SECTOR_LEADER, r.MANAGER, r.OWNER]),
  async (req, res) => {
    await register(req, res);
  }
);

router.get("/", async (req, res) => {
  await getAll(req, res);
});

router.get("/:workstationSettingId", async (req, res) => {
  await getById(req, res);
});

export default router;
