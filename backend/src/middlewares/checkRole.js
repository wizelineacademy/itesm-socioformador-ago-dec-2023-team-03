const { ClientError } = require("../errors");

function checkRole(listOfValidRoles) {
  return function(req, res, next) {
    try {
      const me = req.me;

      if (!me) {
        throw new ClientError(401, 'Authentication is required');
      }

      if (!listOfValidRoles.includes(me.roleName)) {
        console.log(me.roleName);
        throw new ClientError(403, 'Access denied');
      }

      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = checkRole;
