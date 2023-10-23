// Models
const {
  Member,
  Team,
  TeamMember,
  Chat
} = require('../models');

// Errors
const { ApiError } = require('../errors');

// Utils
const validateIdInModel = require('../utils/validateIdInModel.js')

// ---------------------------------------------------------------------------------------------------------------------
async function addMemberToTeam(req, res, next) {
  try {
    const { teamId, memberId } = req.body;

    const foundTeam = await validateIdInModel(teamId, Team);
    const foundMember = await validateIdInModel(memberId, Member);

    // Check if a member already belongs to the team
    let teamMember = await TeamMember.findOne({ where: { teamId, memberId } });
    if (teamMember) {
      const errorMessage = `Member with email "${foundMember.email}" already belongs to team "${foundTeam.name}"`;
      throw new ApiError(400, errorMessage);
    }

    teamMember = await TeamMember.create({ teamId, memberId });

    res.status(201).json({
      success: true,
      message: `Member with email "${foundMember.email}" has been added to the team "${foundTeam.name}"`
    });
  } catch(err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function removeMemberFromTeam(req, res, next) {
  try {
    const { teamId, memberId } = req.body;

    const foundTeam = await validateIdInModel(teamId, Team);
    const foundMember = await validateIdInModel(memberId, Member);

    const destroyedTeamMembers = await TeamMember.destroy({ where: { teamId, memberId } });
    if (destroyedTeamMembers === 0) {
      const errorMessage = 'No member was removed. ' +
        `Member with email "${foundMember.email}" doesn't belongs to team "${foundTeam.name}"`;
      throw new ApiError(404, errorMessage);
    }

    // Remove all the chats from the member associated with the team
    await Chat.destroy({ where: { teamId, memberId } });

    res.status(200).json({
      success: true,
      message: `Member with email "${foundMember.email}" has been removed from team "${foundTeam.name}"`
    });
  } catch(err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

module.exports = {
  addMemberToTeam,
  removeMemberFromTeam
};
