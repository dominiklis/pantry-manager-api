const {
  getUsersStorages,
  createUsersStorages,
  editUsersStorages,
  deleteUsersStorages,
} = require("../services");

const get = async (req, res, next) => {
  const { userId } = req.user;
  const { storageId } = req.params;

  try {
    const result = await getUsersStorages(userId, storageId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId: loggedUserId } = req.user;
  const { storageId } = req.params;
  const {
    userId,
    userName,
    email,
    canShare,
    canEdit,
    canDelete,
    canChangePermissions,
  } = req.body;

  try {
    const result = await createUsersStorages(
      loggedUserId,
      storageId,
      userId,
      userName,
      email,
      canShare,
      canEdit,
      canDelete,
      canChangePermissions
    );

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  const { userId: loggedUserId } = req.user;
  const { storageId, userId } = req.params;
  const { canShare, canEdit, canDelete, canChangePermissions } = req.body;

  try {
    const result = await editUsersStorages(
      loggedUserId,
      storageId,
      userId,
      canShare,
      canEdit,
      canDelete,
      canChangePermissions
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { userId: loggedUserId } = req.user;
  const { storageId, userId } = req.params;

  try {
    const result = await deleteUsersStorages(loggedUserId, storageId, userId);

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
