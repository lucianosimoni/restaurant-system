import express from "express";
import {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
} from "../controllers/staff.js";
import { authRole } from "../middleware/auth.js";
import { GroupedRoles } from "../utils/types.js";
import { internalError } from "../utils/defaultResponses.js";
import validateBody from "../middleware/validateBody.js";

const router = express.Router();

/*
Login; Request Register
are located in the routers/auth.js
*/
router.post(
  "/",
  authRole([...GroupedRoles.MANAGER_OWNER]),
  async (req, res) => {
    await register(req, res);
  }
);

router.get("/", authRole([...GroupedRoles.MANAGER_OWNER]), async (req, res) => {
  await getAll(req, res);
});

router.get(
  "/:staffId",
  authRole([...GroupedRoles.MANAGER_OWNER]),
  async (req, res) => {
    await getById(req, res);
  }
);

router.put(
  "/:staffId",
  authRole([...GroupedRoles.MANAGER_OWNER]),
  validateBody(["username", "firstName", "lastName"]),
  async (req, res) => {
    try {
      await updateById(req, res);
    } catch (err) {
      console.error(err);
      internalError(res);
    }
  }
);

router.delete(
  "/:staffId",
  authRole({ allowedRoles: [...GroupedRoles.MANAGER_OWNER], useStaffId: true }),
  async (req, res) => {
    // TODO: Do like the workstation, dividing more actions to the Routers
    // const staffId = req.params.staffId
    await deleteById(req, res);
  }
);

export default router;
