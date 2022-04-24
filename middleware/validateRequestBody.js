const Joi = require("joi");
const { validatePassword } = require("../utils");
const { ValidationError } = require("../errors");

const datePattern = /^(\d{4})-(\d{2})-(\d{2})/;

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

  product: Joi.object({
    productName: Joi.string().required(),
    expirationDate: Joi.string().regex(datePattern).allow(null),
    quantity: Joi.number().min(0).allow(null),
    unit: Joi.string().allow(null, ""),
    storageId: Joi.string().guid().allow(null),
    labels: Joi.array().items(Joi.string().guid()).allow(null),
  }),

  label: Joi.object({
    labelName: Joi.string().required(),
  }),

  storage: Joi.object({
    storageName: Joi.string().required(),
    color: Joi.string()
      .valid(
        "red",
        "pink",
        "purple",
        "deepPurple",
        "indigo",
        "blue",
        "lightBlue",
        "cyan",
        "teal",
        "green",
        "lightGreen",
        "lime",
        "yellow",
        "amber",
        "orange",
        "deepOrange"
      )
      .allow(null),
  }),

  "create users storages": Joi.object({
    userId: Joi.string().uuid().empty(""),
    userName: Joi.string().min(3).empty(""),
    email: Joi.string().email().empty(""),
    canShare: Joi.bool(),
    canEdit: Joi.bool(),
    canDelete: Joi.bool(),
    canChangePermissions: Joi.bool(),
  }),
  "edit users storages": Joi.object({
    canShare: Joi.bool(),
    canEdit: Joi.bool(),
    canDelete: Joi.bool(),
    canChangePermissions: Joi.bool(),
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
