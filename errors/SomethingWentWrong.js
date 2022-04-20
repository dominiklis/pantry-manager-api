const ApiError = require("./ApiError");

class SomethingWentWrong extends ApiError {
  constructor() {
    super("something went wrong", 500);
  }
}

module.exports = SomethingWentWrong;
