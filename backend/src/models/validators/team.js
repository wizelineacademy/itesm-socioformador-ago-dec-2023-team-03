const Joi = require('joi');

const teamValidators = {
  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(new RegExp('^[a-zA-Z0-9\\s]*$'))
    .required()
    .label('Name')
    .messages({
      'string.pattern.base': 'Name must only contain letters, numbers, and spaces'
    })
};

module.exports = teamValidators;
