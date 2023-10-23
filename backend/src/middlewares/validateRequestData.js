// Errors
const { ApiError } = require('../errors');

function validateRequestData(validators) {
  return function(req, res, next) {
    try {
      for (const [key, validator] of Object.entries(validators)) {
        const propertyChain = key.split('.');
        let propertyValue = req;
        for (const property of propertyChain) {
          propertyValue = propertyValue[property];
        }

        const validationResult = validator.validate(propertyValue, {
          errors: { label: 'key', wrap: { label: false } }
        });

        if (validationResult.error) {
          const { message } = validationResult.error;
          throw new ApiError(400, message);
        }

        // Update the request property value to the value that validaton.value returns
        let reqProperty = req;
        const propertyChainWithoutLastProperty = propertyChain.slice(0, propertyChain.length - 1);
        for (const property of propertyChainWithoutLastProperty) {
          reqProperty = reqProperty[property];
        }

        const lastProperty = propertyChain[propertyChain.length - 1];
        reqProperty[lastProperty] = validationResult.value;
      }
      next();
    } catch(err) {
      next(err);
    }
  }
}

module.exports = validateRequestData;
