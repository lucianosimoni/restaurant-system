import express from "express";
import { StaffController } from "../controllers/staffController.js";
import { authRole } from "../middleware/authMiddleware.js";
import { GroupedRoles } from "../utils/typesUtils.js";
import { Responses } from "../utils/responsesUtils.js";
import { Validate } from "../middleware/validateMiddleware.js";

const StaffRouter = express.Router();

/*
Login; Request Register
are located in the routers/auth.js
*/

StaffRouter.post(
  "/",
  authRole([...GroupedRoles.MANAGER_OWNER]),
  Validate.body(["username", "password", "firstName", "lastName"]),
  async (req, res) => {
    try {
      await StaffController.create(req, res);
    } catch (err) {
      console.error(err);
      return Responses.internalError(res);
    }
  }
);

StaffRouter.get(
  "/",
  authRole([...GroupedRoles.MANAGER_OWNER]),
  async (req, res) => {
    try {
      await StaffController.getAll(req, res);
    } catch (err) {
      console.error(err);
      return Responses.internalError(res);
    }
  }
);

StaffRouter.get(
  "/:staffId",
  authRole([...GroupedRoles.MANAGER_OWNER]),
  async (req, res) => {
    try {
      await StaffController.getById(req, res);
    } catch (err) {
      console.error(err);
      return Responses.internalError(res);
    }
  }
);

StaffRouter.put(
  "/:staffId",
  authRole([...GroupedRoles.MANAGER_OWNER]),
  Validate.body(["username", "password", "firstName", "lastName"]),
  async (req, res) => {
    try {
      await StaffController.updateById(req, res);
    } catch (err) {
      console.error(err);
      return Responses.internalError(res);
    }
  }
);

StaffRouter.put(
  "/reset-password/:staffId",
  Validate.body(["password"]),
  async (req, res) => {
    try {
      await StaffController.updatePasswordById(req, res);
    } catch (err) {
      console.error(err);
      return Responses.internalError(res);
    }
  }
);

StaffRouter.delete(
  "/:staffId",
  authRole({ allowedRoles: [...GroupedRoles.MANAGER_OWNER], useStaffId: true }),
  Validate.params(["staffId"]),
  async (req, res) => {
    try {
      await StaffController.deleteById(req, res);
    } catch (err) {
      console.error(err);
      return Responses.internalError(res);
    }
  }
);

export default StaffRouter;
