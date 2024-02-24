import { missingBody, missingParams } from "../utils/defaultResponses.js";

/**
 * @param {[String]} expectedBody
 * @returns { next } _**next()**_ or  _**missingBody()**_
 */
function body(expectedBody = []) {
  return function (req, res, next) {
    const missingProperties = expectedBody.filter((prop) => !req.body[prop]);

    if (missingProperties.length > 0) {
      return missingBody(res);
    }

    next();
  };
}

/**
 * @param {[String]} expectedParams
 * @returns { next } _**next()**_ or  _**missingBody()**_
 */
function params(expectedParams = []) {
  return function (req, res, next) {
    const missingParams = expectedParams.filter((param) => !req.params[param]);

    if (missingParams.length > 0) {
      return missingParams(res);
    }

    next();
  };
}

/**
 * #### Validates the Request in some way.
 */
export const Validate = {
  body,
  params,
};
