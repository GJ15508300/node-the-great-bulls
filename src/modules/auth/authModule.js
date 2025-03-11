const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("./authController");

const router = express.Router();
router.post("/signup", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
