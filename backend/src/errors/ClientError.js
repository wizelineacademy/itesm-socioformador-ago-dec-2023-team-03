const ApiError = require('./ApiError.js');

class ClientError extends ApiError {
  constructor(httpStatusCode, message, data = {}) {
    super(httpStatusCode, message);
    this.data = data;
  }
}

module.exports = ClientError;
