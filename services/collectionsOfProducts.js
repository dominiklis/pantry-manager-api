const { db } = require("../db");
const { SomethingWentWrong, BadRequest } = require("../errors");

const createCollectionOfProducts = async (userId, products) => {
  try {
    const result = await db.task(async (t) => {
      if (!products || !products.length) return [];

      const createdProducts = [];

      if (products[0].storageId) {
        const userRelation = await t.usersStorages.findById(
          userId,
          products[0].storageId
        );

        if (!userRelation) throw new BadRequest();
      }

      for (let index = 0; index < products.length; index++) {
        const { productName, expirationDate, amount, storageId } =
          products[index];

        const createdProduct = await t.products.create(
          userId,
          productName,
          expirationDate,
          amount,
          storageId
        );
        if (!createdProduct) throw new SomethingWentWrong();

        createdProducts.push({ ...createdProduct, labels: [] });
      }

      return createdProducts;
    });

    return result;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

module.exports = { createCollectionOfProducts };
