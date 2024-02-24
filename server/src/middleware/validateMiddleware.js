import { Responses } from "../utils/responsesUtils.js";

/**
 * @param {[String]} expectedBody
 * @returns { next } _**next()**_ or  _**Responses.missingBody()**_
 */
function body(expectedBody = []) {
  return function (req, res, next) {
    const missing = expectedBody.find((prop) => req.body[prop] === undefined);
    if (missing) return Responses.missingBody(res);

    next();
  };
}

/**
 * @param {[String]} expectedParams
 * @returns { next } _**next()**_ or  _**Responses.missingBody()**_
 */
function params(expectedParams = []) {
  // TODO: Does not make much sense to have it. "validating the existence of a parameter in the URL path is generally unnecessary, as the framework enforces its presence based on the route definition."
  return function (req, res, next) {
    const missing = expectedParams.find(
      (param) => req.params[param] === undefined
    );
    if (missing) return Responses.missingParams(res);

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
