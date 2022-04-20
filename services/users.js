const bcrypt = require("bcrypt");
const { db } = require("../db");
const { constants, createToken } = require("../utils");
const { BadRequest, InvalidToken } = require("../errors");

const loginUser = async (userName, email, password) => {
  try {
    const user = await db.users.findByUserNameOrEmail(userName, email);

    if (
      !user ||
      !user.userId ||
      !user.userName ||
      !user.email ||
      !user.password
    )
      throw new BadRequest(constants.errorsMessages.invalid);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new BadRequest(constants.errorsMessages.invalid);

    const token = createToken(user.userId, user.userName, user.email);

    return {
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      token,
    };
  } catch (error) {
    throw new BadRequest(constants.errorsMessages.invalid);
  }
};

const registerUser = async (userName, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { userId } = await db.users.create(userName, email, hashedPassword);

    const token = createToken(userId, userName, email);

    return {
      userId,
      userName,
      email,
      token,
    };
  } catch (error) {
    throw new BadRequest(constants.errorsMessages.duplicateUser);
  }
};

const renewToken = async (userId, userName, email) => {
  const user = await db.users.findById(userId);

  if (
    !user ||
    !user.userId ||
    !user.userName ||
    !user.email ||
    user.userName !== userName ||
    user.email !== email
  )
    throw new InvalidToken();

  const token = createToken(userId, userName, email);

  return {
    userId,
    userName,
    email,
    token,
  };
};

module.exports = {
  loginUser,
  registerUser,
  renewToken,
};
