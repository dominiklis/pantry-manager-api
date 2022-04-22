const { db } = require("../db");
const { SomethingWentWrong, BadRequest } = require("../errors");

const getProducts = async (userId) => {
  try {
    const results = await db.products.get(userId);

    return results;
  } catch (error) {
    throw error;
  }
};

const createProduct = async (
  userId,
  productName,
  expirationDate,
  quantity,
  unit,
  storageId
) => {
  try {
    const createdProduct = await db.products.create(
      userId,
      productName,
      expirationDate,
      quantity,
      unit,
      storageId
    );
    if (!createdProduct) throw new SomethingWentWrong();

    return createdProduct;
  } catch (error) {
    throw error;
  }
};

const editProduct = async (
  userId,
  productId,
  productName,
  expirationDate,
  quantity,
  unit,
  storageId
) => {
  try {
    const result = await db.task(async (t) => {
      const productToEdit = await t.products.findById(userId, productId);
      if (!productToEdit) throw new BadRequest();

      const editedProduct = await t.products.edit(
        productId,
        productName,
        expirationDate,
        quantity,
        unit,
        storageId
      );
      if (!editedProduct) throw new SomethingWentWrong();

      return editedProduct;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const removeProduct = async (userId, productId) => {
  try {
    const result = await db.task(async (t) => {
      const productToRemove = await t.products.findById(userId, productId);
      if (!productToRemove) throw new BadRequest();

      const removedProduct = await t.products.remove(productId);
      if (!removedProduct) throw new SomethingWentWrong();

      return removedProduct;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProducts,
  createProduct,
  editProduct,
  removeProduct,
};
