// Errors
const { ApiError } = require('../errors');

// Utils
const verifyJwt = require('../utils/verifyJwt.js');

async function validateLoginToken(req, res, next) {
  try {
    const signedCookies = req.signedCookies;
    if (!signedCookies) {
      throw new ApiError(401, 'Authenticacion is required. No signed cookies were found');
    }

    const loginToken = signedCookies['login-token'];
    if (!loginToken) {
      throw new ApiError(401, 'Authenticacion is required. No login token were found');
    }

    const loginTokenSecret = process.env.JWT_LOGIN_SECRET;
    const decodedToken = await verifyJwt(loginToken, loginTokenSecret);

    req.me = decodedToken;
    next();
  } catch(err) {
    next(err);
  }
}

module.exports = validateLoginToken;
