const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../.env')
});

const express = require('express');
const cookieParser = require('cookie-parser');

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

const app = express();
const port = process.env.PORT || 3000;

// Setting global middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SIGNED_SECRET));

// Setting routes
app.use('/members', memberRoutes);
app.use('/roles', roleRoutes);
app.use('/teams', teamRoutes);
app.use('/teams-members', teamMemberRoutes);
app.use('/llms', llmRoutes);
app.use('/chats', chatRoutes);
app.use('/teams-llms', teamLlmRoutes);

// Setting global error handler
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
