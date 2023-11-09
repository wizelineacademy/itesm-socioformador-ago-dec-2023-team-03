// Error
const {
  ApiError,
  ClientError,
  ServerError,
  ExtendedError
} = require("../errors");

// Models
const {
  Member,
  Team,
  Chat,
  LLM,
  TeamMember,
  TeamLLM,
  Prompt,
  Response
} = require("../models");

const Joi = require('joi');

const validateIdInModel = require('../utils/validateIdInModel.js');

// Utils
const generateChatCompletion = require('../utils/generateChatCompletion.js');

// ---------------------------------------------------------------------------------------------------------------------
function getMe(req, res, next) {
  const me = req.me;
  res.status(200).json({
    success: true,
    data: { me }
  });
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function getMyTeams(req, res, next) {
  try {
    const me = req.me;
  
    const foundTeams = await Member.findByPk(me.id, {
      attributes: [],
      include: [
        {
          model: Team,
          attributes: ['id', 'name', 'createdAt'],
          through: {
            attributes: []
          }
        }
      ]
    });
  
    if (!foundTeams) {
      const errorMessage = `Member with id "${me.id}" doesn't exists`;
      throw new ApiError(404, errorMessage);
    }
  
    const teams = foundTeams.toJSON();
  
    res.status(200).json({
      success: true,
      data: { ...teams }
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function getMyChats(req, res, next) {
  try {
    const me = req.me;

    // Query params
    const llmId = req.query['llm-id'];
    const teamId = req.query['team-id'];

    // Construct where clause based on query params
    const whereClause = {};

    if (llmId) whereClause.llmId = llmId;
    if (teamId) whereClause.teamId = teamId;
  
    const member = await Member.findByPk(me.id, {
      include: {
        model: Chat,
        where: whereClause
      }
    });
    
    let chats;
    if (!member) {
      chats = [];
    } else {
      const memberChats = member.chats;
      chats = memberChats.map((chat) => chat.toJSON());
    }
  
    res.status(200).json({
      success: true,
      data: { chats }
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function createChat(req, res, next) {
  try {
    const me = req.me;
    const { teamId, llmId, title } = req.body;

    // Validate models existance
    const member = await validateIdInModel(me.id, Member);
    const team = await validateIdInModel(teamId, Team);
    const llm = await validateIdInModel(llmId, LLM);

    // Check the member belongs to the team
    const teamMember = await TeamMember.findOne({ where: { teamId: team.id, memberId: member.id } });
    // If member not belongs to team, then throw an error informing this action cannot be performed
    if (!teamMember) {
      const errorMessage = 'The chat could not be created.' +
                           'You cannot create a chat on a team you don\'t belong to'
      throw new ApiError(405, errorMessage);
    }

    // Check the team has access to the LLM
    const teamLLM = await TeamLLM.findOne({ where: { teamId: team.id, llmId: llm.id } });
    // If team doesn't have access to LLM, then throw an error informing this action cannot be performed
    if (!teamLLM) {
      const errorMessage = 'The chat could not be created.' +
                           'You cannot create a chat on a team that does not have access to the given LLM'
      throw new ApiError(405, errorMessage);
    }

    // Create the chat
    const chat = await Chat.create({
      memberId: member.id,
      teamId: team.id,
      llmId: llm.id,
      title: title || 'New chat'
    });

    res.status(201).json({
      success: true,
      message: 'Chat created successfully',
      data: { chat: chat.toJSON() }
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function createPrompt(req, res, next) {
  try {
    const me = req.me;
    const chatId = req.params.chatId;
    const { message } = req.body;

    const chat = await validateIdInModel(chatId, Chat);
    console.log(chat.toJSON());

    // Get the chat LLM
    const llm = await LLM.findByPk(chat.llmId);
    console.log(llm.toJSON());

    const completion = await generateChatCompletion(message, { model: llm.model });
    console.log('Completion:', completion);
    return

    // TODO: Check user tokens in the team for the specific LLM

    // Create prompt
    await Prompt.create({
      message,
      usedTokens,
      chatId,
    });

    // Create response
    await Response.create({
      message,
      usedTokens,
      isLiked,
      chatId,
      promptId
    });
    console.log(chat);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getMe,
  getMyTeams,
  getMyChats,
  createChat,
  createPrompt
};
