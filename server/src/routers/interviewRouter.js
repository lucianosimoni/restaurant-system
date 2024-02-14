import express from "express";
import {
  create,
  getAll,
  getById,
  getByStaff,
  updateCurrentInterviewRound,
} from "../controllers/interview.js";

const InterviewRouter = express.Router();

InterviewRouter.post("/", async (req, res) => {
  await create(req, res);
});

InterviewRouter.get("/", async (req, res) => {
  await getAll(req, res);
});

InterviewRouter.get("/:interviewId", async (req, res) => {
  await getById(req, res);
});

InterviewRouter.get("/staff/:staffId", async (req, res) => {
  await getByStaff(req, res);
});

InterviewRouter.patch("/:interviewId", async (req, res) => {
  await updateCurrentInterviewRound(req, res);
});

export default InterviewRouter;
