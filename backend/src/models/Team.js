const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection.js');

class Team extends Model {}

// Model
Team.init({
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
  tableName: 'team',
  modelName: 'team',
  sequelize
});

// Sync
(async () => {
  try {
    await Team.sync({ alter: true, logging: false });
    console.log('\'team\' model synchronized successfully.');
  } catch (err) {
    console.error('Error synchronizing the \'team\' model:', err);
  }
})();

module.exports = Team;
