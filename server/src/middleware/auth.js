import jwt from "jsonwebtoken";
import { missingAuth, missingBearer } from "../utils/defaultResponses.js";
import dotenv from "dotenv";
dotenv.config();

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return missingAuth(res);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return missingBearer(res);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.staffId = decodedToken.staffId;
    req.staffRole = decodedToken.staffRole;
    next();
  } catch (err) {
    return res.status(401).json({ error: { message: "Invalid token" } });
  }
}

export function authStaffRole(req, res, next, roleNeeded) {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.staffId = decodedToken.staffId;

    // Verify Role
    if (decodedToken.staffRole !== roleNeeded) {
      return res
        .status(403)
        .json({ error: { message: "Insufficient privileges" } });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: { message: "Invalid token" } });
  }
}
