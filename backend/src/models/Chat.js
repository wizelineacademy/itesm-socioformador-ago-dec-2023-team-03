const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection.js');

const Team = require('./Team.js');
const Member = require('./Member.js');
const LLM = require('./LLM.js');

class Chat extends Model {}

// Model
Chat.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Nuevo chat'
  }
}, {
  tableName: 'chat',
  modelName: 'chat',
  sequelize
});

// Relations
Member.hasMany(Chat, {
  foreignKey: {
    name: 'memberId',
    type: DataTypes.UUID,
    allowNull: false
  }
});
Chat.belongsTo(Member);

Team.hasMany(Chat, {
  foreignKey: {
    name: 'teamId',
    type: DataTypes.UUID,
    allowNull: false
  }
});
Chat.belongsTo(Team);

LLM.hasMany(Chat, {
  foreignKey: {
    name: 'llmId',
    type: DataTypes.UUID,
    allowNull: false
  }
});
Chat.belongsTo(LLM);

// Sync
(async () => {
  try {
    await Chat.sync({ alter: true, logging: false });
    console.log('\'chat\' model synchronized successfully');
  } catch (err) {
    console.error('Error synchronizing the \'chat\' model:', err);
  }
})();

module.exports = Chat;
