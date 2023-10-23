const express = require('express');

const router = express.Router();

const teamLlmValidators = require('../models/validators/teamLlm.js')

// Middlewares
const validateRequestData = require('../middlewares/validateRequestData.js');

// Controllers
const {
  giveLLMAccessToTeam,
  removeLLMAccessToTeam
} = require('../controllers/teamLlm.js');

// Routes
router.route('/')
  .post(
    validateRequestData({
      'body.teamId': teamLlmValidators.teamId,
      'body.llmId': teamLlmValidators.llmId
    }),
    giveLLMAccessToTeam
  )
  .delete(
    validateRequestData({
      'body.teamId': teamLlmValidators.teamId,
      'body.llmId': teamLlmValidators.llmId
    }),
    removeLLMAccessToTeam
  )

module.exports = router;
