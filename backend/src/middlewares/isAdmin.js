// Errors
const { ApiError } = require('../errors');

async function isAdmin(req, res, next) {
  try {
    const memberData = req.memberData;

    console.log(memberData);

    if (!memberData) {
      throw new ApiError(401, 'Unauthorized: Authentication is required');
    }
    
    if (!memberData.roleName || memberData.roleName !== 'admin') {
      throw new ApiError(403, 'Access denied');
    }

    next();
  } catch(err) {
    next(err);
  }
}

module.exports = isAdmin;
