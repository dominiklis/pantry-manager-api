const ApiError = require("./ApiError");

class Duplicate extends ApiError {
  constructor(resource, propertyName) {
    super(
      `duplicate, ${resource} with this ${propertyName} already exists`,
      400
    );
  }
}

module.exports = Duplicate;
