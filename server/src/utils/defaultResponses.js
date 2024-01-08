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

export function wrongPasswordOrCredential(res) {
  return res.status(401).json({
    error: { message: "Credential or Password is wrong." },
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

export function notFound(res) {
  return res.status(404).json({
    error: { message: "Entry not found" },
  });
}
