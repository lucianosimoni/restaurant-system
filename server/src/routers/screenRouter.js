import express from "express";
import { getAll, getById, register } from "../controllers/screen.js";

const ScreenRouter = express.Router();

ScreenRouter.post("/register", async (req, res) => {
  await register(req, res);
});

ScreenRouter.get("/", async (req, res) => {
  await getAll(req, res);
});

ScreenRouter.get("/:screenId", async (req, res) => {
  await getById(req, res);
});

export default ScreenRouter;
