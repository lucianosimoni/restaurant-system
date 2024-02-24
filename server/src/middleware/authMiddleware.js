import jwt from "jsonwebtoken";
import { Responses } from "../utils/responsesUtils.js";

/**
 * #### Used to check if request has a valid Bearer token
 * adds req.loggedInStaff object for the next requests.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {NextFunction} next
 * @returns {NextFunction}
 */
export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return Responses.missingAuth(res);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return Responses.missingBearer(res);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.loggedInStaff = {
      id: decodedToken.staffId,
      role: decodedToken.staffRole,
    };
    next();
  } catch (err) {
    console.error(err);
    return Responses.invalidToken(res);
  }
}

/**
 * #### Verifies if the staff's role is any of the allowed roles to proceed.
 * @param {["OWNER", "SECTOR_LEADER", "EMPLOYEE", "MANAGER"]} allowedRoles - List of *allowed roles*.
 * @returns {Function} Middleware function for Express.
 */
export function authRole(allowedRoles) {
  return function (req, res, next) {
    const { id, role } = req.loggedInStaff;
    if (!id || !role) {
      return Responses.insufficientPermissions(res);
    }

    // If the StaffId param is the same as the Token id, continue because it's their own data.
    if (req.params.staffId == id) {
      return next();
    }

    if (allowedRoles.includes(role)) {
      next();
    } else {
      return Responses.insufficientPermissions(res);
    }
  };
}
