const sequelize = require('../database/connection.js');

async function checkDbConnection() {
  try {
    console.log('Establishing connection with the database...');
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

module.exports = checkDbConnection;
