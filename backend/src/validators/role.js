const Joi = require('joi');

class RoleValidator {
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
        'string.base': 'The role name should only contain alphabetic characters, spaces and numbers',
        'any.required': 'The role name is required',
        'string.empty': 'The role name is required',
        'string.min': 'The role name must have a minimum of 3 characters',
        'string.max': 'The role name cannot exceed 50 characters',
        'string.pattern.base': 'Name should contain only letters, spaces, and numbers'
      });
  
    return validator.validate(name);
  }
}

module.exports = RoleValidator;
