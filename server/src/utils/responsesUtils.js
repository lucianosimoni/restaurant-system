/**
 * ### _400_
 * @param {Express.Response} res
 * @returns {error} _error.message_ _**"Request body is missing arguments."**_
 */
function missingBody(res) {
  return res.status(400).json({
    error: { message: "Request body is missing arguments." },
  });
}

/**
 * ### _400_
 * @param {Express.Response} res
 * @returns {error} _error.message_ _**"URL queries are missing arguments."**_
 */
function missingQuery(res) {
  return res.status(400).json({
    error: { message: "URL queries are missing arguments." },
  });
}

/**
 * ### _400_
 * @param {Express.Response} res
 * @param {string} errorMessage _(optional)_
 * @returns {error} _error.message_ _**"URL params are missing arguments."**_
 */
function missingParams(
  res,
  errorMessage = "URL params are missing arguments."
) {
  return res.status(400).json({
    error: { message: errorMessage },
  });
}

/**
 * ### _409_
 * @param {Express.Response} res
 * @param {string} errorMessage _(optional)_
 * @returns {error} _error.message_ _**"Conflicting information found."**_
 */
function conflict(res, errorMessage = "Conflicting information found.") {
  return res.status(409).json({
    error: { message: errorMessage },
  });
}

/**
 * ### _401_
 * @param {Express.Response} res
 * @returns {error} _error.message_ _**"Username or Password is wrong."**_
 */
function wrongPasswordOrUsername(res) {
  return res.status(401).json({
    error: { message: "Username or Password is wrong." },
  });
}

/**
 * ### _400_
 * @param {Express.Response} res
 * @param {string} errorMessage _(optional)_
 * @returns {error} _error.message_ _**"One or more Body arguments is wrong."**_
 */
function wrongBody(res, errorMessage = "One or more Body arguments is wrong.") {
  return res.status(400).json({
    error: { message: errorMessage },
  });
}

/**
 * ### _401_
 * @param {Express.Response} res
 * @returns {error} _error.message_ _**"Authorization header missing."**_
 */
function missingAuth(res) {
  return res.status(401).json({
    error: { message: "Authorization header missing" },
  });
}

/**
 * ### _401_
 * @param {Express.Response} res
 * @returns {error} _error.message_ _**"Bearer token missing."**_
 */
function missingBearer(res) {
  return res.status(401).json({
    error: { message: "Bearer token missing" },
  });
}

/**
 * ### _404_
 * @param {Express.Response} res
 * @param {string} errorMessage _(optional)_
 * @returns {error} _error.message_ _**"Entry not found."**_
 */
function notFound(res, errorMessage = "Entry not found.") {
  return res.status(404).json({
    error: { message: errorMessage },
  });
}

/**
 * ### _403_
 * @param {Express.Response} res
 * @param {string} errorMessage _(optional)_
 * @returns {error} _error.message_ _**"Insufficient permissions."**_
 */
function insufficientPermissions(
  res,
  errorMessage = "Insufficient permissions."
) {
  return res.status(403).json({
    error: { message: errorMessage },
  });
}

/**
 * ### _401_
 * @param {Express.Response} res
 * @returns {error} _error.message_ _**"Invalid token."**_
 */
function invalidToken(res) {
  return res.status(401).json({ error: { message: "Invalid token." } });
}

/**
 * ### _500_
 * @param {Express.Response} res
 * @param {string} errorMessage _(optional)_
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
 * @param {string} errorMessage _(optional)_
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
 * ### _500_
 * _**"Unexpected server error. Try again later."**_
 * @param {Express.Response} res
 * @param {string} errorMessage _(optional)_
 * @returns {{error:{code:"UNEXPECTED_ERROR",message:"Unexpected server error. Try again later."}}}
 */
function unexpectedError(
  res,
  errorMessage = "Unexpected server error. Try again later."
) {
  return res.status(500).json({
    error: {
      code: "UNEXPECTED_ERROR",
      message: errorMessage,
    },
  });
}

/**
 * #### Many reusable Request Responses to go.
 */
export const Responses = {
  missingAuth,
  missingBearer,
  missingBody,
  missingParams,
  missingQuery,
  wrongBody,
  wrongPasswordOrUsername,
  insufficientPermissions,
  internalError,
  invalidToken,
  notFound,
  conflict,
  dbError,
  unexpectedError,
};
