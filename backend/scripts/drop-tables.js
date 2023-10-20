require("dotenv").config();

const { Client } = require("pg");

const envs = [
  "PGUSER",
  "PGHOST",
  "PGDATABASE",
  "PGPASSWORD",
  "PGPORT"
]

// Check necessary environment variables
for (const env of envs) {
  if(!process.env[env]) {
    throw new Error(`Environment variable "${env}" is not defined`);
  }
}

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

async function dropTables() {
  try {
    await client.connect();

    // Get a list of all table names
    const { rows } = await client.query(
      `SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'`
    );

    let droppedTables = [];

    // Iterate through the table names and drop each table
    for (const row of rows) {
      const tableName = row.table_name;
      await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);
      droppedTables.push(tableName);
    }

    return droppedTables;
  } catch (err) {
    console.error("Error dropping tables:", err); // Use Winston for logging
    throw err; // Rethrow the error for proper handling elsewhere
  } finally {
    await client.end();
  }
}

(async () => {
  try {
    const droppedTables = await dropTables();
    console.log(`${droppedTables.length} tables were dropped.`);

    if (droppedTables.length > 0) {
      console.log("Dropped tables:");
      for (table of droppedTables) {
        console.log(`- ${table}`);
      }
    }
  } catch (err) {
    console.error("An error occurred:", err);
  }
})();
