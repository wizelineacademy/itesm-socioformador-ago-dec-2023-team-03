const express = require('express');
const Joi = require('joi');

const router = express.Router();

// Models validators
const teamValidators = require('../models/validators/team.js');

// Middlewares
const validateRequestData = require('../middlewares/validateRequestData.js');

// Controllers
const {
  create,
  getAll,
  update,
  remove,
  getMembers,
  getLlms
} = require('../controllers/team.js');

// Routes
router.route('/')
  .post(
    validateRequestData({
      'body.name': teamValidators.name
    }),
    create
  )
  .get(getAll);

router.route('/:id')
  .patch(update)
  .delete(remove);

router.route('/:id/members')
  .get(
    validateRequestData({
      'params.id': Joi.string().guid({ version: 'uuidv4' }).required().label('Team ID')
    }),
    getMembers
  );

router.route('/:id/llms')
  .get(
    validateRequestData({
      'params.id': Joi.string().guid({ version: 'uuidv4' }).required().label('Team ID')
    }),
    getLlms
  );

module.exports = router;
