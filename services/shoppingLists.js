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
        true,
        true,
        true,
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
      const listToEdit = await db.shoppingLists.findById(shoppingListId);
      if (!listToEdit || listToEdit.ownerId !== userId) throw new BadRequest();

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
      const listToRemove = await db.shoppingLists.findById(shoppingListId);
      if (!listToRemove || listToRemove.ownerId !== userId)
        throw new BadRequest();

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
