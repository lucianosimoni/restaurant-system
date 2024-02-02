import express from "express";
import {
  login as staffLogin,
  register as staffRegister,
} from "../controllers/staff.js";

const router = express.Router();

router.post("/staff/login", async (req, res) => {
  await staffLogin(req, res);
});

router.post("/staff/register", async (req, res) => {
  await staffRegister(req, res);
});

export default router;
