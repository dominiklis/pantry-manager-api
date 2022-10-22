const {
  getShoppingListItems,
  createShoppingListItem,
  editShoppingListItem,
  removeShoppingListItem,
} = require("../services");

const get = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const result = await getShoppingListItems(userId);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId, defaultShoppingListId } = req.user;
  const {
    shoppingListItemName,
    amount,
    selected = false,
    shoppingListId,
  } = req.body;

  try {
    const result = await createShoppingListItem(
      userId,
      defaultShoppingListId,
      shoppingListItemName,
      amount,
      selected,
      shoppingListId
    );

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  const { userId, defaultShoppingListId } = req.user;
  const { shoppingListItemId } = req.params;
  const { shoppingListItemName, amount, selected, shoppingListId } = req.body;

  try {
    const result = await editShoppingListItem(
      userId,
      defaultShoppingListId,
      shoppingListItemId,
      shoppingListItemName,
      amount,
      selected,
      shoppingListId
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { userId, defaultShoppingListId } = req.user;
  const { shoppingListItemId } = req.params;

  try {
    const result = await removeShoppingListItem(
      userId,
      defaultShoppingListId,
      shoppingListItemId
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  create,
  edit,
  remove,
};
