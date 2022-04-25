const express = require("express");
const router = express.Router();

const {
  shoppingListsController,
  usersShoppingListsController,
} = require("../controllers");

const { validateRequestBody, validateRouteParam } = require("../middleware");

const validateShoppingListBody = validateRequestBody("shopping list");
const validateCreateUsersShoppingListsBody = validateRequestBody(
  "create users sharing"
);
const validateEditUsersShoppingListsBody =
  validateRequestBody("edit users sharing");

const validateShoppingListId = validateRouteParam("shoppingListId");
const validateUserId = validateRouteParam("userId");

// shopping lists
router.get("/", shoppingListsController.get);
router.post("/", validateShoppingListBody, shoppingListsController.create);
router.put(
  "/:shoppingListId",
  validateShoppingListId,
  validateShoppingListBody,
  shoppingListsController.edit
);
router.delete(
  "/:shoppingListId",
  validateShoppingListId,
  shoppingListsController.remove
);

// users shopping lists
router.get(
  "/:shoppingListId/users",
  validateShoppingListId,
  usersShoppingListsController.get
);
router.post(
  "/:shoppingListId/users",
  validateShoppingListId,
  validateCreateUsersShoppingListsBody,
  usersShoppingListsController.create
);
router.put(
  "/:shoppingListId/users/:userId",
  validateShoppingListId,
  validateUserId,
  validateEditUsersShoppingListsBody,
  usersShoppingListsController.edit
);
router.delete(
  "/:shoppingListId/users/:userId",
  validateShoppingListId,
  validateUserId,
  usersShoppingListsController.remove
);

module.exports = router;
