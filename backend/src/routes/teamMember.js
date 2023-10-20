const express = require('express');
const Joi = require('joi');

const router = express.Router();

// Middlewares
const validateRequestInfo = require('../middlewares/validateRequestInfo.js');

// Controllers
const {
  addMemberToTeam,
  removeMemberFromTeam
} = require('../controllers/teamMember.js');

router.route('/')
  .post(
    validateRequestInfo('body', {
      teamId: Joi.string().guid({ version: 'uuidv4' }),
      memberId: Joi.string().guid({ version: 'uuidv4' })
    }),
    addMemberToTeam
  )
  .delete(
    validateRequestInfo('body', {
      teamId: Joi.string().guid({ version: 'uuidv4' }),
      memberId: Joi.string().guid({ version: 'uuidv4' })
    }),
    removeMemberFromTeam
  )

module.exports = router;
