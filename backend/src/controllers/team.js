const Joi = require('joi');

// Models
const Team = require('../models/Team.js');
const Member = require('../models/Member.js');
const TeamMember = require('../models/TeamMember.js');

// Validators
const TeamValidator = require('../validators/team.js');

// Errors
const { ApiError } = require('../errors/index.js');

// ---------------------------------------------------------------------------------------------------------------------
async function create(req, res, next) {
  try {
    const body = req.body;
    const name = body.name;

    const teamValidator = new TeamValidator();

    // Validate the name
    const nameValidation = teamValidator.validateName(name);

    // Check if there was a validation error for the name
    if (nameValidation.error) {
      throw new ApiError(400, nameValidation.error.message);
    }

    const validatedName = nameValidation.value;

    // Check if a team with the validated name already exists in the database
    let team = await Team.findOne({ where: { name: validatedName } });

    // If a team with the same name exists, throw an error with a 400 status code
    if (team) {
      throw new ApiError(400, `Team with name ${validatedName} already exists`);
    }

    // Create a new team with the validated name
    team = await Team.create({ name: validatedName });
    const teamValues = team.dataValues;

    return res.status(201).json({
      success: true,
      message: 'Team created successfully',
      data: { team: teamValues }
    });
  } catch(err) {
    return next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function getAll(req, res, next) {
  try {
    // Retrieve all teams from the database (setting 'raw' to 'true' to get plain data)
    const teams = await Team.findAll({ raw: true });

    return res.status(200).json({
      success: true,
      data: { teams }
    });
  } catch(err) {
    return next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function update(req, res, next) {
  try {
    // TODO: Check if a team with the provided id exists in the db
    const id = req.params.id;

    let team = await Team.findByPk(id);

    if (!team) {
      throw new ApiError(404, `Team with id ${id} not found`);
    }
    // TODO: Closed

    const body = req.body;
    const name = body.name;

    const teamValidator = new TeamValidator();

    // Validate the name
    const nameValidation = teamValidator.validateName(name);

    // Check if there was a validation error for the name
    if (nameValidation.error) {
      throw new ApiError(400, nameValidation.error.message);
    }

    const validatedName = nameValidation.value;

    // TODO:
    if (team.name === validatedName) {
      return res.status(200).json({
        success: true,
        message: 'Team updated successfully',
        data: { team: team.dataValues }
      });
    }
    // TODO:

    // Check if a team with the validated name already exists in the database
    const teamWithSameName = await Team.findOne({ where: { name: validatedName } });

    // If a team with the same name exists, throw an error with a 400 status code
    if (teamWithSameName) {
      throw new ApiError(400, `Team with name ${validatedName} already exists`);
    }

    team.name = validatedName;
    await team.save();

    return res.status(200).json({
      success: true,
      message: 'Team updated successfully',
      data: { team: team.dataValues }
    });
  } catch(err) {
    return next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function remove(req,res, next) {
  try {
    // Extract the 'id' parameter from the request.
    const id = req.params.id;
    
    // Use Sequelize's 'destroy' method to delete the team based on the 'id'.
    const destroyedTeams = await Team.destroy({ where: { id } });
    
    // Check if any team were deleted (destroyedTeams === 0 means no teams were found or deleted).
    if (destroyedTeams === 0) {
      throw new ApiError(404, 'Team not found');
    }
    
    return res.status(200).json({
      success: true,
      message: 'Team removed successfully'
    });
  } catch(err) {
    return next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function getMembers(req, res, next) {
  try {
    const teamId = req.params.id;
    
    let team = await Team.findByPk(teamId);
    if (!team) {
      throw new ApiError(404, `Team with id ${teamId} not found`);
    }

    team = await Team.findOne({
      where: { id: teamId },
      include: Member
    });

    const members = team.dataValues.members;
    const membersData = members.map((member) => member.dataValues);

    return res.status(200).json({
      success: true,
      data: {
        team: {
          id: team.dataValues.id,
          name: team.dataValues.name,
          createdAt: team.dataValues.createdAt,
          updatedAt: team.dataValues.updatedAt
        },
        members: membersData
      }
    });
  } catch(err) {
    return next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

module.exports = {
  create,
  getAll,
  update,
  remove,
  getMembers
};
