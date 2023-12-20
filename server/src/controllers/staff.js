import {
  missingBody,
  wrongPasswordOrCredential,
} from "../utils/defaultResponses.js";
import { getStaffByCredential, createStaff } from "../models/staff.js";
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
  const { credential, password, firstName, lastName, role, avatarUrl } =
    req.body;

  if (
    !credential ||
    !password ||
    !firstName ||
    !lastName ||
    !role ||
    !avatarUrl
  ) {
    return missingBody(res);
  }

  const credentialExists = await getStaffByCredential(credential);
  if (credentialExists) {
    res.status(409).json({
      error: { message: "Account already exists" },
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const staff = await createStaff({
    credential: credential,
    passwordHash: hashedPassword,
    firstName: firstName,
    lastName: lastName,
    role: role,
    avatarUrl: avatarUrl,
  });
  if (!staff) {
    res.status(500).json({ error: { message: "An error occurred." } });
    return;
  }

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
