const express = require('express');

const router = express.Router();

const teamMemberValidators = require('../models/validators/teamMember.js')

// Middlewares
const validateRequestData = require('../middlewares/validateRequestData.js');

// Controllers
const {
  addMemberToTeam,
  removeMemberFromTeam
} = require('../controllers/teamMember.js');

// Routes
router.route('/')
  .post(
    validateRequestData({
      'body.teamId': teamMemberValidators.teamId,
      'body.memberId': teamMemberValidators.memberId
    }),
    addMemberToTeam
  )
  .delete(
    validateRequestData({
      'body.teamId': teamMemberValidators.teamId,
      'body.memberId': teamMemberValidators.memberId
    }),
    removeMemberFromTeam
  )

module.exports = router;
