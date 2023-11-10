const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection.js');

const Team = require('../models/Team.js');
const LLM = require('../models/LLM.js');

class TeamLLM extends Model {}

// Model
TeamLLM.init({
  teamId: {
    type: DataTypes.UUID,
    references: {
      model: Team,
      key: 'id'
    }
  },
  llmId: {
    type: DataTypes.UUID,
    references: {
      model: LLM,
      key: 'id'
    }
  }
}, {
  tableName: 'team_llm',
  modelName: 'team_llm',
  sequelize
});

// Relations
LLM.belongsToMany(Team, { through: TeamLLM });
Team.belongsToMany(LLM, { through: TeamLLM });

// Sync
(async () => {
  try {
    await TeamLLM.sync({ alter: true, logging: false });
    console.log('\'team_llm\' model synchronized successfully');
  } catch (err) {
    console.error('Error synchronizing the \'team_llm\' model:', err);
  }
})();

module.exports = TeamLLM;
