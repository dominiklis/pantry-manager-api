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
  const { userId } = req.user;
  const { productName, expirationDate, quantity, unit, storageId } = req.body;

  try {
    const result = await createProduct(
      userId,
      productName,
      expirationDate,
      quantity,
      unit,
      storageId
    );

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  const { userId } = req.user;
  const { productId } = req.params;
  const { productName, expirationDate, quantity, unit, storageId } = req.body;

  try {
    const result = await editProduct(
      userId,
      productId,
      productName,
      expirationDate,
      quantity,
      unit,
      storageId
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { userId } = req.user;
  const { productId } = req.params;

  try {
    const result = await removeProduct(userId, productId);

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
