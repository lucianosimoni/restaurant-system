/**
 * ### _500_
 * _**"DB_ERROR"**_
 * @param {"Unexpect database error."} errorMessage
 * @returns {{error:{code:"UNEXPECTED_ERROR",message:errorMessage}}}
 */
function dbError(errorMessage = "Unexpect database error.") {
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
 * @param {"Unexpected server error. Try again later."} errorMessage
 * @returns {{error:{code:"UNEXPECTED_ERROR",message:errorMessage}}}
 */
function unexpectedError(
  errorMessage = "Unexpected server error. Try again later."
) {
  return new Error.status(500).json({
    error: {
      code: "UNEXPECTED_ERROR",
      message: errorMessage,
    },
  });
}

export const Erros = {
  dbError,
  unexpectedError,
};
