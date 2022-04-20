const jwt = require("jsonwebtoken");
const { SomethingWentWrong } = require("../errors");

const createToken = (userId, userName, email) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_LIFETIME;
  if (!secret || !expiresIn) throw new SomethingWentWrong();

  return jwt.sign({ userId, userName, email }, secret, {
    expiresIn,
  });
};

module.exports = createToken;
