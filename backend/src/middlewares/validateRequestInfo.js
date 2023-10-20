// Errors
const { ApiError } = require('../errors');

function validateRequestInfo(requestKey, validations) {
  return function(req, res, next) {
    console.log(req.protocol)
    try {
      for (const [key, fn] of Object.entries(validations)) {
        const value = req[requestKey][key];
        const result = fn.validate(value);
        if (result.error) {
          throw new ApiError(400, result.error.message);
        }
        req[requestKey][key] = result.value;
      }
      next();
    } catch(err) {
      next(err);
    }
  }
}

module.exports = validateRequestInfo
