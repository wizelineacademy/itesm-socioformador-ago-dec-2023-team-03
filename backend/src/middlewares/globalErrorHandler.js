const { ForeignKeyConstraintError } = require('sequelize');
const { TokenExpiredError } = require('jsonwebtoken');
const { ServerError, ExtendedError, ClientError } = require('../errors');

const inDevMode = process.env.NODE_ENV === 'development';

function globalErrorHandler(err, req, res, next) {
  const httpStatusCode = err.httpStatusCode || 500;

  if (err instanceof ForeignKeyConstraintError) {
    err.message = err.message + '. Fail trying to insert or update providing an invalid foreign key';
  }

  if (err instanceof ServerError || err instanceof ExtendedError) {
    if (inDevMode) console.error(err);
    return res.status(httpStatusCode).json({
      success: false,
      message: 'Internal server error',
      statusCode: httpStatusCode,
      error: inDevMode ? { ...err.toJson() } : null
    });
  }

  if (err instanceof ClientError) {
    return res.status(httpStatusCode).json({
      success: false,
      message: err.message,
      statusCode: httpStatusCode,
      error: { ...err.toJson() }
    });
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({
      success: false,
      error: {
        name: err.name,
        message: 'Your session has expired. Please log in again to continue',
        httpStatusCode: 401,
      }
    });
  }

  if (inDevMode) console.error(err);
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
