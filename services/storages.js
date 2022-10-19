const { db } = require("../db");
const { SomethingWentWrong, BadRequest, Forbidden } = require("../errors");
const { constants, changeColorToSnakeCase } = require("../utils");

const getStorages = async (userId) => {
  try {
    const storages = await db.storages.get(userId);

    return storages;
  } catch (error) {
    throw error;
  }
};

const createStorage = async (
  userId,
  userName,
  storageName,
  color,
  numberOfDaysForWarning
) => {
  color = changeColorToSnakeCase(color);

  try {
    const result = await db.task(async (t) => {
      const createdStorage = await t.storages.create(
        userId,
        storageName,
        color,
        numberOfDaysForWarning
      );
      if (!createdStorage) throw new SomethingWentWrong();

      const usersStorages = await t.usersStorages.create(
        userId,
        createdStorage.storageId,
        true
      );

      return {
        ...createdStorage,
        ...usersStorages,
        users: [{ userName, ...usersStorages }],
      };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const editStorage = async (
  userId,
  storageId,
  storageName,
  color,
  numberOfDaysForWarning
) => {
  color = changeColorToSnakeCase(color);

  try {
    const result = await db.task(async (t) => {
      const storageToEdit = await t.storages.findById(storageId);
      if (!storageToEdit)
        throw new BadRequest(constants.errorsMessages.notFound);

      if (storageToEdit.ownerId !== userId) {
        const relation = await t.usersStorages.findById(userId, storageId);

        if (!relation) throw new Forbidden();
      }

      const editedStorage = await t.storages.edit(
        storageId,
        storageName,
        color,
        numberOfDaysForWarning
      );
      if (!editedStorage) throw new SomethingWentWrong();

      return editedStorage;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const removeStorage = async (
  userId,
  defaultStorageId,
  storageId,
  deleteProducts
) => {
  try {
    const result = await db.task(async (t) => {
      const storageToRemove = await t.storages.findById(storageId);
      if (!storageToRemove)
        throw new BadRequest(constants.errorsMessages.notFound);

      if (storageToRemove.ownerId !== userId) throw new Forbidden();

      if (deleteProducts === "true") {
        await db.products.removeProductsInStorage(storageId);
      } else {
        await db.products.swapStorage(storageId, defaultStorageId);
      }

      const removedStorage = await t.storages.remove(storageId);
      if (!removedStorage) throw new SomethingWentWrong();

      return removedStorage;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getStorages,
  createStorage,
  editStorage,
  removeStorage,
};
