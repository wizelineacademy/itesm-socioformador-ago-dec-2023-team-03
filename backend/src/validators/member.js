const Joi = require('joi');

class MemberValidator {
  validateFirstName(firstName) {
    const validator = Joi.string()
      .required()
      .replace(/\s+/g, ' ')
      .trim()
      .min(3)
      .max(50)
      .pattern(new RegExp('^[A-Za-z\\s]+$'))
      .messages({
        'string.base': 'The first name should only contain alphabetic characters and spaces',
        'any.required': 'The first name is required',
        'string.empty': 'The first name is required',
        'string.min': 'The first name must have a minimum of 3 characters',
        'string.max': 'The first name cannot exceed 50 characters',
        'string.pattern.base': 'The first name should only contain alphabetic characters and spaces',
      });

    return validator.validate(firstName);
  }

  validateLastName(lastName) {
    const validator = Joi.string()
      .required()
      .replace(/\s+/g, ' ')
      .trim()
      .min(3)
      .max(50)
      .pattern(new RegExp('^[A-Za-z\\s]+$'))
      .messages({
        'string.base': 'The last name should only contain alphabetic characters and spaces',
        'any.required': 'The last name is required',
        'string.empty': 'The last name is required',
        'string.min': 'The last name must have a minimum of 3 characters',
        'string.max': 'The last name cannot exceed 50 characters',
        'string.pattern.base': 'The last name should only contain alphabetic characters and spaces',
      });

    return validator.validate(lastName);
  }

  validateEmail(email) {
    const validator = Joi.string()
      .required()
      .lowercase()
      .trim()
      .email()
      .messages({
        'string.base': 'The email is invalid',
        'any.required': 'The email is required',
        'string.email': 'The email is invalid'
      });

    return validator.validate(email);
  }

  validateRoleId(roleId) {
    const validator = Joi.string().uuid();
    return validator.validate(roleId);
  }
}

module.exports = MemberValidator;
