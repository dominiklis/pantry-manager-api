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
  defaultShoppingListId,
  shoppingListItemName,
  amount,
  selected,
  shoppingListId
) => {
  try {
    const result = await db.task(async (t) => {
      // check if the user has access to the list
      if (shoppingListId !== defaultShoppingListId) {
        const userRelation = await t.usersShoppingLists.findById(
          userId,
          shoppingListId
        );

        if (!userRelation) throw new BadRequest();
      }

      // create item
      const createdItem = await t.shoppingListItems.create(
        shoppingListItemName,
        amount,
        selected,
        shoppingListId
      );

      if (!createdItem) throw new SomethingWentWrong();

      return createdItem;
    });

    return result;
  } catch (error) {
    if (error?.code === "23503") throw new BadRequest();

    throw error;
  }
};

const editShoppingListItem = async (
  userId,
  defaultShoppingListId,
  shoppingListItemId,
  shoppingListItemName,
  amount,
  selected,
  shoppingListId
) => {
  try {
    const result = await db.task(async (t) => {
      // find item to edit
      const itemToEdit = await t.shoppingListItems.findById(shoppingListItemId);
      if (!itemToEdit) throw new BadRequest();

      // check that item is on list that user has access to
      if (itemToEdit.shoppingListId !== defaultShoppingListId) {
        const userRelation = await t.usersShoppingLists.findById(
          userId,
          itemToEdit.shoppingListId
        );

        if (!userRelation) throw new BadRequest();
      }

      // if item is moved from one list to another, check that user has access to this second list
      if (
        itemToEdit.shoppingListId !== shoppingListId &&
        itemToEdit.shoppingListId !== defaultShoppingListId
      ) {
        const userRelation = await t.usersShoppingLists.findById(
          userId,
          shoppingListId
        );

        if (!userRelation) throw new BadRequest();
      }

      // edit item
      const editedItem = await t.shoppingListItems.edit(
        shoppingListItemId,
        shoppingListItemName,
        amount,
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

const removeShoppingListItem = async (
  userId,
  defaultShoppingListId,
  shoppingListItemId
) => {
  try {
    const result = await db.task(async (t) => {
      // find item
      const itemToRemove = await t.shoppingListItems.findById(
        shoppingListItemId
      );
      if (!itemToRemove) throw new BadRequest();

      // check that user has access to the list on which this item is
      if (itemToRemove.shoppingListId !== defaultShoppingListId) {
        const userRelation = await t.usersShoppingLists.findById(
          userId,
          itemToRemove.shoppingListId
        );

        if (!userRelation) throw new BadRequest();
      }

      // remove item
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
