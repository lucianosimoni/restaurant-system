import jwt from "jsonwebtoken";
import {
  insufficientPermissions,
  invalidToken,
  missingAuth,
  missingBearer,
} from "../utils/defaultResponses.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * #### Used to check if request has a valid Bearer token
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {NextFunction} next
 * @returns {NextFunction}
 */
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
    req.loggedInStaff.staffId = decodedToken.staffId;
    req.loggedInStaff.staffRole = decodedToken.staffRole;
    next();
  } catch (err) {
    return invalidToken(res);
  }
}

/**
 * #### Verifies if the staff's role is any of the allowed roles to proceed.
 * @param {["OWNER", "SECTOR_LEADER", "EMPLOYEE", "MANAGER"]} allowedRoles - List of *allowed roles*.
 * @returns {Function} Middleware function for Express.
 */
export function authRole(allowedRoles) {
  return function (req, res, next) {
    const { staffId, staffRole } = req.loggedInStaff;
    if (!staffId || !staffRole) {
      return insufficientPermissions(res);
    }

    // TODO: Is this comment good?
    // If the StaffId param is the same as the Token staffId, continue because it's their own data.
    if (req.params.staffId == staffId) {
      return next();
    }

    if (allowedRoles.includes(staffRole)) {
      next();
    } else {
      return insufficientPermissions(res);
    }
  };
}
