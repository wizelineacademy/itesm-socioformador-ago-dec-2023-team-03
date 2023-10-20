const jwt = require('jsonwebtoken');

// Errors
const { ApiError } = require('../errors');

// Utils
const verifyJwt = require('../utils/verifyJwt.js');

async function validateLoginToken(req, res, next) {
  try {
    const signedCookies = req.signedCookies;

    if (!signedCookies['login-token']) {
      throw new ApiError(401, 'Unauthorized: Authentication is required');
    }

    const token = signedCookies['login-token'];
    const decodedToken = await verifyJwt(token, process.env.JWT_LOGIN_SECRET);

    req.memberData = decodedToken;
    next();
  } catch(err) {
    next(err);
  }
}

module.exports = validateLoginToken;
