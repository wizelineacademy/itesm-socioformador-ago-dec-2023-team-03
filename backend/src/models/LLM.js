const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection.js')

class LLM extends Model {}

LLM.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'llm',
  modelName: 'llm',
  sequelize
});

module.exports = LLM
