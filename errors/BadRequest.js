const ApiError = require("./ApiError");

class BadRequest extends ApiError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = BadRequest;
