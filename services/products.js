const { db } = require("../db");
const { SomethingWentWrong, BadRequest } = require("../errors");

const createProductsLabelsRelations = async (
  task,
  labels,
  productId,
  userId
) => {
  const result = [];

  for (const labelId of labels) {
    try {
      const label = await task.labels.findById(labelId);
      if (label && label.ownerId === userId) {
        const insertingResult = await task.productsLabels.create(
          productId,
          labelId
        );
        if (insertingResult) result.push(labelId);
      }
    } catch (error) {
      console.log(error);

      continue;
    }
  }

  return result;
};

const removeProductsLabelsRelations = async (task, productId) => {
  await task.productsLabels.removeForProduct(productId);
};

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
  storageId,
  labels
) => {
  try {
    const result = await db.task(async (t) => {
      const createdProduct = await t.products.create(
        userId,
        productName,
        expirationDate,
        quantity,
        unit,
        storageId
      );
      if (!createdProduct) throw new SomethingWentWrong();

      if (labels && labels.length) {
        labels = await createProductsLabelsRelations(
          t,
          labels,
          createdProduct.productId,
          userId
        );
      }

      return { ...createdProduct, labels: labels ?? [] };
    });

    return result;
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
  storageId,
  labels
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

      await removeProductsLabelsRelations(t, productId);

      if (labels && labels.length) {
        labels = await createProductsLabelsRelations(
          t,
          labels,
          editedProduct.productId,
          userId
        );
      }

      return { editedProduct, labels: labels ?? [] };
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
