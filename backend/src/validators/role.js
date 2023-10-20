const Joi = require('joi');

class RoleValidator {
  validateName(name) {
    const validator = Joi.string()
      .required()
      .replace(/\s+/g, ' ')
      .trim()
      .empty()
      .alphanum()
      .min(3)
      .max(50)
      .messages({
        'string.base': 'The role name should only contain alphabetic characters, spaces and numbers',
        'any.required': 'The role name is required',
        'string.empty': 'The role name is required',
        'string.alphanum': 'The role name should only contain alphabetic characters, spaces and numbers',
        'string.min': 'The role name must have a minimum of 3 characters',
        'string.max': 'The role name cannot exceed 50 characters'
      });
  
    return validator.validate(name);
  }
}

module.exports = RoleValidator;
