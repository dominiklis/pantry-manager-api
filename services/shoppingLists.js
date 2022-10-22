const { db } = require("../db");
const { SomethingWentWrong, BadRequest } = require("../errors");

const getShoppingLists = async (userId) => {
  try {
    const lists = await db.shoppingLists.get(userId);

    return lists;
  } catch (error) {
    throw error;
  }
};

const createShoppingList = async (userId, shoppingListName, userName) => {
  try {
    const result = await db.task(async (t) => {
      const createdList = await t.shoppingLists.create(
        userId,
        shoppingListName
      );
      if (!createdList) throw new SomethingWentWrong();

      const usersList = await t.usersShoppingLists.create(
        userId,
        createdList.shoppingListId,
        true
      );

      return {
        ...createdList,
        ...usersList,
        users: [{ userName, ...usersList }],
      };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const editShoppingList = async (userId, shoppingListId, shoppingListName) => {
  try {
    const result = await db.task(async (t) => {
      const listToEdit = await t.shoppingLists.findById(shoppingListId);
      if (!listToEdit) throw new BadRequest(constants.errorsMessages.notFound);

      if (listToEdit.ownerId !== userId) {
        const relation = await t.usersShoppingLists.findById(
          userId,
          shoppingListId
        );

        if (!relation) throw new Forbidden();
      }

      const editedList = await t.shoppingLists.edit(
        shoppingListId,
        shoppingListName
      );
      if (!editedList) throw new SomethingWentWrong();

      return editedList;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const removeShoppingList = async (userId, shoppingListId, deleteItems) => {
  try {
    const result = await db.task(async (t) => {
      const listToRemove = await t.shoppingLists.findById(shoppingListId);
      if (!listToRemove)
        throw new BadRequest(constants.errorsMessages.notFound);

      if (listToRemove.ownerId !== userId) throw new Forbidden();

      if (deleteItems === "true")
        await db.shoppingListItems.removeItemsOnList(shoppingListId);

      const removedList = await t.shoppingLists.remove(shoppingListId);
      if (!removedList) throw new SomethingWentWrong();

      return removedList;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getShoppingLists,
  createShoppingList,
  editShoppingList,
  removeShoppingList,
};
