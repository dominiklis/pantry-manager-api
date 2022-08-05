const express = require("express");
const router = express.Router();

const { settingsController } = require("../controllers");

const { validateRequestBody, validateRouteParam } = require("../middleware");

const validateBody = validateRequestBody("settings");
const validateRoute = validateRouteParam("settingsId");

router.get("/:settingsId", validateRoute, settingsController.getById);
router.put(
  "/:settingsId",
  validateRoute,
  validateBody,
  settingsController.edit
);

module.exports = router;
