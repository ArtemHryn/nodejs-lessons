class PostMainError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class ValidationError extends PostMainError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotFound extends PostMainError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends PostMainError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  PostMainError,
  ValidationError,
  NotAuthorizedError,
  NotFound,
};
