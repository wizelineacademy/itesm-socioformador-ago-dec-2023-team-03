const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection.js');

class Role extends Model {}

// Model
Role.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'role',
  modelName: 'role',
  sequelize
});

// Sync
// (async () => {
//   try {
//     console.log('Syncing');
//     await Role.sync({ alter: true, logging: false });
//     console.log('Syncing2');
//     console.log('\'role\' model synchronized successfully');
//   } catch (err) {
//     console.log('Syncing failed');
//     console.error('Error synchronizing the \'role\' model:', err);
//   }
// })();

module.exports = Role;
