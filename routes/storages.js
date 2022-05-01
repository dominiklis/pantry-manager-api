const express = require("express");
const router = express.Router();

const {
  storagesController,
  usersStoragesController,
} = require("../controllers");

const { validateRequestBody, validateRouteParam } = require("../middleware");

const validateStorageBody = validateRequestBody("storage");
const validateCreateUsersStoragesBody = validateRequestBody(
  "create users sharing"
);
const validateEditUsersStoragesBody = validateRequestBody("edit users sharing");

const validateStorageId = validateRouteParam("storageId");
const validateUserId = validateRouteParam("userId");

const validateParams = validateRouteParam("delete products");

// storages
router.get("/", storagesController.get);
router.post("/", validateStorageBody, storagesController.create);
router.put(
  "/:storageId",
  validateStorageId,
  validateStorageBody,
  storagesController.edit
);
router.delete(
  "/:storageId",
  validateStorageId,
  validateParams,
  storagesController.remove
);

// users storages
router.get("/:storageId/users", validateStorageId, usersStoragesController.get);
router.post(
  "/:storageId/users",
  validateStorageId,
  validateCreateUsersStoragesBody,
  usersStoragesController.create
);
router.put(
  "/:storageId/users/:userId",
  validateStorageId,
  validateUserId,
  validateEditUsersStoragesBody,
  usersStoragesController.edit
);
router.delete(
  "/:storageId/users/:userId",
  validateStorageId,
  validateUserId,
  usersStoragesController.remove
);

module.exports = router;
