const validator = require("validator");
const constants = require("./constants");

const validatePassword = (value, helper) => {
  const errors = [];
  if (!validator.isStrongPassword(value, { minLength: 6 })) {
    if (value.length < 6) errors.push(constants.passwordErrors.length);

    if (!/\d/.test(value)) errors.push(constants.passwordErrors.number);

    if (!/[a-z]/.test(value)) errors.push(constants.passwordErrors.lowercase);

    if (!/[A-Z]/.test(value)) errors.push(constants.passwordErrors.uppercase);

    if (!/[^a-zA-Z0-9]/.test(value))
      errors.push(constants.passwordErrors.specialCharacter);
  }

  if (errors.length)
    return helper.message("password has to: " + errors.join(", "));

  return true;
};

module.exports = validatePassword;
