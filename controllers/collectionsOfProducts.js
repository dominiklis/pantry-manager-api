const { createCollectionOfProducts } = require("../services");

const create = async (req, res, next) => {
  const { userId } = req.user;
  const { products } = req.body;

  try {
    const result = await createCollectionOfProducts(userId, products);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { create };
