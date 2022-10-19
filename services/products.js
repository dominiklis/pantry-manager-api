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
      continue;
    }
  }

  return result;
};

const removeProductsLabelsRelations = async (task, userId, productId) => {
  await task.productsLabels.removeForProduct(userId, productId);
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
  defaultStorageId,
  productName,
  expirationDate,
  amount,
  storageId,
  labels
) => {
  try {
    const result = await db.task(async (t) => {
      // check if the user has access to the storage
      if (storageId !== defaultStorageId) {
        const userRelation = await t.usersStorages.findById(userId, storageId);
        if (!userRelation) throw new BadRequest();
      }

      // create product
      const createdProduct = await t.products.create(
        productName,
        expirationDate,
        amount,
        storageId
      );
      if (!createdProduct) throw new SomethingWentWrong();

      // create relations with labels
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
  defaultStorageId,
  productId,
  productName,
  expirationDate,
  amount,
  storageId,
  labels
) => {
  try {
    const result = await db.task(async (t) => {
      // find product
      const productToEdit = await t.products.findById(productId);
      if (!productToEdit) throw new BadRequest();

      // check that product is in storage that the user has access to
      if (productToEdit.storageId !== defaultStorageId) {
        const userRelation = await t.usersStorages.findById(
          userId,
          productToEdit.storageId
        );
        if (!userRelation) throw new BadRequest();
      }

      // if product is moved from one storage to another, check that user has access to this second storage
      if (productToEdit.storageId !== storageId) {
        const userRelation = await t.usersStorages.findById(userId, storageId);
        if (!userRelation) throw new BadRequest();
      }

      // edit the product
      const editedProduct = await t.products.edit(
        productId,
        productName,
        expirationDate,
        amount,
        storageId
      );
      if (!editedProduct) throw new SomethingWentWrong();

      // remove existing relations with labels and create new
      await removeProductsLabelsRelations(t, userId, productId);

      if (labels && labels.length) {
        labels = await createProductsLabelsRelations(
          t,
          labels,
          editedProduct.productId,
          userId
        );
      }

      return { ...editedProduct, labels: labels ?? [] };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const removeProduct = async (userId, defaultStorageId, productId) => {
  try {
    const result = await db.task(async (t) => {
      // find product
      const productToRemove = await t.products.findById(productId);
      if (!productToRemove) throw new BadRequest();

      // check that user has access to the storage in which this product is
      if (productToRemove.storageId !== defaultStorageId) {
        const userRelation = await t.usersStorages.findById(
          userId,
          productToRemove.storageId
        );
        if (!userRelation) throw new BadRequest();
      }

      // remove product
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
