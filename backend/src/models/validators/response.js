const Joi = require('joi');

const responseValidators = {
  message: Joi.string()
    .min(1)
    .required()
    .label('Message'),
  chatId: Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
    .label('Chat ID'),
  isLiked: Joi.boolean()
    .label('Like'),
  usedTokens: Joi.number()
    .integer()
    .positive()
    .label('Tokens')
};

module.exports = responseValidators;
