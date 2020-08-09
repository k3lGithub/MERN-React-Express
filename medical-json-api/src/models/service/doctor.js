const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  description: String
  // add available time / seperate model later
});

module.exports = mongoose.model('Doctor', DoctorSchema);