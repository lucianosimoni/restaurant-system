import { missingBody } from "../utils/defaultResponses.js";

export default function validateBody(expectedBody = [""]) {
  return function (req, res, next) {
    const missingProperties = expectedBody.filter((prop) => !req.body[prop]);

    if (missingProperties.length > 0) {
      return missingBody(res, missingProperties);
    }

    next();
  };
}
