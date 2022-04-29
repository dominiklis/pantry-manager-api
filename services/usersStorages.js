const { db } = require("../db");
const {
  SomethingWentWrong,
  BadRequest,
  Forbidden,
  Duplicate,
} = require("../errors");

const getUsersStorages = async (userId, storageId) => {
  try {
    const result = await db.task(async (t) => {
      const relations = await t.usersStorages.get(storageId);

      const userRelation = relations?.filter((r) => r.userId === userId);
      if (!userRelation?.length) throw new Forbidden();

      return relations;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const createUsersStorages = async (
  loggedUserId,
  storageId,
  userId,
  userName,
  email,
  canShare,
  canEdit,
  canDelete,
  canChangePermissions
) => {
  try {
    const result = await db.task(async (t) => {
      const loggedUserRelation = await t.usersStorages.findById(
        loggedUserId,
        storageId
      );
      if (!loggedUserRelation || !loggedUserRelation.canShare)
        throw new Forbidden();

      if (!userId) {
        const user = await t.users.findByUserNameOrEmail(userName, email);
        if (!user) throw new BadRequest();

        userId = user.userId;
      }

      const createdRelation = await t.usersStorages.create(
        userId,
        storageId,
        canShare,
        canEdit,
        canDelete,
        canChangePermissions
      );
      if (!createdRelation) throw new SomethingWentWrong();

      const user = await t.users.findById(createdRelation.userId);

      return { ...createdRelation, userName: user.userName };
    });

    return result;
  } catch (error) {
    if (error?.code === "23505")
      throw new Duplicate("user alread has an access to this storage");

    throw error;
  }
};

const editUsersStorages = async (
  loggedUserId,
  storageId,
  userId,
  canShare,
  canEdit,
  canDelete,
  canChangePermissions
) => {
  try {
    const result = await db.task(async (t) => {
      const loggedUserRelation = await t.usersStorages.findById(
        loggedUserId,
        storageId
      );

      if (!loggedUserRelation || !loggedUserRelation.canChangePermissions)
        throw new Forbidden();

      const relationToEdit = await t.usersStorages.findById(userId, storageId);
      if (!relationToEdit) throw new BadRequest();

      const storage = await t.storages.findById(storageId);
      if (storage.ownerId === userId) throw new Forbidden();

      const editedRelation = await t.usersStorages.edit(
        userId,
        storageId,
        canShare,
        canEdit,
        canDelete,
        canChangePermissions
      );
      if (!editedRelation) throw new SomethingWentWrong();

      return editedRelation;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteUsersStorages = async (loggedUserId, storageId, userId) => {
  try {
    const result = await db.task(async (t) => {
      const loggedUserRelation = await t.usersStorages.findById(
        loggedUserId,
        storageId
      );

      if (
        !loggedUserRelation ||
        (!loggedUserRelation.canChangePermissions &&
          !loggedUserRelation.canShare)
      )
        throw new Forbidden();

      const relationToRemove = await t.usersStorages.findById(
        userId,
        storageId
      );
      if (!relationToRemove) throw new BadRequest();

      const storage = await t.storages.findById(storageId);
      if (storage.ownerId === userId) throw new Forbidden();

      const removeRelation = await t.usersStorages.remove(userId, storageId);
      if (!removeRelation) throw new SomethingWentWrong();

      return removeRelation;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsersStorages,
  createUsersStorages,
  editUsersStorages,
  deleteUsersStorages,
};
