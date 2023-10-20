const sequelize = require('sequelize');

async function connectDb() {
  console.log(2)
  // Establish connection
  const connection = new sequelize.Sequelize({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    dialect: 'postgres'
  })

  // Test connection
  try {
    await connection.authenticate()
    console.log('Connection to the database has been establish succesfully')
    return connection
  } catch(err) {
    console.log('Unable to connect to the database:', err)
  }
}

console.log(1)
connectDb()
console.log(3)

module.exports = connectDb
