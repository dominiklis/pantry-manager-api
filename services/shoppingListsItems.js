const { db } = require("../db");
const { SomethingWentWrong, BadRequest } = require("../errors");

const getShoppingListItems = async (userId) => {
  try {
    const results = await db.shoppingListItems.get(userId);

    return results;
  } catch (error) {
    throw error;
  }
};

const createShoppingListItem = async (
  userId,
  shoppingListItemName,
  quantity,
  selected,
  shoppingListId
) => {
  try {
    const result = await db.task(async (t) => {
      if (shoppingListId) {
        const userRelation = await t.usersShoppingLists.findById(
          userId,
          shoppingListId
        );
        if (!userRelation) throw new BadRequest();
      }

      const createdShoppingListItem = await t.shoppingListItems.create(
        userId,
        shoppingListItemName,
        quantity,
        selected,
        shoppingListId
      );
      if (!createdShoppingListItem) throw new SomethingWentWrong();

      return createdShoppingListItem;
    });

    return result;
  } catch (error) {
    if (error?.code === "23503") throw new BadRequest();

    throw error;
  }
};

const editShoppingListItem = async (
  userId,
  shoppingListItemId,
  shoppingListItemName,
  quantity,
  selected,
  shoppingListId
) => {
  try {
    const result = await db.task(async (t) => {
      const itemToEdit = await t.shoppingListItems.findById(
        userId,
        shoppingListItemId
      );
      if (!itemToEdit) throw new BadRequest();

      if (itemToEdit.ownerId !== userId) {
        if (itemToEdit.shoppingListId) {
          const userRelation = await t.usersShoppingLists.findById(
            userId,
            itemToEdit.shoppingListId
          );
          if (!userRelation) throw new BadRequest();
        } else throw new BadRequest();
      }

      const editedItem = await t.shoppingListItems.edit(
        shoppingListItemId,
        shoppingListItemName,
        quantity,
        selected,
        shoppingListId
      );
      if (!editedItem) throw new SomethingWentWrong();

      return editedItem;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const removeShoppingListItem = async (userId, shoppingListItemId) => {
  try {
    const result = await db.task(async (t) => {
      const itemToRemove = await t.shoppingListItems.findById(
        userId,
        shoppingListItemId
      );
      if (!itemToRemove) throw new BadRequest();

      if (itemToRemove.ownerId !== userId) {
        if (itemToRemove.shoppingListId) {
          const userRelation = await t.usersShoppingLists.findById(
            userId,
            itemToRemove.shoppingListId
          );
          if (!userRelation) throw new BadRequest();
        } else throw new BadRequest();
      }

      const removedItem = await t.shoppingListItems.remove(shoppingListItemId);
      if (!removedItem) throw new SomethingWentWrong();

      return removedItem;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getShoppingListItems,
  createShoppingListItem,
  editShoppingListItem,
  removeShoppingListItem,
};
