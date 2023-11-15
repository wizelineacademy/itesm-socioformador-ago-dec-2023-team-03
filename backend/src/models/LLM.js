const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection.js');

class LLM extends Model {}

// Model
LLM.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  model: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'llm',
  modelName: 'llm',
  sequelize
});

// Sync
// (async () => {
//   try {
//     await LLM.sync({ alter: true, logging: false });
//     console.log('\'llm\' model synchronized successfully');
//   } catch (err) {
//     console.error('Error synchronizing the \'llm\' model:', err);
//   }
// })();

module.exports = LLM;
