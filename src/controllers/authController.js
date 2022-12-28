const { registration, login } = require("../services/authServices");

const registrationController = async (req, res) => {
  await registration(req.body);

  res.status(201).json({ status: "success" });
};

const loginController = async (req, res) => {
  const token = await login(req.body);

  res.status(200).json({ status: "success", token });
};

module.exports = { registrationController, loginController };
