const express = require('express');
const Joi = require('joi');

const router = express.Router();

// Middlewares
const validateRequestInfo = require('../middlewares/validateRequestInfo.js');

// Controllers
const {
  create,
  getAll,
  update,
  remove,
  getMembers
} = require('../controllers/team.js');

router.route('/')
  .post(create)
  .get(getAll);

router.route('/:id')
  .patch(update)
  .delete(remove);

router.route('/:id/members')
  .get(
    validateRequestInfo('params', {
      id: Joi.string().guid({ version: 'uuidv4' }),
    }),
    getMembers
  )

module.exports = router;
