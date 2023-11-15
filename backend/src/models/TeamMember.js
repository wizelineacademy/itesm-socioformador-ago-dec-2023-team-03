const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection.js');

const Team = require('../models/Team.js');
const Member = require('../models/Member.js');

class TeamMember extends Model {}

// Model
TeamMember.init({
  teamId: {
    type: DataTypes.UUID,
    references: {
      model: Team,
      key: 'id'
    }
  },
  memberId: {
    type: DataTypes.UUID,
    references: {
      model: Member,
      key: 'id'
    }
  }
}, {
  tableName: 'team_member',
  modelName: 'team_member',
  sequelize
});

// Relations
Member.belongsToMany(Team, { through: TeamMember });
Team.belongsToMany(Member, { through: TeamMember });

// Sync
// (async () => {
//   try {
//     await TeamMember.sync({ alter: true, logging: false });
//     console.log('\'team_member\' model synchronized successfully');
//   } catch (err) {
//     console.error('Error synchronizing the \'team_member\' model:', err);
//   }
// })();

module.exports = TeamMember;
