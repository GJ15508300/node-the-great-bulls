const authService = require("./authService");

const register = async (req, res) => {
  try {
    const user = await authService.registerUser(
      req.body.email,
      req.body.password
    );
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await authService.loginUser(
      req.body.email,
      req.body.password
    );
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    await authService.forgot_password(req.body.email);
    res.json({ message: "Password reset link sent" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    await authService.resetPassword(req.body.token, req.body.newPassword);
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login, forgotPassword, resetPassword };
