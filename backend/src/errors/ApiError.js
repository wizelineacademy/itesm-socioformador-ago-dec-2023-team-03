class ApiError extends Error {
  constructor(httpStatusCode, message = 'Api Error') {
    super(message);
    this.name = this.constructor.name;
    this.httpStatusCode = httpStatusCode;
    Error.captureStackTrace(this, ApiError);
  }
}

module.exports = ApiError;
