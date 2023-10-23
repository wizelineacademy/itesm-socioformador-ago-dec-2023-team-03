const express = require('express');
const Joi = require('joi');

const router = express.Router();

// Model validators
const roleValidators = require('../models/validators/role.js');

// Middlewares
const validateLoginToken = require('../middlewares/validateLoginToken.js');
const validateRequestData = require('../middlewares/validateRequestData.js');
const isAdmin = require('../middlewares/isAdmin.js');

// Controllers
const {
  create,
  getAll,
  update,
  remove
} = require('../controllers/role.js');

// Route middlewares
const mode = process.env.NODE_ENV;
if (mode !== 'development') {
  router.use(validateLoginToken);
  router.use(isAdmin);
}

// Routes
router.route('/')
  .post(
    validateRequestData({
      'body.name': roleValidators.name
    }),
    create
  )
  .get(getAll);

router.route('/:id')
  .patch(
    validateRequestData({
      'params.id': Joi.string().guid({ version: 'uuidv4' }).required().label('Role ID'),
      'body.name': roleValidators.name
    }),
    update
  )
  .delete(
    validateRequestData({
      'params.id': Joi.string().guid({ version: 'uuidv4' }).required().label('Role ID')
    }),
    remove
  );

module.exports = router;
