import express from "express";
import { autoClock, clockIn } from "../controllers/staffTimesheet.js";
import { authRole } from "../middleware/auth.js";
import { GroupedRoles } from "../utils/types.js";

const router = express.Router();

router.post(
  "/auto-clock",
  authRole([...GroupedRoles.ALL_EMPLOYEES]),
  async (req, res) => {
    await autoClock(req, res);
  }
);

router.post("/clock-in", async (req, res) => {
  await clockIn(req, res);
});

export default router;
