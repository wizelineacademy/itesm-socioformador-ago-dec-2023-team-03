const Joi = require('joi');

const memberValidators = {
  firstName: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(new RegExp('^[A-Za-z\\s]*$'))
    .required()
    .label('First name')
    .messages({
      'string.pattern.base': 'First name must only contain letters and spaces'
    }),
  lastName: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(new RegExp('^[A-Za-z\\s]*$'))
    .required()
    .label('Last name')
    .messages({
      'string.pattern.base': 'Last name must only contain letters and spaces'
    }),
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .label('Email'),
  roleId: Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
    .label('Role ID')
};

module.exports = memberValidators;
