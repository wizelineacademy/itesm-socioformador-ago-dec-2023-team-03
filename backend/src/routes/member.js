const express = require('express');
const Joi = require('joi');

const router = express.Router();

// Models validators
const memberValidator = require('../models/validators/member.js');

// Middlewares
const validateRequestData = require('../middlewares/validateRequestData.js');

// Controllers
const {
  login,
  register,
  getAll,
  getMemberTeamsById
} = require('../controllers/member.js');

// Routes
router.route('/login')
  .post(
    validateRequestData({
      'body.email': memberValidator.email
    }),
    login
  );

router.route('/register')
  .post(
    validateRequestData({
      'body.firstName': memberValidator.firstName,
      'body.lastName': memberValidator.lastName,
      'body.email': memberValidator.email,
      'body.roleId': memberValidator.roleId
    }),
    register
  );

router.route('/').get(getAll);

router.route('/:id/teams')
  .get(
    validateRequestData({
      'params.id': Joi.string().guid({ version: 'uuidv4' }).required().label('Member ID')
    }),
    getMemberTeamsById
  );

module.exports = router;
