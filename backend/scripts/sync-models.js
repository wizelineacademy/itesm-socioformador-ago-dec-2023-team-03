require("dotenv").config();

const sequelize = require("../src/database/connection.js");

require("../src/models/Member.js");
require("../src/models/Role.js");

(async () => {
  const isSynchronizationSuccessful = await synchronizeModels();
  try {
    await sequelize.close();
    if (isSynchronizationSuccessful) {
      console.log("Synchronization was successful.");
      console.log("Synchronized models:");
      for (const model in sequelize.models) {
        console.log(`- ${model}`);
      }
    } else {
      console.log("Synchronization was not successful.");
    }
  } catch (err) {
    console.error("Error closing database connection:", err);
  }
})();

async function synchronizeModels() {
  try {
    await sequelize.sync({ force: true, logging: false });
    return true;
  } catch (err) {
    console.error("Error synchronizing models:", err);
    return false;
  }
}
