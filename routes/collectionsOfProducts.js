const express = require("express");
const { collectionsOfProductsController } = require("../controllers");
const router = express.Router();

const { validateRequestBody } = require("../middleware");

const validateCollectionOfProducts = validateRequestBody(
  "collection of products"
);

router.post(
  "/",
  validateCollectionOfProducts,
  collectionsOfProductsController.create
);

module.exports = router;
