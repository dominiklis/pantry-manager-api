const {
  getStorages,
  createStorage,
  editStorage,
  removeStorage,
} = require("../services");

const get = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const result = await getStorages(userId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId, userName } = req.user;
  const { storageName, color } = req.body;

  try {
    const result = await createStorage(userId, userName, storageName, color);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  const { userId } = req.user;
  const { storageId } = req.params;
  const { storageName, color } = req.body;

  try {
    const result = await editStorage(userId, storageId, storageName, color);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { userId } = req.user;
  const { storageId } = req.params;
  const { deleteProducts } = req.query;

  try {
    const result = await removeStorage(userId, storageId, deleteProducts);

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
