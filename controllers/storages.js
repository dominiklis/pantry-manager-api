const { createStorage } = require("../services");

const create = async (req, res, next) => {
  const { userId } = req.user;
  const { storageName, color } = req.body;

  try {
    const result = await createStorage(userId, storageName, color);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
