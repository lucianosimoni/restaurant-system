import express from "express";
import { autoClock } from "../controllers/staffTimesheet.js";

const router = express.Router();

router.post("/auto-clock", async (req, res) => {
  await autoClock(req, res);
});

export default router;
