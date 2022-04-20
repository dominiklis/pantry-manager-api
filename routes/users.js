const express = require("express");
const router = express.Router();

const { usersController } = require("../controllers");

const { validateRequestBody, authMiddleware } = require("../middleware");

const validateLoginBody = validateRequestBody("login user");
router.post("/login", validateLoginBody, usersController.login);

const validateRegisterBody = validateRequestBody("register user");
router.post("/register", validateRegisterBody, usersController.register);

router.get("/renew", authMiddleware, usersController.renew);

module.exports = router;
