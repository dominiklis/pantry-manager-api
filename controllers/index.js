const usersController = require("./users");
const settingsController = require("./settings");
const productsController = require("./products");
const collectionsOfProductsController = require("./collectionsOfProducts");
const labelsController = require("./labels");
const storagesController = require("./storages");
const usersStoragesController = require("./usersStorages");
const shoppingListsController = require("./shoppingLists");
const usersShoppingListsController = require("./usersShoppingLists");
const shoppingListsItemsController = require("./shoppingListsItems");

module.exports = {
  usersController,
  settingsController,
  productsController,
  collectionsOfProductsController,
  labelsController,
  storagesController,
  usersStoragesController,
  shoppingListsController,
  usersShoppingListsController,
  shoppingListsItemsController,
};
