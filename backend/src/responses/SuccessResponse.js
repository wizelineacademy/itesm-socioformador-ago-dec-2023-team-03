class SuccessResponse {
  constructor(statusCode, message, data) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    if (typeof this.message !== 'string') {
      this.data = message;
      this.message = 'Success';
    } else {
      this.data = data;
    }
  }
}

module.exports = SuccessResponse;
