const express = require("express");
const router = express.Router();

const { productsController } = require("../controllers");

const { validateRequestBody, validateRouteParam } = require("../middleware");

const validateProduct = validateRequestBody("product");
const validateProductId = validateRouteParam("productId");
const validateStorageId = validateRouteParam("storageId");

router.get("/", productsController.get);
router.post("/", validateProduct, productsController.create);
router.put(
  "/:productId",
  validateProductId,
  validateProduct,
  productsController.edit
);
router.delete("/:productId", validateProductId, productsController.remove);
router.delete(
  "/remove-in-storage/:storageId",
  validateStorageId,
  productsController.removeInStorage
);

module.exports = router;
