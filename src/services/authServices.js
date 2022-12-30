const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { NotAuthorizedError } = require("../helper/errors");
const { User } = require("../models/userModel");

const registration = async (body) => {
  const user = new User(body);
  await user.save();
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError(`No user with ${email} found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Wrong password");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SERCRET,
    { expiresIn: "1d" }
  );

  return token;
};

module.exports = { registration, login };
