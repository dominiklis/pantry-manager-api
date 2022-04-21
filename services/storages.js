const { db } = require("../db");
const { SomethingWentWrong } = require("../errors");

const createStorage = async (userId, storageName, color) => {
  try {
    const createdProduct = await db.storages.create(userId, storageName, color);

    if (!createdProduct) throw new SomethingWentWrong();

    return createdProduct;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createStorage,
};
