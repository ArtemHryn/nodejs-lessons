const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helper/errors");

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(
      new NotAuthorizedError(
        "Please, provide a token in request authorization header"
      )
    );
  }

  const [, token] = req.headers.authorization.split(" ");
  if (!token) {
    next(new NotAuthorizedError("Please authentificate"));
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SERCRET);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizedError(error.message));
  }
};

module.exports = { authMiddleware };
