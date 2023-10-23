const Joi = require('joi');

const teamMemberValidators = {
  teamId: Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
    .label('Team ID'),
  memberId: Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
    .label('Member ID')
};

module.exports = teamMemberValidators;
