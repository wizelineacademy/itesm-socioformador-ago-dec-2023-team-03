const express = require('express');

const router = express.Router();

// Models validators
const LLMValidators = require('../models/validators/LLM.js');

// Middlewares
const validateRequestData = require('../middlewares/validateRequestData.js');

// Controllers
const {
  create,
  find,
  getAll
} = require('../controllers/llm.js');

router.route('/')
  .post(
    validateRequestData({
      'body.name': LLMValidators.name
    }),
    create
  ).get(getAll);

router.route('/:id')
  .get(find)

module.exports = router;
