import express from "express";
import { getAll, getById, create } from "../controllers/workstation.js";
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

router.get("/", async (req, res) => {
  await getAll(req, res);
});

router.get("/:workstationId", async (req, res) => {
  await getById(req, res);
});

// TODO: UPDATE

// TODO: DELETE

export default router;
