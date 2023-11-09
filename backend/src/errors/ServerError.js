const ApiError = require('./ApiError.js');

class ServerError extends ApiError {
  constructor(httpStatusCode, message) {
    super(httpStatusCode, message);
    this.name = this.constructor.name;
  }
}

module.exports = ServerError;
