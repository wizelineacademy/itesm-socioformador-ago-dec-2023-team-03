const Joi = require('joi')

function validateUUID(uuid, options) {
  return function(req, res, next) {
    try {
      if (!options) options = {};
  
      const version = options.version || 'uuidv4';
  
      const uuidValidation = Joi.string()
        .guid({ version })
        .validate(uuid);
      
      if (uuidValidation.error) {
        throw new ApiError(400, uuidValidation.error.message);
      }
  
      next();
    } catch(err) {
      next(err);
    }
  }
}

module.exports = validateUUID
