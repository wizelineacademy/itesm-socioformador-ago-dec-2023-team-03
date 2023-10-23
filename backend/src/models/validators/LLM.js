const Joi = require('joi');

const LLMValidators = {
  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required()
    .label('Name')
};

module.exports = LLMValidators;
