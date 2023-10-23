// Models
const {
  Chat,
  Member,
  Team,
  TeamMember,
  TeamLLM,
  LLM,
  Response,
  Prompt
} = require('../models');

// Errors
const { ApiError } = require('../errors');

// Utils
const validateIdInModel = require('../utils/validateIdInModel.js')

// ---------------------------------------------------------------------------------------------------------------------
async function createChat(req, res, next) {
  try {
    const { memberId, teamId, llmId, title } = req.body;

    // Validate models ID's existance
    const member = await validateIdInModel(memberId, Member);
    const team = await validateIdInModel(teamId, Team);
    const llm = await validateIdInModel(llmId, LLM);

    // Check the member belongs to the team
    const teamMember = await TeamMember.findOne({ where: { teamId, memberId } });

    // If member not belongs to team, then throw an error
    if (!teamMember) {
      const errorMessage = `Member with email "${member.email}" doesn't belong to team "${team.name}"`;
      throw new ApiError(404, errorMessage);
    }

    // Check the team has access to the LLM
    const teamLLM = await TeamLLM.findOne({ where: { teamId, llmId } });

    // If team doesn't have access to LLM, then throw an error
    if (!teamLLM) {
      const errorMessage = `Team "${team.name}" doesn't have access to LLM "${llm.name}"`;
      throw new ApiError(404, errorMessage);
    }

    // Create the chat
    await Chat.create({ memberId, teamId, llmId, title });

    res.status(201).json({
      success: true,
      message: 'Chat created successfully'
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function deleteChat(req, res, next) {
  try {
    const chatId = req.params.id;

    // Validate chat ID existance
    const chat = await validateIdInModel(chatId, Chat);

    // If exists, then delete the chat
    await chat.destroy();

    res.status(200).json({
      success: true,
      message: 'Chat deleted successfully'
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function findChat(req, res, next) {
  try {
    const chatId = req.params.id;

    const chat = await validateIdInModel(chatId, Chat);

    const prompts = await chat.getPrompts({
      include: Response,
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: {
        chat: chat.toJSON(),
        prompts
      }
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function createPrompt(req, res, next) {
  try {
    const chatId = req.params.id;
    const message = req.body.message;

    // Check if chat with provided id exists
    await validateIdInModel(chatId, Chat);

    // Create the prompt
    const prompt = await Prompt.create({ chatId, message });

    // Create the response associated to the prompt
    const response = await Response.create({
      chatId,
      promptId: prompt.id,
      message: `Response to prompt: ${prompt.message}`
    });

    res.status(201).json({
      success: true,
      data: {
        prompt: {
          ...prompt.toJSON(),
          response: response.toJSON()
        }
      }
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

module.exports = {
  createChat,
  deleteChat,
  findChat,
  createPrompt
};
