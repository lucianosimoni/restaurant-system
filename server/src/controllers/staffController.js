import { StaffModel } from "../models/staffModel.js";
import { Responses } from "../utils/defaultResponses.js";
import { RoleTypes as role } from "../utils/types.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function login(req, res) {
  const { username, password } = req.body;

  const staff = await StaffModel.getByUsername(username);
  if (!staff) {
    return Responses.wrongPasswordOrUsername(res);
  }

  const isPasswordValid = await bcrypt.compare(password, staff.passwordHash);
  if (!isPasswordValid) {
    return Responses.wrongPasswordOrUsername(res);
  }

  delete staff.passwordHash;

  const token = jwt.sign(
    {
      staffId: staff.id,
      staffRole: staff.role,
    },
    process.env.JWT_SECRET_KEY
  );
  const loggedInStaff = {
    ...staff,
    token,
  };
  return res.status(200).json({ loggedInStaff: loggedInStaff });
}

/**
 * #### Made to login into Workstations, because only a selected type of Roles must be allowed to create one.
 * Checks the role before returning the loggedInStaff.
 * Only returns if the LoggedInStaff is within one of the valid given roles.
 * @param {{body:{title:"string",description:"string",usableApps:[1,2,3]}}} req - `Express Request` with a json body
 * @param {Express.Response} res
 * @returns {createdWorkstationSetting}
 */
async function loginWorkstation(req, res) {
  const { username, password } = req.body;

  const staff = await StaffModel.getByUsername(username);
  if (!staff) {
    return Responses.wrongPasswordOrUsername(res);
  }

  const isPasswordValid = await bcrypt.compare(password, staff.passwordHash);
  if (!isPasswordValid) {
    return Responses.wrongPasswordOrUsername(res);
  }

  delete staff.passwordHash;

  const allowedRole = [role.SECTOR_LEADER, role.MANAGER, role.OWNER].includes(
    staff.role
  );
  if (!allowedRole) {
    return Responses.insufficientPermissions(
      res,
      "Insufficient role permissions to create a workstation."
    );
  }

  // Create a JWT token with 10 minutes validity
  const token = jwt.sign(
    { id: staff.id, username: staff.username, role: staff.role },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );

  const loggedInStaff = {
    id: staff.id,
    role: staff.role,
    username: staff.username,
  };
  return res.status(200).json({ loggedInStaff, token });
}

async function create(req, res) {
  const { username, password, firstName, lastName } = req.body;

  const usernameExists = await StaffModel.getByUsername(username);
  if (usernameExists) {
    res.status(409).json({
      error: { message: "Account with entered Username already exists." },
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const staff = await StaffModel.create({
    username: username,
    passwordHash: hashedPassword,
    firstName: firstName,
    lastName: lastName,
  });
  if (!staff) {
    return Responses.internalError(res, "Error while creating the staff.");
  }

  res.status(201).json({ createdStaff: { ...staff } });
}

async function getAll(req, res) {
  try {
    const includeInfo = req.query["include-info"] === "true";
    const allStaff = await StaffModel.getAll(includeInfo);
    return res.status(200).json({ staff: allStaff });
  } catch (error) {
    console.error("Error fetching all staff: ", error);
    return Responses.internalError(res, "Error while getting all staff.");
  }
}

async function getById(req, res) {
  const staffId = req.params.staffId;

  if (!parseInt(staffId))
    return res.status(400).json({ error: "Missing staff ID." });

  try {
    // TODO: Work in a docs for these queries then allow them.
    // const includeInfo = req.query["include-info"] === "true";
    const staff = await StaffModel.getById(parseInt(staffId));
    if (!staff) {
      return Responses.notFound(res);
    }
    delete staff.passwordHash;
    return res.status(200).json({ staff });
  } catch (error) {
    console.error("Error fetching user by Id: ", error);
    return Responses.internalError("Error while getting user by id.");
  }
}

async function updateById(req, res) {
  const { username, password, firstName, lastName } = req.body;

  // TODO: Add a way to update the user ROLE, maybe a separated endpoint?

  const staffId = parseInt(req.params.staffId);

  if (!staffId) {
    return Responses.notFound(res, "Staff ID not found.");
  }

  try {
    const staffById = await StaffModel.getById(parseInt(staffId));
    if (!staffById) {
      return Responses.notFound(res, "Staff not found.");
    }

    // Check if new username is available
    if (username != staffById.username) {
      const usernameTaken = await StaffModel.getByUsername(username);
      if (usernameTaken)
        return Responses.conflict(res, "Username already in use.");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const updatedStaff = await StaffModel.updateById(staffId, {
      username,
      passwordHash,
      firstName,
      lastName,
    });

    return res.status(200).json({ updatedStaff });
  } catch (error) {
    console.error("Error updating staff: ", error);
    return Responses.internalError(res, "Error while updating staff.");
  }
}

async function deleteById(req, res) {
  try {
    const { staffId } = req.params;
    // Check if staffId is valid
    if (!parseInt(staffId)) {
      return res.status(400).json({ error: "Invalid staff ID." });
    }

    // Check if staff exists
    const staff = await StaffModel.getById(parseInt(staffId));
    if (!staff) {
      return Responses.notFound(res);
    }

    // Delete the staff
    await StaffModel.deleteById(parseInt(staffId));

    return res.status(204).end();
  } catch (error) {
    console.error("Error deleting staff: ", error);
    return Responses.internalError(res, "Error while deleting staff.");
  }
}
//
export const StaffController = {
  login,
  loginWorkstation,
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
