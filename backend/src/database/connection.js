const sequelize = require("sequelize");

const connection = new sequelize.Sequelize({
  username: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  dialect: "postgres"
});

module.exports = connection;
