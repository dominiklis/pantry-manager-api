const { loginUser, registerUser, renewToken } = require("./users");
const { createProduct } = require("./products");
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

  createProduct,

  getStorages,
  createStorage,
  editStorage,
  deleteStorage,

  getUsersStorages,
  createUsersStorages,
  editUsersStorages,
  deleteUsersStorages,
};
