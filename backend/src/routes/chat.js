const express = require('express');
const Joi = require('joi');

const router = express.Router();

// Models validators
const chatValidators = require('../models/validators/chat.js');
const promptValidators = require('../models/validators/prompt.js');

// Middlewares
const validateRequestData = require('../middlewares/validateRequestData.js');
const validateUserSession = require('../middlewares/validateUserSession.js');
const checkRole = require('../middlewares/checkRole.js');

// Controllers
const {
  createChat,
  deleteChat,
  findChat,
  createPrompt,
  getChatPrompts
} = require('../controllers/chat.js');

const chatIdParamValidator = Joi.string().guid({ version: 'uuidv4' }).required().label('Chat ID');

// Routes
router.route('/')
  .post(
    // validateRequestData({
    //   'body.title': chatValidators.title,
    //   'body.memberId': chatValidators.memberId,
    //   'body.teamId': chatValidators.teamId,
    //   'body.llmId': chatValidators.llmId
    // }),
    validateUserSession,
    checkRole(['admin', 'user']),
    createChat
  )

router.route('/:id')
  // Find chat
  .get(
    validateRequestData({
      'params.id': chatIdParamValidator
    }),
    findChat
  )
  // Delete chat
  .delete(
    validateRequestData({
      'params.id': chatIdParamValidator
    }),
    deleteChat
  )

// Routes for handling chat prompts
router.route('/:id/prompts')
  .get(
    validateUserSession,
    getChatPrompts
  )
  .post(
    validateUserSession,
    checkRole(['admin', 'user']),
    // validateRequestData({
    //   'body.message': promptValidators.message,
    //   'params.id': chatIdParamValidator
    // }),
    createPrompt
  )

module.exports = router;
