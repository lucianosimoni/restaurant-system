import express from "express";
import { autoClock, clockIn } from "../controllers/staffTimesheet.js";
import authRole from "../middleware/authRole.js";
import { staffRoles } from "../utils/types.js";

const router = express.Router();

router.post("/auto-clock", authRole([staffRoles.STAFF]), async (req, res) => {
  await autoClock(req, res);
});

router.post("/clock-in", async (req, res) => {
  await clockIn(req, res);
});

export default router;
