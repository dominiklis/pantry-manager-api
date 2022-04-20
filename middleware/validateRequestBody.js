const Joi = require("joi");
const { validatePassword } = require("../utils");
const { ValidationError } = require("../errors");

const schemas = {
  "login user": Joi.object({
    userName: Joi.string().min(3).empty(""),
    email: Joi.when("userName", {
      is: "",
      then: Joi.string().email().required(),
      otherwise: Joi.string().email().empty(""),
    }),
    password: Joi.string().required().custom(validatePassword),
  }).or("userName", "email"),
  "register user": Joi.object({
    userName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(validatePassword),
  }),
};

const validateRequestBody = (schemaName) => (req, res, next) => {
  schemas[schemaName].validate(req.body);

  const { error } = schemas[schemaName].validate(req.body);
  if (error) {
    throw new ValidationError(error.details[0].message);
  } else {
    next();
  }
};

module.exports = validateRequestBody;
