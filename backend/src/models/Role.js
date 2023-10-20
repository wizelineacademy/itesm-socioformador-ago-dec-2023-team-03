const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection.js')

class Role extends Model {}

Role.init({
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
  tableName: 'role',
  modelName: 'role',
  sequelize
});

module.exports = Role
