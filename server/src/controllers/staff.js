import {
  internalError,
  missingBody,
  notFound,
  wrongPasswordOrCredential,
} from "../utils/defaultResponses.js";
import {
  getStaffByCredential,
  createStaff,
  getAllStaff,
  getStaffById,
} from "../models/staff.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function login(req, res) {
  const { credential, password } = req.body;
  if (!credential || !password) {
    return missingBody(res);
  }

  const staff = await getStaffByCredential(credential);
  if (!staff) {
    return wrongPasswordOrCredential(res);
  }

  const isPasswordValid = await bcrypt.compare(password, staff.passwordHash);
  if (!isPasswordValid) {
    return wrongPasswordOrCredential(res);
  }

  delete staff.passwordHash;
  const token = jwt.sign(
    { staffCredential: staff.credential },
    process.env.JWT_SECRET_KEY
  );
  const loggedInStaff = {
    ...staff,
    token,
  };
  return res.status(200).json({ loggedInStaff: loggedInStaff });
}

export async function register(req, res) {
  const { credential, password, firstName, lastName, imageURL } = req.body;

  if (!credential || !password || !firstName || !lastName || !imageURL) {
    return missingBody(res);
  }

  const credentialExists = await getStaffByCredential(credential);
  if (credentialExists) {
    res.status(409).json({
      error: { message: "Account with entered Credential already exists." },
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const staff = await createStaff({
    credential: credential,
    passwordHash: hashedPassword,
    firstName: firstName,
    lastName: lastName,
    imageURL: imageURL,
  });
  if (!staff) return internalError(res, "Error while creating the staff.");

  const token = jwt.sign(
    { staffCredential: staff.credential },
    process.env.JWT_SECRET_KEY
  );
  res.status(201).json({
    createdStaff: {
      ...staff,
      token,
    },
  });
}

export async function getAll(req, res) {
  try {
    const includeInfo = req.query.includeInfo === "true";
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
    const includeInfo = req.query.includeInfo === "true";
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
