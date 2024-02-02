// authRole.js
export function authRole(allowedRoles) {
  return function (req, res, next) {
    const userRole = req.staffRole;

    if (allowedRoles.includes(userRole)) {
      // User has the required role, proceed to the next middleware or route handler
      next();
    } else {
      // User does not have the required role, send a 403 Forbidden response
      return res
        .status(403)
        .json({ error: { message: "Insufficient permissions" } });
    }
  };
}
