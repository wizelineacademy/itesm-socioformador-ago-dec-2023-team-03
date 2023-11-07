// Errors
const { ApiError } = require('../errors');

async function isAdmin(req, res, next) {
  try {
    const me = req.me;

    console.log(me);

    if (!me) {
      throw new ApiError(401, 'Unauthorized: Authentication is required');
    }
    
    if (!me.roleName || me.roleName !== 'admin') {
      throw new ApiError(403, 'Access denied');
    }

    next();
  } catch(err) {
    next(err);
  }
}

module.exports = isAdmin;
