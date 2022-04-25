const express = require("express");
const router = express.Router();

const { shoppingListsItemsController } = require("../controllers");

const { validateRequestBody, validateRouteParam } = require("../middleware");

const validateShoppingListItem = validateRequestBody("shopping list item");
const validateShoppingListItemId = validateRouteParam("shoppingListItemId");

router.get("/", shoppingListsItemsController.get);
router.post("/", validateShoppingListItem, shoppingListsItemsController.create);
router.put(
  "/:shoppingListItemId",
  validateShoppingListItemId,
  validateShoppingListItem,
  shoppingListsItemsController.edit
);
router.delete(
  "/:shoppingListItemId",
  validateShoppingListItemId,
  shoppingListsItemsController.remove
);

module.exports = router;
