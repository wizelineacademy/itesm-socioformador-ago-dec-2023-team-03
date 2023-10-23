const Joi = require('joi');

const teamMemberValidators = {
  teamId: Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
    .label('Team ID'),
  llmId: Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
    .label('LLM ID')
};

module.exports = teamMemberValidators;
