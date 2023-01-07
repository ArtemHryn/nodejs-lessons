const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const sha256 = require("sha256");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { NotAuthorizedError } = require("../helper/errors");
const { User } = require("../models/userModel");
const { Verification } = require("../models/verificationModel");

const registration = async (body) => {
  const user = new User(body);
  await user.save();

  const code = sha256(user.email + process.env.JWT_SERCRET);
  console.log(code);
  const verification = new Verification({
    userId: user._id,
    code,
  });
  await verification.save();

  const msg = {
    to: body.email,
    from: "grynbest@gmail.com", // Use the email address or domain you verified above
    subject: "Thank you for the registration",
    text: `Please, confirm your email address http://localhost:3001/api/auth/verify/${code}`,
    html: `Please, confirm your email address http://localhost:3001/api/auth/verify/${code}`,
  };
  (async () => {
    try {
      await sgMail.send(msg);
      console.log("email has been sent");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email, confirmed: true });
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

const verification = async (code) => {
  const verification = await Verification.findOne({ code, active: true });
  if (!verification) {
    throw new NotAuthorizedError("Invalist or expired code")
  }

  const user = await User.findById(verification.userId)

    if (!user) {
      throw new NotAuthorizedError("No user Found");
  }
  verification.active = false
  await verification.save()

  user.confirmed = true
  await user.save()
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email, confirmed: true });
  if (!user) {
    throw new NotAuthorizedError(`No user with ${email} found`);
  }
  const password = uuidv4(12);
  // const encryptedPassword = bcrypt.hash(password, 10);

  user.password = password;
  console.log(password);
  await user.save();

  const msg = {
    to: user.email,
    from: "grynbest@gmail.com", // Use the email address or domain you verified above
    subject: "Temporary password",
    text: `your new password ${password}`,
    html: `your new password ${password}`,
  };
  (async () => {
    try {
      await sgMail.send(msg);
      console.log("email has been sent");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
};

module.exports = { registration, login, verification, forgotPassword };
