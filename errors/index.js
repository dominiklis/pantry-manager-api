const ApiError = require("./ApiError");
const ValidationError = require("./ValidationError");
const BadRequest = require("./BadRequest");
const SomethingWentWrong = require("./SomethingWentWrong");
const InvalidToken = require("./InvalidToken");
const InvalidId = require("./InvalidId");
const Forbidden = require("./Forbidden");

module.exports = {
  ApiError,
  ValidationError,
  BadRequest,
  SomethingWentWrong,
  InvalidToken,
  InvalidId,
  Forbidden,
};
