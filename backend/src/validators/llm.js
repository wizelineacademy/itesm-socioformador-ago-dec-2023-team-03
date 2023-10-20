const Joi = require('joi');

class LlmValidator {
  validateName(name) {
    const validator = Joi.string()
      .required()
      .trim()
      .empty()
      .alphanum()
      .messages({
        'string.base': 'The llm name should be a string',
        'any.required': 'The llm name is required',
        'string.empty': 'The llm name cannot be an empty string',
        'string.alphanum': 'The llm name should only contain alphabetic characters, spaces and numbers'
      });
  
    return validator.validate(name);
  }
}

module.exports = LlmValidator;
