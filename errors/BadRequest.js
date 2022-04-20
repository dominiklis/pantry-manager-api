const ApiError = require("./ApiError");

class BadRequest extends ApiError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = BadRequest;
