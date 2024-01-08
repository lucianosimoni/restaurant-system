import express from "express";
import { registerTimeIn } from "../controllers/staffTimesheet.js";

const router = express.Router();

router.post("/clockin", async (req, res) => {
  console.log("CLOCK IN CACETE");
  await registerTimeIn(req, res);
});

export default router;
