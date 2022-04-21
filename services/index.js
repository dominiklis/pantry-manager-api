const { loginUser, registerUser, renewToken } = require("./users");
const { createProduct } = require("./products");
const { createStorage } = require("./storages");

module.exports = {
  loginUser,
  registerUser,
  renewToken,
  createProduct,

  createStorage,
};
