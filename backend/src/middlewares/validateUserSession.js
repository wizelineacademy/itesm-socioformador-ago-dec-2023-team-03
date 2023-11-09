// Models
const { Member } = require('../models');

// Errors
const {
  ServerError,
  ClientError
} = require('../errors');

// Utils
const verifyJwt = require('../utils/verifyJwt.js');

async function validateUserSession(req, res, next) {
  try {
    const loginToken = getLoginTokenFromSignedCookies(req.signedCookies);
    const decodedLoginToken = await decodeLoginToken(loginToken);
    const userInfo = decodedLoginToken;
    await checkUserExistanceByItsId(userInfo.id);
    req.me = userInfo;
    next();
  } catch(err) {
    next(err);
  }
}

function getLoginTokenFromSignedCookies(signedCookies) {
  if (!signedCookies) {
    throw new ServerError(500, 'Signed cookies not found');
  }

  const loginToken = signedCookies['login-token'];

  if (!loginToken) {
    throw new ClientError(401, 'Authentication is required');
  }

  return loginToken;
}

async function decodeLoginToken(loginToken) {
  const JWT_LOGIN_SECRET = 'JWT_LOGIN_SECRET';
  const loginTokenSecret = process.env[JWT_LOGIN_SECRET];

  if (!loginTokenSecret) {
    throw new ServerError(500, `Environment variable "${JWT_LOGIN_SECRET}" is not defined`);
  }

  try {
    const decodedToken = await verifyJwt(loginToken, loginTokenSecret);
    return decodedToken;
  } catch (err) {
    throw new ServerError(500, 'Error while verifying the login token', err);
  }
}

async function checkUserExistanceByItsId(userId) {
  const user = await Member.findByPk(userId);

  if (!user) {
    throw new ClientError(401, 'You are not currently registered on Wizeprompt');
  }

  return user;
}

module.exports = validateUserSession;
