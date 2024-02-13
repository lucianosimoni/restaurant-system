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
    console.log("auth decodedToken is:");
    console.log(decodedToken);
    req.staffId = decodedToken.staffId;
    req.staffRole = decodedToken.staffRole;
    next();
  } catch (err) {
    return res.status(401).json({ error: { message: "Invalid token" } });
  }
}

/**
 *
 * @param {["OWNER", "SECTOR_LEADER", "STAFF", "MANAGER"]} allowedRoles - List of allowed roles.
 * @returns
 */
export function authRole(allowedRoles) {
  return function (req, res, next) {
    console.log("Authenticating roles:");
    console.log(allowedRoles);

    let userRole = req.staffRole;
    if (!userRole) {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return missingAuth(res);
      }
      const token = authHeader.split(" ")[1];
      if (!token) {
        return missingBearer(res);
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.staffId = decodedToken.staffId;
      req.staffRole = decodedToken.staffRole;
      userRole = decodedToken.staffRole;
    }

    console.log(`and userRole out of request by auth.js is: ${userRole}`);

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      return res
        .status(403)
        .json({ error: { message: "Insufficient permissions" } });
    }
  };
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
