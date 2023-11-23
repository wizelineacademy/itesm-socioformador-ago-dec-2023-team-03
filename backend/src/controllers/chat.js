// Models
const {
  Chat,
  Member,
  Team,
  TeamMember,
  TeamLLM,
  LLM,
  Response,
  Prompt,
  Tokens
} = require('../models');

// Errors
const { ApiError, ClientError } = require('../errors');

// Utils
const validateIdInModel = require('../utils/validateIdInModel.js');
const generateChatCompletion = require('../utils/generateChatCompletion.js');
const { SuccessResponse } = require('../responses');

// ---------------------------------------------------------------------------------------------------------------------
async function createChat(req, res, next) {
  try {
    const me = req.me;
    const { teamId, llmId, title } = req.body;

    // Validate models ID's existance
    const member = await validateIdInModel(me.id, Member);
    const team = await validateIdInModel(teamId, Team);
    const llm = await validateIdInModel(llmId, LLM);

    // Check the member belongs to the team
    const teamMember = await TeamMember.findOne({ where: { teamId, memberId: member.id } });

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
    const chat = await Chat.create({ memberId: member.id, teamId, llmId, title });

    res.status(201).json({
      success: true,
      message: 'Chat created successfully',
      data: { chat }
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function getAllChats(req, res, next) {
  try {
    const chats = await Chat.findAll();
    const response = new SuccessResponse(201, { chats })
    res.status(response.statusCode).json(response);
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
        chat: {
          ...chat.toJSON(),
          prompts
        }
      }
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function getChatPrompts(req, res, next) {
  try {
    const chatId = req.params.id;

    const chat = await validateIdInModel(chatId, Chat);

    const prompts = await chat.getPrompts({
      include: Response,
      order: [['createdAt', 'ASC']]
    });

    const response = new SuccessResponse(200, { prompts });
    return res.status(response.statusCode).json(response);
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function createPrompt(req, res, next) {
  try {
    const me = req.me;
    const chatId = req.params.id;
    const { message } = req.body;

    // Check if chat with provided id exists
    const chat = await validateIdInModel(chatId, Chat);

    // Check if user has enough tokens
    const memberTokens = await Tokens.findOne({
      where: {
        memberId: me.id,
        llmId: req.body.llmId,
        teamId: req.body.teamId
      }
    });

    if (memberTokens.quantity <= 0) {
      throw new ClientError(403, 'You dont have enough tokens to make a prompt');
    }

    // Get the chat LLM
    const llm = await LLM.findByPk(chat.llmId);

    const completion = await generateChatCompletion(message, { model: llm.model });

    const promptTokens = completion.usage.prompt_tokens;

    // Create the prompt
    const prompt = await Prompt.create({
      chatId: chat.id,
      message,
      usedTokens: promptTokens
    });

    const responseTokens = completion.usage.completion_tokens;
    const responseMessage = completion.choices[0].message.content;

    // Create the response associated to the prompt
    const response = await Response.create({
      chatId: chat.id,
      promptId: prompt.id,
      usedTokens: responseTokens,
      message: responseMessage
    });

    const shortMessage = shortenString(message, 20);

    await chat.update({ title: shortMessage });
    const totalTokens = completion.usage.total_tokens;

    // Remove the total tokens spent in the prompt for the user tokens
    await memberTokens.decrement('quantity', { by: totalTokens });

    const successResponse = new SuccessResponse(201, {
      prompt: {
        ...prompt.toJSON(),
        response: response.toJSON()
      },
      totalTokens
    });

    res.status(successResponse.statusCode).json(successResponse);
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

function shortenString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + '...';
  }
  return str;
}

module.exports = {
  createChat,
  deleteChat,
  findChat,
  getAllChats,
  createPrompt,
  getChatPrompts
};
