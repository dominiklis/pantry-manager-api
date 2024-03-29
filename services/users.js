const bcrypt = require("bcrypt");
const { db } = require("../db");
const { constants, createToken } = require("../utils");
const { BadRequest, InvalidToken } = require("../errors");

const loginUser = async (userName, email, password) => {
  try {
    const result = await db.task(async (t) => {
      const user = await t.users.findByUserNameOrEmail(userName, email);

      if (!user || !user.userId)
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
    });

    return result;
  } catch (error) {
    throw new BadRequest(constants.errorsMessages.invalid);
  }
};

const registerUser = async (userName, email, password) => {
  try {
    const result = await db.task(async (t) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const { userId } = await t.users.create(userName, email, hashedPassword);
      await t.settings.create(userId);
      await t.storages.createDefault(userId);
      await t.usersStorages.create(userId, userId, false);
      await t.shoppingLists.createDefault(userId);
      await t.usersShoppingLists.create(userId, userId, false);

      const token = createToken(userId, userName, email);

      return {
        userId,
        userName,
        email,
        token,
      };
    });

    return result;
  } catch (error) {
    throw new BadRequest(constants.errorsMessages.duplicateUser);
  }
};

const updateUser = async (
  userId,
  userName,
  email,
  newUserName,
  newEmail,
  currentPassword,
  newPassword
) => {
  try {
    const result = await db.task(async (t) => {
      const user = await t.users.findById(userId);
      if (
        !user ||
        !user.userId ||
        !user.userName ||
        !user.email ||
        !user.password ||
        user.userName !== userName ||
        user.email !== email
      )
        throw new InvalidToken();

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid)
        throw new BadRequest(constants.errorsMessages.invalid);

      let hashedPassword = user.password;
      if (newPassword) {
        hashedPassword = await bcrypt.hash(newPassword, 10);
      }

      const updatedUser = await t.users.edit(
        userId,
        newUserName || user.userName,
        newEmail || user.email,
        hashedPassword
      );

      const token = createToken(
        userId,
        updatedUser.userName,
        updatedUser.email
      );

      return {
        userId,
        userName: updatedUser.userName,
        email: updatedUser.email,
        token,
      };
    });

    return result;
  } catch (error) {
    if (error?.code === "23505")
      throw new BadRequest(constants.errorsMessages.duplicateUser);

    throw error;
  }
};

const renewToken = async (userId, userName, email) => {
  const result = await db.task(async (t) => {
    const user = await t.users.findById(userId);
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
  });

  return result;
};

module.exports = {
  loginUser,
  registerUser,
  updateUser,
  renewToken,
};
