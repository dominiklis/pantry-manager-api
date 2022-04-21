const ApiError = require("./ApiError");

class InvalidId extends ApiError {
  constructor() {
    super("id has to be valid uuid value", 400);
  }
}

module.exports = InvalidId;
