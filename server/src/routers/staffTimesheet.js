import express from "express";
import { registerTimeIn } from "../controllers/staffTimesheet";

const router = express.Router();

router.post("/clockin", async (req, res) => {
  await registerTimeIn(req, res);
});

export default router;
