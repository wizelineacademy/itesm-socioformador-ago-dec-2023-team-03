const {
  Chat,
  LLM,
  Member,
  Prompt,
  Response,
  Role,
  Team,
  TeamLLM,
  TeamMember,
  Tokens
} = require('../models');

async function syncModels() {
  try {
    console.log('Synchronizing models...');

    await Role.sync({ alter: true });
    await Member.sync({ alter: true });
    await Team.sync({ alter: true });
    await LLM.sync({ alter: true });
    await TeamMember.sync({ alter: true });
    await TeamLLM.sync({ alter: true });
    await Chat.sync({ alter: true });
    await Prompt.sync({ alter: true });
    await Response.sync({ alter: true });
    await Tokens.sync({ alter: true });

    console.log('Models synchronized succesfully');
    return true;
  } catch (err) {
    console.error('An error ocurred while synchronizing models:', err);
    throw err;
  }
}

module.exports = syncModels;
