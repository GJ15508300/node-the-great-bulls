const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("./authSchema");

const registerUser = async (email, password, name) => {
  const existingUser = await User.findOne({ email });

  if (!existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, name });
  await newUser.save();
  return newUser;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const forgot_password = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not Found");

  const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password reset",
    text: `Reset password using this link: http://localhost:3000/reset-password/${resetToken}`,
  });
};

const resetPassword = async (token, newPassword) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({
    _id: decoded.userId,
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid or expired token");

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();
};

module.exports = { registerUser, loginUser, forgot_password, resetPassword };
