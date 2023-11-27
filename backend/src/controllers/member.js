// Models
const {
  Member,
  Role,
  Team,
  Chat,
  Tokens,
  LLM
} = require('../models');

// Errors
const { ApiError, ClientError } = require('../errors');

// Responses
const { SuccessResponse } = require('../responses');

const Joi = require('joi');

// Utils
const signJwt = require('../utils/signJwt.js');
const validateIdInModel = require('../utils/validateIdInModel.js');

// ---------------------------------------------------------------------------------------------------------------------
async function deleteMember(req, res, next) {
  try {
    const { id } = req.params;

    await Member.update({ active: false }, { where: { id } });

    res.status(200).json({
      success: true,
      message: 'Member deleted'
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------------
async function login(req, res, next) {
  try {
    const email = req.body.email;

    // Use Sequelize to find a member based on the provided email
    let member = await Member.findOne({
      where: { email },
      include: Role
    });

    // If no member is found, throw a 400 Bad Request error indicating that the email is not registered
    if (!member) {
      throw new ApiError(400, `Member email "${email}" is not registered`);
    }

    const memberValues = member.dataValues;
    const roleValues = member.dataValues.role.dataValues;

    const formattedMemberData = {
      id: memberValues.id,
      firstName: memberValues.firstName,
      lastName: memberValues.lastName,
      email: memberValues.email,
      roleId: memberValues.roleId,
      roleName: roleValues.name
    }
    
    // Create a payload for the JSON Web Token (JWT) that includes member details and their role name
    const jwtPayload = { ...formattedMemberData };

    // Generate a JWT
    const token = await signJwt(jwtPayload, process.env.JWT_LOGIN_SECRET, {
      expiresIn: Number(process.env.JWT_LOGIN_EXP_TIME_IN_SECONDS)
    });

    // Set the generated token as a signed cookie in the response
    res.cookie('login-token', token, {
      maxAge: Number(process.env.COOKIE_LOGIN_EXP_TIME_IN_MILLISECONDS),
      secure: false,  // Cookie can be sent over non-HTTPS connections (for development)
      httpOnly: true,  // Cookie is not accessible via JavaScript
      signed: true // If the cookie value is modified, it becomes invalid
    });

    res.status(200).json({
      success: true,
      message: 'Member logged in successfully',
      data: { member: formattedMemberData }
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function register(req, res, next) {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const roleId = req.body.roleId;

    // Check if a member with the provided email already exists
    let member = await Member.findOne({ where: { email }, include: Role });

    // If a member is found, throw a 400 Bad Request error indicating that the member already exists
    if (member) {
      throw new ApiError(400, `Member with email "${email}" already exists`);
    }

    // Create a new member in the database with the validated data
    member = await Member.create({
      firstName,
      lastName,
      email,
      roleId
    });

    res.status(201).json({
      success: true,
      message: 'Member created successfully',
      data: { member }
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function getAll(req, res, next) {
  try {
    // Retrieve all members from the database (setting 'raw' to 'true' to get plain data)
    const members = await Member.findAll({ raw: true });

    res.status(200).json({
      success: true,
      data: { members }
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function getMemberTeams(req, res, next) {
  try {
    const memberId = req.params.id;
  
    const foundMember = await Member.findByPk(memberId, {
      include: {
        model: Team,
        through: {
          attributes: []
        }
      }
    });
  
    if (!foundMember) {
      const errorMessage = `Member with id "${memberId}" doesn't exists`;
      throw new ApiError(404, errorMessage);
    }
  
    const teams = foundMember.teams.map((team) => team.dataValues);
  
    res.status(200).json({
      success: true,
      data: { teams }
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, active } = req.body;

    const member = await Member.update({
      firstName, lastName, email, active
    }, { where: { id } });

    res.status(200).json({
      success: true,
      data: { member }
    });
  } catch (err) {
    next(err);
  }
}

// ---------------------------------------------------------------------------------------------------------------------
async function getMemberChats(req, res, next) {
  try {
    const memberId = req.params.id;
    const teamId = req.query['team'];
    const llmId = req.query['llm'];

    const teamLLMMemberChats = await Chat.findAll({
      where: { memberId, teamId, llmId },
      order: [['createdAt', 'DESC']]
    });

    const formattedChats = teamLLMMemberChats.map((chat) => chat.toJSON());

    res.status(200).json({
      success: true,
      data: {
        chats: formattedChats
      }
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

module.exports = {
  login,
  register,
  getAll,
  getMemberTeams,
  getMemberChats,
  deleteMember,
  update
};
