import express from "express";
import { getAll, getById } from "../controllers/staff.js";

const router = express.Router();

/*
Login; Register; Request Register
are located in the routers/auth.js
*/

router.get("/", async (req, res) => {
  await getAll(req, res);
});

router.get("/:staffId", async (req, res) => {
  await getById(req, res);
});

export default router;
