/**
 * ### _400_
 * @param {Express.Response} res
 * @returns {error} _error.message_ _**"Request body is missing arguments."**_
 */
export function missingBody(res) {
  return res.status(400).json({
    error: { message: "Request body is missing arguments." },
  });
}

/**
 * ### _400_
 * @param {Express.Response} res
 * @returns {error} _error.message_ _**"URL queries are missing arguments."**_
 */
export function missingQuery(res) {
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
export function missingParams(res) {
  return res.status(400).json({
    error: { message: "URL params are missing arguments." },
  });
}

/**
 * ### _401_
 * @param {Express.Response} res
 * @param {string} errorMessage _(optional)_
 * @returns {error} _error.message_ _**"Username or Password is wrong."**_
 */
export function wrongPasswordOrUsername(res) {
  return res.status(401).json({
    error: { message: "Username or Password is wrong." },
  });
}

/**
 * ### _401_
 * @param {Express.Response} res
 * @param {string} errorMessage _(optional)_
 * @returns {error} _error.message_ _**"One or more Body arguments is wrong."**_
 */
export function wrongBody(res) {
  return res.status(401).json({
    error: { message: "One or more Body arguments is wrong." },
  });
}

/**
 * ### _401_
 * @param {Express.Response} res
 * @param {string} errorMessage _(optional)_
 * @returns {error} _error.message_ _**"Authorization header missing."**_
 */
export function missingAuth(res) {
  return res.status(401).json({
    error: { message: "Authorization header missing" },
  });
}

/**
 * ### _401_
 * @param {Express.Response} res
 * @returns {error} _error.message_ _**"Bearer token missing."**_
 */
export function missingBearer(res) {
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
export function notFound(res, errorMessage = "Entry not found.") {
  return res.status(404).json({
    error: { message: errorMessage },
  });
}

/**
 * ### _500_
 * @param {Express.Response} res
 * @param {string} errorMessage _(optional)_
 * @returns {error} _error.message_ _**"An Internal Server error occurred."**_
 */
export function internalError(
  res,
  errorMessage = "An Internal Server error occurred."
) {
  return res.status(500).json({
    error: { message: errorMessage },
  });
}

/**
 * ### _403_
 * @param {Express.Response} res
 * @param {string} errorMessage _(optional)_
 * @returns {error} _error.message_ _**"Insufficient permissions."**_
 */
export function insufficientPermissions(
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
export function invalidToken(res) {
  return res.status(401).json({ error: { message: "Invalid token." } });
}
