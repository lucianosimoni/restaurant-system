import express from "express";
import { autoClock, clockIn } from "../controllers/staffTimesheet.js";

const router = express.Router();

router.post("/auto-clock", async (req, res) => {
  await autoClock(req, res);
});

router.post("/clock-in", async (req, res) => {
  await clockIn(req, res);
});

export default router;
