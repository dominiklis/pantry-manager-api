const Joi = require("joi");

const schemas = {
  "delete products": Joi.object({
    deleteProducts: Joi.string().valid("true", "false"),
  }),
  "delete items": Joi.object({
    deleteItems: Joi.string().valid("true", "false"),
  }),
};

const validateUrlParams = (schemaName) => (req, res, next) => {
  schemas[schemaName].validate(req.body);

  const { error } = schemas[schemaName].validate(req.query);
  if (error) {
    throw new ValidationError(error.details[0].message);
  } else {
    next();
  }
};

module.exports = validateUrlParams;
