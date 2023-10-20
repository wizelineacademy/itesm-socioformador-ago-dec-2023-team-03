// Models
const {
  Member,
  Team,
  TeamMember
} = require('../models');

// Errors
const { ApiError } = require('../errors');

// ---------------------------------------------------------------------------------------------------------------------
async function addMemberToTeam(req, res, next) {
  try {
    // Find the team with the specified teamId, throw a 404 error if it doesn't exist
    const teamId = req.body.teamId;
    const team = await Team.findByPk(teamId);
    if (!team) throw new ApiError(404, `Team with id ${teamId} not found`);

    // Find the member with the specified memberId, throw a 404 error if it doesn't exist
    const memberId = req.body.memberId;
    const member = await Member.findByPk(memberId);
    if (!member) throw new ApiError(404, `Member with id ${memberId} not found`);

    // Create a new entry in the TeamMember table linking the team and member
    const teamMember = await TeamMember.create({ teamId, memberId });

    res.status(201).json({
      success: true,
      message: `Member ${member.firstName} has been added to team ${team.name}`,
      data: { teamMember }
    });
  } catch(err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function removeMemberFromTeam(req, res, next) {
  try {
    const teamId = req.body.teamId;
    const team = await Team.findByPk(teamId);
    if (!team) {
      throw new ApiError(404, `Team with id ${teamId} not found`);
    }

    const memberId = req.body.memberId;
    const member = await Member.findByPk(memberId);
    if (!member) {
      throw new ApiError(404, `Member with id ${memberId} not found`);
    }

    const destroyedTeamMembers = await TeamMember.destroy({ where: { teamId, memberId } });

    if (destroyedTeamMembers === 0) {
      throw new ApiError(404, `No member of the team was removed. There is no member with id ${teamId} ` + 
                              `that belongs to team with id ${memberId}`);
    }

    res.status(200).json({
      success: true,
      message: `Member with id ${memberId} has been removed from team with id ${teamId}`
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
