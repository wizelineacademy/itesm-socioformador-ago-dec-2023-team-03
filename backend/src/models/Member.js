const { DataTypes, Model } = require('sequelize');
const Role = require('./Role.js')
const connection = require('../database/connection.js')

class Member extends Model {}

Member.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  }
}, {
  tableName: 'member',
  modelName: 'member',
  sequelize: connection
});

Role.hasMany(Member, {
  foreignKey: {
    name: 'roleId',
    type: DataTypes.UUID,
    allowNull: false
  }
});
Member.belongsTo(Role);

(async () => {
  try {
    await Member.sync({ logging: false });
    console.log('\'member\' model synchronized successfully');
  } catch (err) {
    console.error('Error synchronizing the \'member\' model:', err);
  }
})();

module.exports = Member
