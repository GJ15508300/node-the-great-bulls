const mongooe = require("mongoose");

const UserSchema = new mongooe.Schema({
  name: { type: String },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  resetToken: { type: String },
  resetTokenExpiry: { type: String },
});

module.exports = mongooe.model("User", UserSchema);
