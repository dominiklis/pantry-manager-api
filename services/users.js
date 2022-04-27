const bcrypt = require("bcrypt");
const { db } = require("../db");
const { constants, createToken } = require("../utils");
const { BadRequest, InvalidToken } = require("../errors");

const loginUser = async (userName, email, password) => {
  try {
    const result = await db.task(async (t) => {
      const user = await t.users.findByUserNameOrEmail(userName, email);

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

      const storages = await t.storages.get(user.userId);
      const products = await t.products.get(user.userId);
      const labels = await t.labels.get(user.userId);
      const shoppingLists = await t.shoppingLists.get(user.userId);
      const shoppingListItems = await t.shoppingListItems.get(user.userId);

      return {
        userId: user.userId,
        userName: user.userName,
        email: user.email,
        token,
        storages,
        products,
        labels,
        shoppingLists,
        shoppingListItems,
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
      const { userId } = await db.users.create(userName, email, hashedPassword);

      const token = createToken(userId, userName, email);

      return {
        userId,
        userName,
        email,
        token,
        storages: [],
        products: [],
        labels: [],
        shoppingLists: [],
        shoppingListItems: [],
      };
    });

    return result;
  } catch (error) {
    throw new BadRequest(constants.errorsMessages.duplicateUser);
  }
};

const renewToken = async (userId, userName, email) => {
  const result = await db.task(async (t) => {
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

    const storages = await t.storages.get(user.userId);
    const products = await t.products.get(user.userId);
    const labels = await t.labels.get(user.userId);
    const shoppingLists = await t.shoppingLists.get(user.userId);
    const shoppingListItems = await t.shoppingListItems.get(user.userId);

    return {
      userId,
      userName,
      email,
      token,
      storages,
      products,
      labels,
      shoppingLists,
      shoppingListItems,
    };
  });

  return result;
};

module.exports = {
  loginUser,
  registerUser,
  renewToken,
};
