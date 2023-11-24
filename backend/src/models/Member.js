const { DataTypes, Model } = require('sequelize');
const connection = require('../database/connection.js');

const Role = require('./Role.js');

class Member extends Model {}

// Model
Member.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  picture: {
    type: DataTypes.STRING(255)
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'member',
  modelName: 'member',
  sequelize: connection
});

// Relations
Role.hasMany(Member, {
  foreignKey: {
    name: 'roleId',
    type: DataTypes.UUID
  }
});
Member.belongsTo(Role);

// Sync
// (async () => {
//   try {
//     await Member.sync({ alter: true, logging: false });
//     console.log('\'member\' model synchronized successfully');
//   } catch (err) {
//     console.error('Error synchronizing the \'member\' model:', err);
//   }
// })();

module.exports = Member;
