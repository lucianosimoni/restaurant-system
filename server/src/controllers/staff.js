import {
  getStaffByUsername,
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaffById,
  deleteStaffById,
} from "../models/staff.js";
import {
  internalError,
  missingBody,
  notFound,
  wrongPasswordOrUsername,
} from "../utils/defaultResponses.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return missingBody(res);
  }

  const staff = await getStaffByUsername(username);
  if (!staff) {
    return wrongPasswordOrUsername(res);
  }

  const isPasswordValid = await bcrypt.compare(password, staff.passwordHash);
  if (!isPasswordValid) {
    return wrongPasswordOrUsername(res);
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

export async function create(req, res) {
  const { username, password, firstName, lastName, imageUrl } = req.body;

  if (!username || !password || !firstName || !lastName) {
    return missingBody(res);
  }

  const usernameExists = await getStaffByUsername(username);
  if (usernameExists) {
    res.status(409).json({
      error: { message: "Account with entered Username already exists." },
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const staff = await createStaff({
    username: username,
    passwordHash: hashedPassword,
    firstName: firstName,
    lastName: lastName,
    imageUrl: imageUrl ? imageUrl : "",
  });
  if (!staff) {
    return internalError(res, "Error while creating the staff.");
  }

  res.status(201).json({ createdStaff: { ...staff } });
}

export async function getAll(req, res) {
  try {
    const includeInfo = req.query["include-info"] === "true";
    const allStaff = await getAllStaff(includeInfo);
    return res.status(200).json({ staff: allStaff });
  } catch (error) {
    console.error("Error fetching all staff: ", error);
    return internalError(res, "Error while getting all staff.");
  }
}

export async function getById(req, res) {
  const staffId = req.params.staffId;

  if (!parseInt(staffId))
    return res.status(400).json({ error: "Missing staff ID." });

  try {
    const includeInfo = req.query["include-info"] === "true";
    const staff = await getStaffById(parseInt(staffId), includeInfo);
    if (!staff) {
      return notFound(res);
    }
    return res.status(200).json({ staff: staff });
  } catch (error) {
    console.error("Error fetching user by Id: ", error);
    return internalError("Error while getting user by id.");
  }
}

export async function updateById(req, res) {
  const { username, password, firstName, lastName, role } = req.body;
  if (!username || !password || !firstName || !lastName) {
    return missingBody(res);
  }
  // TODO: FUCKING HASH THE FUCKING PASSWORD AGAIn

  const staffId = req.params.staffId;

  if (!parseInt(staffId)) {
    return notFound(res, "Staff ID not found.");
  }

  try {
    const staff = await getStaffById(parseInt(staffId));
    if (!staff) {
      return notFound(res);
    }

    // Update the staff
    const updatedStaff = await updateStaffById({
      ...staff,
      ...req.body,
    });

    return res.status(200).json({ updatedStaff });
  } catch (error) {
    console.error("Error updating staff: ", error);
    return internalError(res, "Error while updating staff.");
  }
}

export async function deleteById(staffId, req, res) {
  try {
    // Check if staffId is valid
    if (!parseInt(staffId)) {
      return res.status(400).json({ error: "Invalid staff ID." });
    }

    // Check if staff exists
    const staff = await getStaffById(parseInt(staffId));
    if (!staff) {
      return notFound(res);
    }

    // Delete the staff
    await deleteStaffById(parseInt(staffId));

    return res.status(204).end();
  } catch (error) {
    console.error("Error deleting staff: ", error);
    return internalError(res, "Error while deleting staff.");
  }
}
