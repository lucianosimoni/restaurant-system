import express from "express";
import { StaffController } from "../controllers/staffController.js";

const AuthRouter = express.Router();

/*
Auth router is necessary to have the actions that
do not require JWT auth, like: Login & Register Request
*/

AuthRouter.post("/staff/login", StaffController.login);
// TODO: Register Request endpoint
// AuthRouter.post("/staff/register-request", StaffController.registerRequest)

export default AuthRouter;
