class ErrorApiResponse extends Error {
  constructor(statuscode, message = "Something went wrong", errors = []) {
    super(message);

    this.statuscode = statuscode;
    this.errors = errors;

    Object.defineProperty(this, "message", {
      value: message,
      enumerable: true,
      writable: true,
    });

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorApiResponse;
