const { ForeignKeyConstraintError } = require('sequelize');
const { TokenExpiredError } = require('jsonwebtoken');

function globalErrorHandler(err, req, res, next) {
  console.error('Global error handler:', err);
  const httpStatusCode = err.httpStatusCode || 500;

  if (err instanceof ForeignKeyConstraintError) {
    err.message = err.message + '. Fail trying to insert or update providing an invalid foreign key';
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({
      success: false,
      message: 'Your session has expired. Please log in again to continue.'
    });
  }

  return res.status(httpStatusCode).json({
    success: false,
    error: {
      name: err.name,
      message: err.message,
      httpStatusCode: httpStatusCode,
      stack: err.stack
    }
  });
}

module.exports = globalErrorHandler;
