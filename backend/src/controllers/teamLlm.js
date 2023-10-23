// Models
const {
  LLM,
  Team,
  TeamLLM
} = require('../models');

// Errors
const { ApiError } = require('../errors');

// Utils
const validateIdInModel = require('../utils/validateIdInModel.js');

// ---------------------------------------------------------------------------------------------------------------------
async function giveLLMAccessToTeam(req, res, next) {
  try {
    const { teamId, llmId } = req.body;

    const foundTeam = await validateIdInModel(teamId, Team);
    const foundLLM = await validateIdInModel(llmId, LLM);

    // Check if the team already has access to the provided LLM
    let existingTeamLLM = await TeamLLM.findOne({ where: { teamId, llmId } });
    if (existingTeamLLM) {
      const errorMessage = `Team "${foundTeam.name}" already has access to the LLM "${foundLLM.name}"`;
      throw new ApiError(409, errorMessage);
    }

    // Create a new TeamLLM
    await TeamLLM.create({ teamId, llmId });

    res.status(201).json({
      success: true,
      message: `Team "${foundTeam.name}" now has access to the LLM "${foundLLM.name}"`
    });
  } catch(err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function removeLLMAccessToTeam(req, res, next) {
  try {
    const { teamId, llmId } = req.body;

    // Check if the specified team exists
    const foundTeam = await validateIdInModel(teamId, Team);
    const foundLLM = await validateIdInModel(llmId, LLM);

    // Remove LLM access from the team
    const destroyedTeamLLMs = await TeamLLM.destroy({ where: { teamId, llmId } });

    if (destroyedTeamLLMs === 0) {
      const errorMessage = `Team "${foundTeam.name}" doesn't have the LLM "${foundLLM.name}"`;
      throw new ApiError(404, errorMessage);
    }

    res.status(200).json({
      success: true,
      message: `LLM "${foundLLM.name}" access was removed from team "${foundTeam.name}"`
    });
  } catch(err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

module.exports = {
  giveLLMAccessToTeam,
  removeLLMAccessToTeam
};
