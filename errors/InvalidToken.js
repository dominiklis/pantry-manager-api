const ApiError = require("./ApiError");

class InvalidToken extends ApiError {
  constructor() {
    super("invalid token", 401);
  }
}

module.exports = InvalidToken;
