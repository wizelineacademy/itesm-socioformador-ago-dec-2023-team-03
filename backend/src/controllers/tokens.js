const Joi = require("joi");
const { Team, LLM, Member, Tokens } = require("../models");
const validateIdInModel = require("../utils/validateIdInModel");
const { ClientError } = require("../errors");
const { SuccessResponse } = require('../responses');
const { Op } = require("sequelize");

// ---------------------------------------------------------------------------------------------------------------------
async function create(req, res, next) {
  try {
    const { teamId, llmId, memberId, quantity } = req.body;

    // Check ID's existance
    const team = await validateIdInModel(teamId, Team);
    const llm = await validateIdInModel(llmId, LLM);
    const member = await validateIdInModel(memberId, Member);

    // Validate quantity
    const quantityValidation = Joi
      .number()
      .positive()
      .required()
      .label('quantity')
      .validate(quantity);
    
    if (quantityValidation.error) {
      throw new ClientError(400, quantityValidation.error.message);
    }

    // Find if user have tokens
    let tokens = await Tokens.findOne({
      where: { memberId: member.id, teamId: team.id, llmId: llm.id }
    });

    let statusCode;

    if (!tokens) {
      tokens = await Tokens.create({
        memberId: member.id,
        teamId: team.id,
        llmId: llm.id,
        quantity
      });
      statusCode = 201;
    } else {
      tokens.quantity = quantity;
      await tokens.save({ fields: ['quantity'] });
      statusCode = 200;
    }

    const succesMessage = `${quantity} tokens have been assigned to member ${member.email}` +
                          ` in team ${team.name} to be use with the LLM ${llm.name}(${llm.model})`

    const response = new SuccessResponse(statusCode, succesMessage, {
      tokens: tokens.toJSON()
    });

    res.status(response.statusCode).json(response);
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function getAll(req, res, next) {
  try {
    const filters = req.query;
    const validFilters = {
      minQty: 'min-qty',
      maxQty: 'max-qty',
      teamId: 'team-id',
      llmId: 'llm-id'
    }

    const whereClause = {};

    const minQty = filters[validFilters.minQty];
    const maxQty = filters[validFilters.maxQty];
    if (minQty && maxQty) {
      whereClause.quantity = {
        [Op.between]: [minQty, maxQty]
      }
    } else if (minQty) {
      whereClause.quantity = {
        [Op.gte]: minQty
      }
    } else if(maxQty) {
      whereClause.quantity = {
        [Op.lte]: maxQty
      }
    }

    const teamId = filters[validFilters.teamId];
    if (teamId) {
      whereClause.teamId = teamId;
    }

    const llmId = filters[validFilters.llmId];
    if (llmId) {
      whereClause.llmId = llmId;
    }

    const tokens = await Tokens.findAll({
      where: whereClause
    });

    const response = new SuccessResponse(200, { tokens })
    res.status(response.statusCode).json(response);
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

module.exports = {
  create,
  getAll
}
