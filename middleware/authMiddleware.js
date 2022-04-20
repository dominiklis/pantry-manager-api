const jwt = require("jsonwebtoken");
const { InvalidToken } = require("../errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new InvalidToken();

  const token = authorization.split(" ")[1];
  if (!token) throw new InvalidToken();

  let payload = {};
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) throw new InvalidToken();
  } catch {
    throw new InvalidToken();
  }

  req.user = payload;
  next();
};

module.exports = auth;
