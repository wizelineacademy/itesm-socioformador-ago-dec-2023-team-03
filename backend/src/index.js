const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../.env')
});

const express = require('express');
const cookieParser = require('cookie-parser');

// Importing middlewares
const globalErrorHandler = require('./middlewares/globalErrorHandler.js');

// Importing routes
const memberRoute = require('./routes/member.js');
const roleRoute = require('./routes/role.js');
const teamRoute = require('./routes/team.js');
const teamsMembersRoute = require('./routes/teamMember.js');

const app = express();
const port = process.env.PORT || 3000;

// Setting global middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SIGNED_SECRET));

// Setting routes
app.use('/members', memberRoute);
app.use('/roles', roleRoute);
app.use('/teams', teamRoute);
app.use('/teams-members', teamsMembersRoute);

// Setting global error handler
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
