const { db } = require("../db");
const { BadRequest } = require("../errors");

const getSettings = async (userId, settingsId) => {
  if (userId !== settingsId) throw new BadRequest();

  try {
    const results = await db.settings.findById(userId);

    return results;
  } catch (error) {
    throw error;
  }
};

const editSettings = async (
  userId,
  settingsId,
  defaultNumberOfDaysForWarning
) => {
  if (userId !== settingsId) throw new BadRequest();

  try {
    const results = await db.settings.edit(
      userId,
      defaultNumberOfDaysForWarning
    );

    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSettings,
  editSettings,
};
