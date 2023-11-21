const path = require('path');

// Initializing environment variables
require('dotenv').config({
  path: path.join(__dirname, '../.env')
});

const sequelize = require('../src/database/connection.js');
const {
  Role,
  Member,
  Team,
  LLM,
  TeamMember,
  TeamLLM,
  Tokens
} = require('../src/models');

const envs = [
  'PGUSER',
  'PGHOST',
  'PGDATABASE',
  'PGPASSWORD',
  'PGPORT'
];

// Check necessary environment variables
for (const env of envs) {
  if(!process.env[env]) {
    throw new Error(`Environment variable ${env} is not defined`);
  }
}

const roles = require('./data/roles.json');
const members = require('./data/members.json');
const teams = require('./data/teams.json');
const llms = require('./data/llms.json');
const teamsMembers = require('./data/teamsMembers.json');
const teamsLlms = require('./data/teamsLlms.json');
const tokens = require('./data/tokens.json');

(async function () {
  try {
    await sequelize.sync({ force: true });
  } catch (err) {
    console.error(err);
    sequelize.close();
    return;
  }

  try {
    await Role.bulkCreate(roles, { validate: true });
    await Member.bulkCreate(members, { validate: true });
    await Team.bulkCreate(teams, { validate: true });
    await LLM.bulkCreate(llms, { validate: true });
    await TeamMember.bulkCreate(teamsMembers, { validate: true });
    await TeamLLM.bulkCreate(teamsLlms, { validate: true });
    await Tokens.bulkCreate(tokens, { validate: true });
    console.error('Database test information was uploaded successfully');
  } catch (err) {
    await sequelize.sync({ force: true });
    console.error('An error ocurred while uploading test data into the database:', err);
  }

  sequelize.close();
})();
