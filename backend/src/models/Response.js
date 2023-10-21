const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection.js');

const Chat = require('./Chat.js');

class Response extends Model {}

// Model
Response.init({
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
    allowNull: false
  },
  isLiked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'response',
  modelName: 'response',
  sequelize
});

// Relations
Chat.hasMany(Response, {
  foreignKey: {
    name: 'chatId',
    type: DataTypes.UUID,
    allowNull: false
  }
});
Response.belongsTo(Chat);

// Sync
(async () => {
  try {
    await Response.sync({ logging: false });
    console.log('\'response\' model synchronized successfully');
  } catch (err) {
    console.error('Error synchronizing the \'response\' model:', err);
  }
})();

module.exports = Response;
