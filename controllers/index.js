const usersController = require("./users");
const settingsController = require("./settings");
const productsController = require("./products");
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
  labelsController,
  storagesController,
  usersStoragesController,
  shoppingListsController,
  usersShoppingListsController,
  shoppingListsItemsController,
};
