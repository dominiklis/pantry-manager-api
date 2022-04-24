const { db } = require("../db");
const { Duplicate, BadRequest, SomethingWentWrong } = require("../errors");

const getLabels = async (userId) => {
  try {
    const result = await db.labels.get(userId);

    return result;
  } catch (error) {
    throw error;
  }
};

const createLabel = async (userId, labelName) => {
  try {
    const createdLabel = await db.labels.create(userId, labelName);
    if (!createdLabel) throw new SomethingWentWrong();

    return createdLabel;
  } catch (error) {
    if (error?.code === "23505") throw new Duplicate("label", "name");

    throw error;
  }
};

const editLabel = async (userId, labelId, labelName) => {
  try {
    const result = await db.task(async (t) => {
      const labelToEdit = await t.labels.findById(labelId);
      if (!labelToEdit || labelToEdit.ownerId !== userId)
        throw new BadRequest();

      const editedLabel = await t.labels.edit(userId, labelId, labelName);
      if (!editedLabel) throw new SomethingWentWrong();

      return editedLabel;
    });

    return result;
  } catch (error) {
    if (error?.code === "23505") throw new Duplicate("label", "name");

    throw error;
  }
};

const removeLabel = async (userId, labelId) => {
  try {
    const result = await db.task(async (t) => {
      const labelToRemove = await t.labels.findById(labelId);
      if (!labelToRemove || labelToRemove.ownerId !== userId)
        throw new BadRequest();

      const removedLabel = await t.labels.remove(labelId);
      if (!removedLabel) throw new SomethingWentWrong();

      return removedLabel;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getLabels,
  createLabel,
  editLabel,
  removeLabel,
};
