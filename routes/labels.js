const express = require("express");
const router = express.Router();

const { labelsController } = require("../controllers");

const { validateRequestBody, validateRouteParam } = require("../middleware");

const validateLabel = validateRequestBody("label");
const validateLabelId = validateRouteParam("labelId");

router.get("/", labelsController.get);
router.post("/", validateLabel, labelsController.create);
router.put("/:labelId", validateLabelId, validateLabel, labelsController.edit);
router.delete("/:labelId", validateLabelId, labelsController.remove);

module.exports = router;
