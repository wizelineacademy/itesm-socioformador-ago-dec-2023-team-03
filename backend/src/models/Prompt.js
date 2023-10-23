const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection.js');

const Chat = require('./Chat.js');

class Prompt extends Model {}

// Model
Prompt.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  usedTokens: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'prompt',
  modelName: 'prompt',
  sequelize
});

// Relations
Chat.hasMany(Prompt, {
  foreignKey: {
    name: 'chatId',
    type: DataTypes.UUID,
    allowNull: false
  }
});
Prompt.belongsTo(Chat);

// Sync
(async () => {
  try {
    await Prompt.sync({ logging: false });
    console.log('\'prompt\' model synchronized successfully');
  } catch (err) {
    console.error('Error synchronizing the \'prompt\' model:', err);
  }
})();

module.exports = Prompt;
