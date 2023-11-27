// NPM modules
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Importing middlewares
const globalErrorHandler = require('./middlewares/globalErrorHandler.js');

// Importing routes
const memberRoutes = require('./routes/member.js');
const roleRoutes = require('./routes/role.js');
const teamRoutes = require('./routes/team.js');
const teamMemberRoutes = require('./routes/teamMember.js');
const llmRoutes = require('./routes/llm.js');
const chatRoutes = require('./routes/chat.js');
const teamLlmRoutes = require('./routes/teamLlm.js');
const myRoutes = require('./routes/me.js');
const tokensRoutes = require('./routes/tokens.js');
const notFoundRoute = require('./routes/notFound.js');

// Init the app
const app = express();

// Setting global middlewares
app.use(cors({ origin: ['http://localhost:3000', 'http://23.23.104.122'] , credentials: true }));
app.use(cookieParser(process.env.COOKIE_SIGNED_SECRET));
app.use(express.json());

// Setting routes
app.use('/members', memberRoutes);
app.use('/roles', roleRoutes);
app.use('/teams', teamRoutes);
app.use('/teams-members', teamMemberRoutes);
app.use('/llms', llmRoutes);
app.use('/chats', chatRoutes);
app.use('/teams-llms', teamLlmRoutes);
app.use('/tokens', tokensRoutes);
app.use('/me', myRoutes);

// Setting not found route
app.use(notFoundRoute);

// Setting global error handler
app.use(globalErrorHandler);

function run() {
  const port = process.env.PORT;
  
  app.listen(port, () => {
    const inDevMode = process.env.NODE_ENV === 'development';

    if (inDevMode) {
      console.log(`[+] Server running on http://localhost:${port}`);
    } else {
      console.log('Server start running');
    }
  });
}

exports = module.exports = app;
exports.run = run;
