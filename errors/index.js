const ApiError = require("./ApiError");
const ValidationError = require("./ValidationError");
const BadRequest = require("./BadRequest");
const SomethingWentWrong = require("./SomethingWentWrong");
const InvalidToken = require("./InvalidToken");

module.exports = {
  ApiError,
  ValidationError,
  BadRequest,
  SomethingWentWrong,
  InvalidToken,
};
