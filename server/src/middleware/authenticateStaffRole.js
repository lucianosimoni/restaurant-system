import jwt from "jsonwebtoken";
import { missingAuth, missingBearer } from "../utils/defaultResponses.js";
import dotenv from "dotenv";
dotenv.config();

export default function authenticateStaffRole(roleNeeded) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return missingAuth(res);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return missingBearer(res);
  }

  delete req.staffId; // if sent via body

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.staffId = decodedToken.staffId;

    // TODO: Verify Role

    next();
  } catch (err) {
    return res.status(401).json({ error: { message: "Invalid token" } });
  }
}
