/**
 * ### _400_
 * @param {Express.Response} res
 * @param {String} errorMessage _(optional)_
 * @param {String} code _(optional)_
 * @returns {error} _error.message_ _**"Request body is missing arguments."**_
 */
function missingBody(
  res,
  errorMessage = "Request body is missing arguments.",
  code = "MISSING_BODY"
) {
  return res.status(400).json({
    error: { code, message: errorMessage },
  });
}

/**
 * ### _400_
 * @param {Express.Response} res
 * @param {String} errorMessage _(optional)_
 * @param {String} code _(optional)_
 * @returns {error} _error.message_ _**"URL queries are missing arguments."**_
 */
function missingQuery(
  res,
  errorMessage = "URL queries are missing arguments.",
  code = "MISSING_QUERY"
) {
  return res.status(400).json({
    error: { code, message: errorMessage },
  });
}

/**
 * ### _400_
 * @param {Express.Response} res
 * @param {String} errorMessage _(optional)_
 * @param {String} code _(optional)_
 * @returns {error} _error.message_ _**"URL params are missing arguments."**_
 */
function missingParams(
  res,
  errorMessage = "URL params are missing arguments.",
  code = "MISSING_PARAMS"
) {
  return res.status(400).json({
    error: { code, message: errorMessage },
  });
}

/**
 * ### _409_
 * @param {Express.Response} res
 * @param {String} errorMessage _(optional)_
 * @param {String} code _(optional)_
 * @returns {error} _error.message_ _**"Conflicting information found."**_
 */
function conflict(
  res,
  errorMessage = "Conflicting information found.",
  code = "CONFLICT"
) {
  return res.status(409).json({
    error: { code, message: errorMessage },
  });
}

/**
 * ### _401_
 * @param {Express.Response} res
 * @returns {error} _error.message_ _**"Username or Password is wrong."**_
 */
function wrongPasswordOrUsername(res) {
  return res.status(401).json({
    error: {
      code: "WRONG_CREDENTIALS",
      message: "Username or Password is wrong.",
    },
  });
}

/**
 * ### _401_
 * @param {Express.Response} res
 * @param {String} errorMessage _(optional)_
 * @returns {error} _error.message_ _**"One or more parameters are wrong."**_
 */
function wrongParams(res, errorMessage = "One or more parameters are wrong.") {
  return res.status(401).json({
    error: { code: "WRONG_PARAMS", message: errorMessage },
  });
}

/**
 * ### _400_
 * @param {Express.Response} res
 * @param {String} errorMessage _(optional)_
 * @returns {error} _error.message_ _**"One or more Body arguments is wrong."**_
 */
function wrongBody(res, errorMessage = "One or more Body arguments is wrong.") {
  return res.status(400).json({
    error: { code: "WRONG_BODY", message: errorMessage },
  });
}

/**
 * ### _401_
 * @param {Express.Response} res
 * @returns {error} _error.message_ _**"Authorization header missing."**_
 */
function missingAuth(res) {
  return res.status(401).json({
    error: {
      code: "MISSING_AUTH_HEADER",
      message: "Authorization header missing.",
    },
  });
}

/**
 * ### _401_
 * @param {Express.Response} res
 * @returns {error} _error.message_ _**"Bearer token missing."**_
 */
function missingToken(res) {
  return res.status(401).json({
    error: {
      code: "MISSING_TOKEN",
      message: "Authorization Token is missing from request.",
    },
  });
}

/**
 * ### _404_
 * @param {Express.Response} res
 * @param {String} errorMessage _(optional)_
 * @param {String} code _(optional)_
 * @returns {error} _error.message_ _**"Entry not found."**_
 */
function notFound(
  res,
  errorMessage = "One or more Entries not found.",
  code = "NOT_FOUND"
) {
  return res.status(404).json({
    error: { code, message: errorMessage },
  });
}

/**
 * ### _403_
 * @param {Express.Response} res
 * @param {String} errorMessage _(optional)_
 * @returns {error} _error.message_ _**"Insufficient permissions."**_
 */
function insufficientPermissions(
  res,
  errorMessage = "Staff with Insufficient permissions."
) {
  return res.status(403).json({
    error: { code: "NOT_ALLOWED", message: errorMessage },
  });
}

/**
 * ### _401_
 * @param {Express.Response} res
 * @returns {error} _error.message_ _**"Invalid token."**_
 */
function invalidToken(res) {
  return res
    .status(401)
    .json({ error: { code: "INVALID_TOKEN", message: "Invalid token." } });
}

/**
 * ### _401_
 * @param {Express.Response} res
 * @returns {error} _error.message_ _**"Expired token."**_
 */
function expiredToken(res) {
  return res
    .status(401)
    .json({ error: { code: "EXPIRED_TOKEN", message: "Expired token." } });
}

/**
 * ### _500_
 * @param {Express.Response} res
 * @param {String} errorMessage _(optional)_
 * @returns {error} _error.message_ _**"An Internal Server error occurred."**_
 */
function internalError(
  res,
  errorMessage = "An Internal Server error occurred."
) {
  return res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: errorMessage,
    },
  });
}

/**
 * ### _500_
 * _**"DB_ERROR"**_
 * @param {Express.Response} res
 * @param {String} errorMessage _(optional)_
 * @returns {{error:{code:"UNEXPECTED_ERROR",message:"Unexpect database error."}}}
 */
function dbError(res, errorMessage = "Unexpect database error.") {
  return res.status(500).json({
    error: {
      code: "DB_ERROR",
      message: errorMessage,
    },
  });
}

/**
 * #### Many reusable Request Responses to go.
 */
export const Responses = {
  missingAuth,
  missingToken,
  missingBody,
  missingParams,
  missingQuery,
  wrongBody,
  wrongPasswordOrUsername,
  wrongParams,
  insufficientPermissions,
  internalError,
  invalidToken,
  expiredToken,
  notFound,
  conflict,
  dbError,
};
