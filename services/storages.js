const { db } = require("../db");
const { SomethingWentWrong, BadRequest, Forbidden } = require("../errors");
const { constants } = require("../utils");

const getStorages = async (userId) => {
  try {
    const storages = await db.storages.get(userId);

    return storages;
  } catch (error) {
    throw error;
  }
};

const createStorage = async (userId, userName, storageName, color) => {
  try {
    const result = await db.task(async (t) => {
      const createdStorage = await t.storages.create(
        userId,
        storageName,
        color
      );
      if (!createdStorage) throw new SomethingWentWrong();

      const usersStorages = await t.usersStorages.create(
        userId,
        createdStorage.storageId,
        true,
        true,
        true,
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

const editStorage = async (userId, storageId, storageName, color) => {
  try {
    const result = await db.task(async (t) => {
      const storageToEdit = await t.storages.findById(storageId);
      if (!storageToEdit)
        throw new BadRequest(constants.errorsMessages.notFound);

      if (storageToEdit.ownerId !== userId) {
        const relation = await t.usersStorages.findById(userId, storageId);

        if (!relation || !relation.canEdit) throw new Forbidden();
      }

      const editedStorage = await t.storages.edit(
        storageId,
        storageName,
        color
      );
      if (!editedStorage) throw new SomethingWentWrong();

      return editedStorage;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteStorage = async (userId, storageId) => {
  try {
    const result = await db.task(async (t) => {
      const storageToRemove = await t.storages.findById(storageId);
      if (!storageToRemove)
        throw new BadRequest(constants.errorsMessages.notFound);

      if (storageToRemove.ownerId !== userId) {
        const relation = await t.usersStorages.findById(userId, storageId);

        if (!relation || !relation.canDelete) throw new Forbidden();
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
  deleteStorage,
};
