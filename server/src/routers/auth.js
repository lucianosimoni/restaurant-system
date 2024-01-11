import express from "express";
import {
  login as staffLogin,
  register as staffRegister,
} from "../controllers/staff.js";
import {
  //   login as workstationLogin,
  register as workstationRegister,
} from "../controllers/workstation.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// 🤵 Staff

router.post("/staff/login", async (req, res) => {
  await staffLogin(req, res);
});

router.post("/staff/register", async (req, res) => {
  await staffRegister(req, res);
});

// 🖥️ Workstation

// TODO: Implement the Workstation Login endpoint
// router.post("/workstation/login", async (req, res) => {
//   await workstationLogin(req, res);
// });

router.post("/workstation/register", authenticate, async (req, res) => {
  await workstationRegister(req, res);
});

export default router;
