const express = require('express');

const router = express.Router();

const {
  login,
  register,
  getAll
} = require('../controllers/member.js');

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/').get(getAll);

module.exports = router;
