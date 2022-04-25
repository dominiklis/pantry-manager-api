const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware");

const usersRouter = require("./users");
const productsRouter = require("./products");
const storagesRouter = require("./storages");
const labelsRouter = require("./labels");
const shoppingListsRouter = require("./shoppingLists");

router.use("/users", usersRouter);

router.use("/products", authMiddleware, productsRouter);

router.use("/labels", authMiddleware, labelsRouter);

router.use("/storages", authMiddleware, storagesRouter);

router.use("/shopping-lists", authMiddleware, shoppingListsRouter);

module.exports = router;
