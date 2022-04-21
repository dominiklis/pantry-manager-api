const validator = require("validator");
const { InvalidId } = require("../errors");

const validateRouteParam = (paramName) => (req, res, next) => {
  if (!validator.isUUID(req.params[paramName])) {
    throw new InvalidId();
  }

  next();
};

module.exports = validateRouteParam;
