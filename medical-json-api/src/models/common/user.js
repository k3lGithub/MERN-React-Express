const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  phone: Number,
  postcode: Number,
});

module.exports = mongoose.model("User", UserSchema);