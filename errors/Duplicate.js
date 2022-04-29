const ApiError = require("./ApiError");

class Duplicate extends ApiError {
  constructor(resourceOrSingleMessage, propertyName) {
    super(
      propertyName
        ? `duplicate, ${resource} with this ${propertyName} already exists`
        : resourceOrSingleMessage,
      400
    );
  }
}

module.exports = Duplicate;
