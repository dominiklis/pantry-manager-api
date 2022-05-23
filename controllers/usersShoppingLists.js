const {
  getUsersShoppingLists,
  createUsersShoppingLists,
  editUsersShoppingLists,
  deleteUsersShoppingLists,
} = require("../services");

const get = async (req, res, next) => {
  const { userId } = req.user;
  const { shoppingListId } = req.params;

  try {
    const result = await getUsersShoppingLists(userId, shoppingListId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId: loggedUserId } = req.user;
  const { shoppingListId } = req.params;
  const { userId, userName, email, canShare } = req.body;

  try {
    const result = await createUsersShoppingLists(
      loggedUserId,
      shoppingListId,
      userId,
      userName,
      email,
      canShare
    );

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  const { userId: loggedUserId } = req.user;
  const { shoppingListId, userId } = req.params;
  const { canShare } = req.body;

  try {
    const result = await editUsersShoppingLists(
      loggedUserId,
      shoppingListId,
      userId,
      canShare
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { userId: loggedUserId } = req.user;
  const { shoppingListId, userId } = req.params;

  try {
    const result = await deleteUsersShoppingLists(
      loggedUserId,
      shoppingListId,
      userId
    );

    res.status(200).json(result);
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
