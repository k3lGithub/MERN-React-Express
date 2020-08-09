const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  phone: Number,
});

module.exports = mongoose.model('User', UserSchema);