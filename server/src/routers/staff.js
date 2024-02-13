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

router.put("/:staffId", async (req, res) => {
  const staffId = req.params.staffId;
  const data = req.body;
  await updateById(staffId, data, req, res);
});

router.delete("/:staffId", async (req, res) => {
  const staffId = req.params.staffId;
  await deleteById(staffId, req, res);
});

export default router;
