const {
  registration,
  login,
  verification,
  forgotPassword,
} = require("../services/authServices");

const registrationController = async (req, res) => {
  await registration(req.body);

  res.status(201).json({ status: "success" });
};

const loginController = async (req, res) => {
  const token = await login(req.body);

  res.status(200).json({ status: "success", token });
};

const verificationController = async (req, res) => {
  const { code } = req.params;
  await verification(code);

  res.status(200).json({ status: "verified" });
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  await forgotPassword(email);
  res.status(200).json({ status: "password has been sent" });
};

module.exports = {
  registrationController,
  loginController,
  verificationController,
  forgotPasswordController,
};
