import express from "express";
import {
  login as staffLogin,
  register as staffRegister,
  // registerRequest as staffRegisterRequest,
} from "../controllers/staff.js";
import { authRole } from "../middleware/auth.js";
import { GroupedRoles } from "../utils/types.js";

const router = express.Router();

/*
Auth router is necessary to have the actions that
do not require JWT auth, like: Login & Register Request
*/

router.post("/staff/login", async (req, res) => {
  await staffLogin(req, res);
});

router.post(
  "/staff/register",
  authRole([...GroupedRoles.MANAGER_OWNER]),
  async (req, res) => {
    await staffRegister(req, res);
  }
);

// TODO: Register Request endpoint
// router.post("/register-request", async (req, res) => {
//   await registerRequest(req, res);
// });

export default router;
