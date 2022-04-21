const express = require("express");
const router = express.Router();

const { productsController } = require("../controllers");

const { validateRequestBody } = require("../middleware");

const validateCreateProduct = validateRequestBody("create product");
router.post("/", validateCreateProduct, productsController.create);

module.exports = router;
