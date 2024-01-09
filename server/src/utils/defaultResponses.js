export function missingBody(res) {
  return res.status(400).json({
    error: { message: "Request body is missing arguments." },
  });
}

export function missingQuery(res) {
  return res.status(400).json({
    error: { message: "URL queries are missing arguments." },
  });
}

export function missingParams(res) {
  return res.status(400).json({
    error: { message: "URL params are missing arguments." },
  });
}

export function wrongPasswordOrUsername(res) {
  return res.status(401).json({
    error: { message: "Username or Password is wrong." },
  });
}

export function wrongBody(res) {
  return res.status(401).json({
    error: { message: "One or more Body arguments is wrong." },
  });
}

export function missingAuth(res) {
  return res.status(401).json({
    error: { message: "Authorization header missing" },
  });
}

export function missingBearer(res) {
  return res.status(401).json({
    error: { message: "Bearer token missing" },
  });
}

export function notFound(res, errorMessage = "Entry not found.") {
  return res.status(404).json({
    error: { message: errorMessage },
  });
}

export function internalError(res, errorMessage = "An error occurred.") {
  return res.status(500).json({
    error: { message: errorMessage },
  });
}
