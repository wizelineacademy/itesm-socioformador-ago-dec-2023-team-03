const express = require('express');
const router = express.Router();

// Controllers
const {
  getMe,
  getMyTeams,
  getMyChats,
  createChat,
  createPrompt
} = require('../controllers/me.js');

// Middlewares
const validateLoginToken = require('../middlewares/validateLoginToken.js');
const validateUserSession = require('../middlewares/validateUserSession.js');

router.route('/')
    .get(validateLoginToken, getMe);

router.route('/teams')
  .get(validateLoginToken, getMyTeams);

router.route('/chats')
  .get(validateLoginToken, getMyChats)
  .post(validateLoginToken, createChat);

router.route('/chats/:chatId/prompts')
  .post(validateUserSession, createPrompt)

module.exports = router;
