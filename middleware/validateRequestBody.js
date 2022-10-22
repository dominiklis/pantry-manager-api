const Joi = require("joi");
const { validatePassword } = require("../utils");
const { ValidationError } = require("../errors");

const datePattern = /^(\d{4})-(\d{2})-(\d{2})/;

const productObjectSchema = Joi.object({
  productId: Joi.string().uuid().allow(null),
  productName: Joi.string().min(1).required(),
  expirationDate: Joi.string().regex(datePattern).allow(null),
  amount: Joi.string().max(100).allow(null, ""),
  storageId: Joi.string().guid(),
  labels: Joi.array().items(Joi.string().guid()).allow(null),
});

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
  "update user": Joi.object({
    currentPassword: Joi.string().required().custom(validatePassword),
    newEmail: Joi.string().email().allow("", null),
    newUserName: Joi.string().min(3).allow("", null),
    newPassword: Joi.string().custom(validatePassword).allow("", null),
  }),

  settings: Joi.object({
    defaultNumberOfDaysForWarning: Joi.number()
      .integer()
      .min(1)
      .allow("", null),
    language: Joi.string().valid("en", "pl").allow("", null),
    theme: Joi.string().valid("light", "dark").allow("", null),
  }),

  product: productObjectSchema,

  "collection of products": Joi.object({
    products: Joi.array().items(productObjectSchema),
  }),

  label: Joi.object({
    labelName: Joi.string().min(1).required(),
  }),

  storage: Joi.object({
    storageName: Joi.string().min(1).required(),
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
        "deepOrange",
        "white"
      )
      .required(),
    numberOfDaysForWarning: Joi.number().integer().min(1).allow("", null),
  }),

  "shopping list": Joi.object({
    shoppingListName: Joi.string().min(1).required(),
  }),

  "create users sharing": Joi.object({
    userId: Joi.string().uuid().empty(""),
    userName: Joi.string().min(3).empty(""),
    email: Joi.string().email().empty(""),
    canShare: Joi.bool(),
  }),

  "edit users sharing": Joi.object({
    canShare: Joi.bool(),
  }),

  "shopping list item": Joi.object({
    shoppingListId: Joi.string().guid(),
    shoppingListItemName: Joi.string().min(1).required(),
    amount: Joi.string().max(255).allow(null, ""),
    selected: Joi.boolean().allow(null),
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
