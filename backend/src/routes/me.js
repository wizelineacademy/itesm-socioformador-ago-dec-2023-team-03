const express = require('express');
const router = express.Router();

// Controllers
const {
  getMe,
  getMyTeams
} = require('../controllers/me.js');

// Middlewares
const validateLoginToken = require('../middlewares/validateLoginToken.js');

router.route('/')
    .get(validateLoginToken, getMe);

router.route('/teams')
  .get(validateLoginToken, getMyTeams);
  
module.exports = router;
