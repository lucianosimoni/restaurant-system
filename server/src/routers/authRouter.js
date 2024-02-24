import express from "express";
import { StaffController } from "../controllers/staffController.js";
import { Validate } from "../middleware/validateMiddleware.js";
import { Responses } from "../utils/responsesUtils.js";

const AuthRouter = express.Router();

/*
Auth router is necessary to have the actions that
do not require JWT auth, like: Login & Register Request
*/

AuthRouter.post(
  "/staff/login",
  Validate.body(["username", "password"]),
  async (req, res) => {
    try {
      await StaffController.login(req, res);
    } catch (err) {
      console.error(err);
      return Responses.internalError(res);
    }
  }
);

AuthRouter.post(
  "/workstation/login",
  Validate.body(["username", "password"]),
  async (req, res) => {
    try {
      await StaffController.loginWorkstation(req, res);
    } catch (err) {
      console.error(err);
      return Responses.internalError(res);
    }
  }
);

// TODO: Register Request endpoint
// AuthRouter.post("/staff/register-request", StaffController.registerRequest)

export default AuthRouter;
