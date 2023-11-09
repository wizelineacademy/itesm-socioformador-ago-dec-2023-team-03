class ExtendedError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = this.constructor.name;
    this.cause = cause;
  }

  toJson() {
    const parentJsonData = super.toJson();

    let cause = this.cause;
    if (cause instanceof Error) {
      cause = cause.toJson();
    }

    return { ...parentJsonData, cause }
  }
}

module.exports = ExtendedError;
