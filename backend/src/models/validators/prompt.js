const Joi = require('joi');

const promptValidators = {
  message: Joi.string()
    .min(1)
    .required()
    .label('Message'),
  chatId: Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
    .label('Chat ID'),
  usedTokens: Joi.number()
    .integer()
    .positive()
    .label('Tokens')
};

module.exports = promptValidators;
