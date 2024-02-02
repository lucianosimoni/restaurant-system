export default function authRole(allowedRoles) {
  return function (req, res, next) {
    const userRole = req.staffRole;

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      return res
        .status(403)
        .json({ error: { message: "Insufficient permissions" } });
    }
  };
}
