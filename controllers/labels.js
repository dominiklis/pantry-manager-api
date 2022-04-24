const {
  getLabels,
  createLabel,
  editLabel,
  removeLabel,
} = require("../services");

const get = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const result = await getLabels(userId);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId } = req.user;
  const { labelName } = req.body;

  try {
    const result = await createLabel(userId, labelName);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  const { userId } = req.user;
  const { labelId } = req.params;
  const { labelName } = req.body;

  try {
    const result = await editLabel(userId, labelId, labelName);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { userId } = req.user;
  const { labelId } = req.params;

  try {
    const result = await removeLabel(userId, labelId);

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
