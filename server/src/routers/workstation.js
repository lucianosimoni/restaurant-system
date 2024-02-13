import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/workstation.js";
import authRole from "../middleware/authRole.js";
import validateBody from "../middleware/validateBody.js";
import { staffRoles as role } from "../utils/types.js";

const router = express.Router();

router.post(
  "/",
  authRole([role.SECTOR_LEADER, role.MANAGER, role.OWNER]),
  validateBody(["title", "password", "workstationSettingId"]),
  async (req, res) => {
    try {
      await create(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get(
  "/",
  authRole([role.SECTOR_LEADER, role.MANAGER, role.OWNER]),
  async (req, res) => {
    await getAll(req, res);
  }
);

router.get("/:workstationId", async (req, res) => {
  await getById(req, res);
});

router.put(
  "/:workstationId",
  authRole([role.SECTOR_LEADER, role.MANAGER, role.OWNER]),
  async (req, res) => {
    try {
      await update(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.delete(
  "/:workstationId",
  authRole([role.SECTOR_LEADER, role.MANAGER, role.OWNER]),
  async (req, res) => {
    try {
      await remove(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
