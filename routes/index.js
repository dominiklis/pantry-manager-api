const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware");

const usersRouter = require("./users");
const settingsRouter = require("./settings");
const productsRouter = require("./products");
const collectionsOfProductsRouter = require("./collectionsOfProducts");
const storagesRouter = require("./storages");
const labelsRouter = require("./labels");
const shoppingListsRouter = require("./shoppingLists");
const shoppingListsItemsRouter = require("./shoppingListsItems");

router.use("/users", usersRouter);

router.use("/settings", authMiddleware, settingsRouter);

router.use("/products", authMiddleware, productsRouter);

router.use(
  "/collections-of-products",
  authMiddleware,
  collectionsOfProductsRouter
);

router.use("/labels", authMiddleware, labelsRouter);

router.use("/storages", authMiddleware, storagesRouter);

router.use("/shopping-lists", authMiddleware, shoppingListsRouter);

router.use("/shopping-lists-items", authMiddleware, shoppingListsItemsRouter);

module.exports = router;
