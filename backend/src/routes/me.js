const express = require('express');
const router = express.Router();

// Controllers
const {
  getMe,
  getMyTeams,
  getMyChats,
  createChat
} = require('../controllers/me.js');

// Middlewares
const validateLoginToken = require('../middlewares/validateLoginToken.js');

router.route('/')
    .get(validateLoginToken, getMe);

router.route('/teams')
  .get(validateLoginToken, getMyTeams);

router.route('/chats')
  .get(validateLoginToken, getMyChats)
  .post(validateLoginToken, createChat);
  
module.exports = router;
