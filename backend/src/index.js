// Core modules
const path = require('path');

// Initializing environment variables
require('dotenv').config({
  path: path.join(__dirname, '../.env')
});

// Utils
const checkDbConnection = require('./utils/checkDbConnection.js');
const checkEnvs = require('./utils/checkEnvs.js');
const syncModels = require('./utils/syncModels.js');

checkEnvs([
  'PGUSER',
  'PGHOST',
  'PGDATABASE',
  'PGPASSWORD',
  'PGPORT',
  'PORT',
  'COOKIE_SIGNED_SECRET',
  'COOKIE_LOGIN_EXP_TIME_IN_MILLISECONDS',
  'JWT_LOGIN_SECRET',
  'JWT_LOGIN_EXP_TIME_IN_SECONDS',
  'OPENAI_API_KEY',
  'NODE_ENV'
]);

// Server
const server = require('./server.js');

(async function() {
  await checkDbConnection();
  await syncModels();
  server.run();
})();

Error.prototype.toJson = function() {
  return {
    name: this.name,
    message: this.message,
    stack: this.stack,
  }
};
