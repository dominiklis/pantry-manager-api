const express = require("express");
const router = express.Router();

const { usersController } = require("../controllers");

const { validateRequestBody, authMiddleware } = require("../middleware");

const validateLoginBody = validateRequestBody("login user");
router.post("/login", validateLoginBody, usersController.login);

const validateRegisterBody = validateRequestBody("register user");
router.post("/register", validateRegisterBody, usersController.register);

const validateUpdateBody = validateRequestBody("update user");
router.put("/", authMiddleware, validateUpdateBody, usersController.update);

router.get("/renew", authMiddleware, usersController.renew);

module.exports = router;
