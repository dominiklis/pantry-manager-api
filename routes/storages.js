const express = require("express");
const router = express.Router();

const { storagesController } = require("../controllers");

const { validateRequestBody } = require("../middleware");

const validateCreateStorage = validateRequestBody("create storage");
router.post("/", validateCreateStorage, storagesController.create);

module.exports = router;
