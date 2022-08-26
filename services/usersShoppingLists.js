const { db } = require("../db");
const {
  SomethingWentWrong,
  BadRequest,
  Forbidden,
  Duplicate,
} = require("../errors");
const constants = require("../utils/constants");

const getUsersShoppingLists = async (userId, shoppingListId) => {
  try {
    const result = await db.task(async (t) => {
      const relations = await t.usersShoppingLists.get(shoppingListId);
      const userRelation = relations?.filter((r) => r.userId === userId);
      if (!userRelation?.length) throw new Forbidden();

      return relations;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const createUsersShoppingLists = async (
  loggedUserId,
  shoppingListId,
  userId,
  userName,
  email,
  canShare
) => {
  try {
    const result = await db.task(async (t) => {
      const loggedUserRelation = await t.usersShoppingLists.findById(
        loggedUserId,
        shoppingListId
      );
      if (!loggedUserRelation || !loggedUserRelation.canShare)
        throw new Forbidden();

      if (!userId) {
        const user = await t.users.findByUserNameOrEmail(userName, email);
        if (!user)
          throw new BadRequest(constants.errorsMessages.thisUserDoesNotExist);

        userId = user.userId;
      }

      const listToShare = await t.shoppingLists.findById(shoppingListId);
      if (!listToShare) throw new BadRequest();
      if (listToShare.ownerId !== loggedUserId) canShare = false;

      const createdRelation = await t.usersShoppingLists.create(
        userId,
        shoppingListId,
        canShare
      );
      if (!createdRelation) throw new SomethingWentWrong();

      const user = await t.users.findById(createdRelation.userId);

      return { ...createdRelation, userName: user.userName };
    });

    return result;
  } catch (error) {
    if (error?.code === "23505")
      throw new Duplicate("user alread has an access to this list");

    throw error;
  }
};

const editUsersShoppingLists = async (
  loggedUserId,
  shoppingListId,
  userId,
  canShare
) => {
  try {
    const result = await db.task(async (t) => {
      const relationToEdit = await t.usersShoppingLists.findById(
        userId,
        shoppingListId
      );
      if (!relationToEdit) throw new BadRequest();

      const list = await t.shoppingLists.findById(shoppingListId);
      if (list.ownerId === userId || list.ownerId !== loggedUserId)
        throw new Forbidden();

      const editedRelation = await t.usersShoppingLists.edit(
        userId,
        shoppingListId,
        canShare
      );

      if (!editedRelation) throw new SomethingWentWrong();
      return editedRelation;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteUsersShoppingLists = async (
  loggedUserId,
  shoppingListId,
  userId
) => {
  try {
    const result = await db.task(async (t) => {
      const loggedUserRelation = await t.usersShoppingLists.findById(
        loggedUserId,
        shoppingListId
      );
      if (
        !loggedUserRelation ||
        (loggedUserId !== userId &&
          !loggedUserRelation.canChangePermissions &&
          !loggedUserRelation.canShare)
      )
        throw new Forbidden();

      const relationToRemove = await t.usersShoppingLists.findById(
        userId,
        shoppingListId
      );
      if (!relationToRemove) throw new BadRequest();

      const list = await t.shoppingLists.findById(shoppingListId);
      if (list.ownerId === userId) throw new Forbidden();

      const removeRelation = await t.usersShoppingLists.remove(
        userId,
        shoppingListId
      );
      if (!removeRelation) throw new SomethingWentWrong();
      return removeRelation;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsersShoppingLists,
  createUsersShoppingLists,
  editUsersShoppingLists,
  deleteUsersShoppingLists,
};
