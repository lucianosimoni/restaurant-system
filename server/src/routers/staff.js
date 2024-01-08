import express from "express";
import { login, register, getAll, getById } from "../controllers/staff.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  await login(req, res);
});

router.post("/register", async (req, res) => {
  await register(req, res);
});

router.get("/", async (req, res) => {
  await getAll(req, res);
});

router.get("/:staffId", async (req, res) => {
  await getById(req, res);
});

export default router;
