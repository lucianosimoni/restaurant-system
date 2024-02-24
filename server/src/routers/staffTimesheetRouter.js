import express from "express";
import { StaffTimesheetController } from "../controllers/staffTimesheetController.js";
import { authRole } from "../middleware/auth.js";
import { GroupedRoles } from "../utils/types.js";
import { internalError } from "../utils/defaultResponses.js";
import { Validate } from "../middleware/validate.js";

const StaffTimesheetRouter = express.Router();

StaffTimesheetRouter.post(
  "/auto-clock",
  authRole([...GroupedRoles.ALL_EMPLOYEES]),
  Validate.body(["staffId", "imageUrl", "currentTime"]),
  async (req, res) => {
    try {
      await StaffTimesheetController.autoClock(req, res);
    } catch (err) {
      console.error(err);
      return internalError(res);
    }
  }
);

StaffTimesheetRouter.post("/clock-in", async (req, res) => {
  try {
    await StaffTimesheetController.clockIn(req, res);
  } catch (err) {
    console.error(err);
    return internalError(res);
  }
});

export default StaffTimesheetRouter;
