const { createProduct } = require("../services");

const create = async (req, res, next) => {
  const { userId } = req.user;
  const { productName, expirationDate, quantity, unit } = req.body;

  try {
    const result = await createProduct(
      userId,
      productName,
      expirationDate,
      quantity,
      unit
    );

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
