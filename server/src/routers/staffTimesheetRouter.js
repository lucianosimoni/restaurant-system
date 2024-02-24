import express from "express";
import { StaffTimesheetController } from "../controllers/staffTimesheetController.js";
import { authRole } from "../middleware/authMiddleware.js";
import { GroupedRoles } from "../utils/typesUtils.js";
import { Responses } from "../utils/responsesUtils.js";
import { Validate } from "../middleware/validateMiddleware.js";

const StaffTimesheetRouter = express.Router();

StaffTimesheetRouter.post(
  "/auto-clock",
  authRole([...GroupedRoles.ALL_EMPLOYEES]),
  Validate.body(["staffId", "imageUrl", "time"]),
  async (req, res) => {
    try {
      await StaffTimesheetController.autoClock(req, res);
    } catch (err) {
      console.error(err);
      return Responses.internalError(res);
    }
  }
);

StaffTimesheetRouter.post(
  "/clock-in",
  Validate.body(["staffId", "imageInUrl", "timeIn"]),
  async (req, res) => {
    try {
      await StaffTimesheetController.clockIn(req, res);
    } catch (err) {
      console.error(err);
      return Responses.internalError(res);
    }
  }
);

StaffTimesheetRouter.post(
  "/clock-out",
  Validate.body(["staffTimesheetId", "imageOutUrl", "timeOut"]),
  async (req, res) => {
    try {
      await StaffTimesheetController.clockOut(req, res);
    } catch (err) {
      console.error(err);
      return Responses.internalError(res);
    }
  }
);

export default StaffTimesheetRouter;
