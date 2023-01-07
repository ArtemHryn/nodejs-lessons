const express = require('express');

const {
  registrationController,
  loginController,
  verificationController,
  forgotPasswordController,
} = require("../../controllers/authController");
const { asyncWrapper } = require("../../helper/apiHelpers");

const router = express.Router();

router.post('/registration', asyncWrapper(registrationController))
router.post('/login', asyncWrapper(loginController))
router.post("/verify/:code", asyncWrapper(verificationController));
router.post("/forgot_password", asyncWrapper(forgotPasswordController));

module.exports = router;