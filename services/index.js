const { loginUser, registerUser, renewToken } = require("./users");
const {
  getProducts,
  editProduct,
  createProduct,
  removeProduct,
  removeProductsInStorage,
} = require("./products");
const { getLabels, createLabel, editLabel, removeLabel } = require("./labels");
const {
  getStorages,
  createStorage,
  editStorage,
  deleteStorage,
} = require("./storages");
const {
  getUsersStorages,
  createUsersStorages,
  editUsersStorages,
  deleteUsersStorages,
} = require("./usersStorages");
const {
  getShoppingLists,
  createShoppingList,
  editShoppingList,
  removeShoppingList,
} = require("./shoppingLists");
const {
  getUsersShoppingLists,
  createUsersShoppingLists,
  editUsersShoppingLists,
  deleteUsersShoppingLists,
} = require("./usersShoppingLists");
const {
  getShoppingListItems,
  createShoppingListItem,
  editShoppingListItem,
  removeShoppingListItem,
} = require("./shoppingListsItems");

module.exports = {
  loginUser,
  registerUser,
  renewToken,

  getProducts,
  createProduct,
  editProduct,
  removeProduct,
  removeProductsInStorage,

  getLabels,
  createLabel,
  editLabel,
  removeLabel,

  getStorages,
  createStorage,
  editStorage,
  deleteStorage,

  getUsersStorages,
  createUsersStorages,
  editUsersStorages,
  deleteUsersStorages,

  getShoppingLists,
  createShoppingList,
  editShoppingList,
  removeShoppingList,

  getUsersShoppingLists,
  createUsersShoppingLists,
  editUsersShoppingLists,
  deleteUsersShoppingLists,

  getShoppingListItems,
  createShoppingListItem,
  editShoppingListItem,
  removeShoppingListItem,
};
