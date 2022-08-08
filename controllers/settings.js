const { getSettings, editSettings } = require("../services");

const getById = async (req, res, next) => {
  const { userId } = req.user;
  const { settingsId } = req.params;

  try {
    const result = await getSettings(userId, settingsId);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  const { userId } = req.user;
  const { settingsId } = req.params;
  const { defaultNumberOfDaysForWarning, language, theme } = req.body;

  try {
    const result = await editSettings(
      userId,
      settingsId,
      defaultNumberOfDaysForWarning,
      language,
      theme
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getById, edit };
