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

(async () => {
  try {
    await Role.sync({ logging: false });
    console.log('\'role\' model synchronized successfully');
  } catch (err) {
    console.error('Error synchronizing the \'role\' model:', err);
  }
})();

module.exports = Role
