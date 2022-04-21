const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware");

const usersRouter = require("./users");
const productsRouter = require("./products");
const storagesRouter = require("./storages");

router.use("/users", usersRouter);

router.use("/products", authMiddleware, productsRouter);

router.use("/storages", authMiddleware, storagesRouter);

module.exports = router;
