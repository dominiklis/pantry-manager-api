const handleErrors = require("./handleErrors");
const validateRequestBody = require("./validateRequestBody");
const authMiddleware = require("./authMiddleware");

module.exports = {
  handleErrors,
  validateRequestBody,
  authMiddleware,
};
