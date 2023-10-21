const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection.js');

const Team = require('./Team.js');
const Member = require('./Member.js');
const LLM = require('./LLM.js');

class Tokens extends Model {}

// Model
Tokens.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  tableName: 'tokens',
  modelName: 'tokens',
  sequelize
});

// Relations
Member.hasMany(Tokens, {
  foreignKey: {
    name: 'memberId',
    type: DataTypes.UUID,
    allowNull: false
  }
});
Tokens.belongsTo(Member);

Team.hasMany(Tokens, {
  foreignKey: {
    name: 'teamId',
    type: DataTypes.UUID,
    allowNull: false
  }
});
Tokens.belongsTo(Team);

LLM.hasMany(Tokens, {
  foreignKey: {
    name: 'llmId',
    type: DataTypes.UUID,
    allowNull: false
  }
});
Tokens.belongsTo(LLM);

// Sync
(async () => {
  try {
    await Tokens.sync({ logging: false });
    console.log('\'tokens\' model synchronized successfully');
  } catch (err) {
    console.error('Error synchronizing the \'tokens\' model:', err);
  }
})();

module.exports = Tokens;
