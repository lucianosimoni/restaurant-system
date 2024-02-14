import express from "express";
import {
  login as staffLogin,
  // registerRequest as staffRegisterRequest,
} from "../controllers/staff.js";

const router = express.Router();

/*
Auth router is necessary to have the actions that
do not require JWT auth, like: Login & Register Request
*/

router.post("/staff/login", async (req, res) => {
  await staffLogin(req, res);
});

// TODO: Register Request endpoint
router.post("/staff/register-request", async (req, res) => {
  return res.status(200).json({ endpointDone: false });
  // await registerRequest(req, res);
});

export default router;
