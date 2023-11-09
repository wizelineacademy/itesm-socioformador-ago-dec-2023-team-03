const express = require('express');

const router = express.Router();

// Middlewares
const validateUserSession = require('../middlewares/validateUserSession.js');
const checkRole = require('../middlewares/checkRole.js');

// Controllers
const {
  create,
  getAll
} = require('../controllers/tokens.js');

// Routes
router.route('/')
  .get(validateUserSession, checkRole(['admin', 'user']), getAll)
  .post(validateUserSession, checkRole(['admin']), create)

module.exports = router;
