import express from "express";
import { getAll } from "../controllers/workstation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  await getAll(req, res);
});

// router.get("/:staffId", async (req, res) => {
//   await getById(req, res);
// });

export default router;
