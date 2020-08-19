const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  owner: String,
  doctorId: String,
  date: String,
  time: String,
});

module.exports = mongoose.model("Booking", BookingSchema);
