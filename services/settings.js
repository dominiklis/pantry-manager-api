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
  defaultNumberOfDaysForWarning,
  language,
  theme
) => {
  if (userId !== settingsId) throw new BadRequest();

  try {
    const settings = await db.settings.findById(userId);

    const results = await db.settings.edit(
      userId,
      defaultNumberOfDaysForWarning ?? settings.defaultNumberOfDaysForWarning,
      language ?? settings.language,
      theme ?? settings.theme
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
