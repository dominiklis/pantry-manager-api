const ApiError = require("./ApiError");

class Forbidden extends ApiError {
  constructor() {
    super("you can't do this", 403);
  }
}

module.exports = Forbidden;
