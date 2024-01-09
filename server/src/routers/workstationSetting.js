import express from "express";
import {
  getAll,
  //   getById,
  //   register,
} from "../controllers/workstationSetting.js";

const router = express.Router();

// router.post("/register", async (req, res) => {
//   await register(req, res);
// });

router.get("/", async (req, res) => {
  await getAll(req, res);
});

// router.get("/:workstationSettingId", async (req, res) => {
//   await getById(req, res);
// });

export default router;
