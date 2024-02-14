import express from "express";
import {
  login as staffLogin,
  // registerRequest as staffRegisterRequest,
} from "../controllers/staff.js";

const AuthRouter = express.Router();

/*
Auth router is necessary to have the actions that
do not require JWT auth, like: Login & Register Request
*/

AuthRouter.post("/staff/login", staffLogin);

// TODO: Register Request endpoint
AuthRouter.post("/staff/register-request", async (req, res) => {
  return res.status(200).json({ endpointDone: false });
  // await registerRequest(req, res);
});

export default AuthRouter;
