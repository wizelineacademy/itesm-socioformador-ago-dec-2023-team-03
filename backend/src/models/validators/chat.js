const Joi = require('joi');

const chatValidators = {
  title: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .label('Title'),
  memberId: Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
    .label('Member ID'),
  teamId: Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
    .label('Team ID'),
  llmId: Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
    .label('LLM ID')
};

module.exports = chatValidators;
