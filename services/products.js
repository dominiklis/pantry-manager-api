const { db } = require("../db");
const { SomethingWentWrong } = require("../errors");

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

module.exports = {
  createProduct,
};
