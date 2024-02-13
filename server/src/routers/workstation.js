import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/workstation.js";
import { authRole } from "../middleware/auth.js";
import validateBody from "../middleware/validateBody.js";
import { GroupedRoles } from "../utils/types.js";

const router = express.Router();

router.post(
  "/",
  authRole([...GroupedRoles.ALL_BUT_STAFF]),
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

router.get("/", authRole([...GroupedRoles.ALL_BUT_STAFF]), async (req, res) => {
  await getAll(req, res);
});

router.get("/:workstationId", async (req, res) => {
  await getById(req, res);
});

router.put(
  "/:workstationId",
  authRole([...GroupedRoles.ALL_BUT_STAFF]),
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
  authRole([...GroupedRoles.ALL_BUT_STAFF]),
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
