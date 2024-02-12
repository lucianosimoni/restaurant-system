export function missingBody() {
  return console.error('Request body is missing arguments.');
}

export function missingParams() {
  return console.error('URL params are missing arguments.');
}

export function wrongPasswordOrUsername() {
  return console.error('Username or Password is wrong.');
}

export function notFound(errorMessage = 'Entry not found.') {
  return console.error(errorMessage);
}

export function internalError(errorMessage = 'An error occurred.') {
  return console.error(errorMessage);
}
