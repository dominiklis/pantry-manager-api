const {
  getProducts,
  createProduct,
  editProduct,
  removeProduct,
} = require("../services");

const get = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const result = await getProducts(userId);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId, defaultStorageId } = req.user;
  const { productName, expirationDate, amount, storageId, labels } = req.body;

  try {
    const result = await createProduct(
      userId,
      defaultStorageId,
      productName,
      expirationDate,
      amount,
      storageId,
      labels
    );

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  const { userId, defaultStorageId } = req.user;
  const { productId } = req.params;
  const { productName, expirationDate, amount, storageId, labels } = req.body;

  try {
    const result = await editProduct(
      userId,
      defaultStorageId,
      productId,
      productName,
      expirationDate,
      amount,
      storageId,
      labels
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { userId, defaultStorageId } = req.user;
  const { productId } = req.params;

  try {
    const result = await removeProduct(userId, defaultStorageId, productId);

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
