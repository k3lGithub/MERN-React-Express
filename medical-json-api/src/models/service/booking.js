const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  owner: String,
  doctorId: String,
  day: String,
  time: String
});

module.exports = mongoose.model('Doctor', BookingSchema);