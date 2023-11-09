class ApiError extends Error {
  constructor(httpStatusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.httpStatusCode = httpStatusCode;
    // Error.captureStackTrace(this, ApiError);
  }

  toJson() {
    const parentJsonData = super.toJson();
    return {
      ...parentJsonData,
      httpStatusCode: this.httpStatusCode
    }
  }
}

module.exports = ApiError;
