const {
  createShoppingList,
  getShoppingLists,
  editShoppingList,
  removeShoppingList,
} = require("../services");

const get = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const result = await getShoppingLists(userId);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId, userName } = req.user;
  const { shoppingListName } = req.body;

  try {
    const result = await createShoppingList(userId, shoppingListName, userName);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  const { userId } = req.user;
  const { shoppingListId } = req.params;
  const { shoppingListName } = req.body;

  try {
    const result = await editShoppingList(
      userId,
      shoppingListId,
      shoppingListName
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { userId, defaultShoppingListId } = req.user;
  const { shoppingListId } = req.params;
  const { deleteItems } = req.query;

  try {
    const result = await removeShoppingList(
      userId,
      defaultShoppingListId,
      shoppingListId,
      deleteItems
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
