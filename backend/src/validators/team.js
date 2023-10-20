const Joi = require('joi');

class TeamValidator {
  validateName(name) {
    const validator = Joi.string()
      .required()
      .replace(/\s+/g, ' ')
      .trim()
      .empty()
      .pattern(new RegExp('^[a-zA-Z0-9\\s]*$'))
      .min(3)
      .max(50)
      .messages({
        'string.base': 'Name should contain only letters, spaces, and numbers',
        'any.required': 'Name is required',
        'string.empty': 'Name is required',
        'string.pattern.base': 'Name should contain only letters, spaces, and numbers',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name cannot exceed 50 characters'
      });
  
    return validator.validate(name);
  }
}

module.exports = TeamValidator;
