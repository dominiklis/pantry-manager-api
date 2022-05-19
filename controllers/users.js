const {
  loginUser,
  registerUser,
  updateUser,
  renewToken,
} = require("../services");

const login = async (req, res, next) => {
  const { userName, email, password } = req.body;

  try {
    const result = await loginUser(userName, email, password);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const { userName, email, password } = req.body;

  try {
    const result = await registerUser(userName, email, password);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { userId, userName, email } = req.user;
  const { newUserName, newEmail, currentPassword, newPassword } = req.body;

  try {
    const result = await updateUser(
      userId,
      userName,
      email,
      newUserName,
      newEmail,
      currentPassword,
      newPassword
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const renew = async (req, res, next) => {
  const { userId, userName, email } = req.user;

  try {
    const result = await renewToken(userId, userName, email);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
  update,
  renew,
};
