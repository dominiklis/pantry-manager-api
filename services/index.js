const { loginUser, registerUser, renewToken } = require("./users");
const {
  getProducts,
  editProduct,
  createProduct,
  removeProduct,
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

module.exports = {
  loginUser,
  registerUser,
  renewToken,

  getProducts,
  createProduct,
  editProduct,
  removeProduct,

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
};
