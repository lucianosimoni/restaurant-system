import express from "express";
import {
  create,
  getAll,
  getById,
  getByStaff,
  updateCurrentInterviewRound,
} from "../controllers/interview.js";

const router = express.Router();

router.post("/", async (req, res) => {
  await create(req, res);
});

router.get("/", async (req, res) => {
  await getAll(req, res);
});

router.get("/:interviewId", async (req, res) => {
  await getById(req, res);
});

router.get("/staff/:staffId", async (req, res) => {
  await getByStaff(req, res);
});

router.patch("/:interviewId", async (req, res) => {
  await updateCurrentInterviewRound(req, res);
});

export default router;
