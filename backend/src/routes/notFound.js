const { ApiError } = require('../errors')

function notFound(req, res, next) {
  const errorMessage = `${req.method} ${req.originalUrl} not found`;
  const error = new ApiError(404, errorMessage);
  next(error);
}

module.exports = notFound;
