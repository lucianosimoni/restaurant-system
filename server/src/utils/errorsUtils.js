import { Prisma } from "@prisma/client";

/**
 * ### Checks the catched Error with the instancesOf Prisma errors and any other known issues.
 * @param {Error} err
 * @returns
 */
function checkDatabaseError(err, whileMessage = "doing something") {
  if (
    err instanceof Prisma.PrismaClientKnownRequestError ||
    err instanceof Prisma.PrismaClientValidationError
  ) {
    console.log("🟡 KNOWN PRISMA DB ERROR");
    console.log({ code: err.code, message: err.message });
    return dbError(err.message, err.code);
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    console.log("🔴 UNKNOWN PRISMA DB ERROR");
    console.log({ code: "UNKNOWN", message: err.message });
    return dbError(err.message);
  }

  console.log("🔴⚠️ UNKNOWN DATABASE ERROR");
  console.error(err);
  throw Errors.dbError(`DB error while: ${whileMessage}.`);
}

/**
 * ### _500_
 * @param {"Unexpect database error."} errorMessage
 * @param {"DB_ERROR"} code
 * @returns {{error:{code:"UNEXPECTED_ERROR",message:errorMessage}}}
 */
function dbError(errorMessage = "Unexpect database error.", code = "DB_ERROR") {
  return new Error({
    error: {
      code: "DB_ERROR",
      message: errorMessage,
    },
  });
}

/**
 * ### _500_
 * @param {"Unexpected server error. Try again later."} errorMessage
 * @param {"UNEXPECTED_ERROR"} code
 * @returns {{error:{code:"UNEXPECTED_ERROR",message:errorMessage}}}
 */
function unexpectedError(
  errorMessage = "Unexpected server error. Try again later.",
  code = "UNEXPECTED_ERROR"
) {
  return new Error({
    error: {
      code: "UNEXPECTED_ERROR",
      message: errorMessage,
    },
  });
}

export const Errors = {
  checkDatabaseError,
  dbError,
  unexpectedError,
};
