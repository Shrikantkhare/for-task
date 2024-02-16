// models/CheckInOut.js

const mongoose = require('mongoose');

const checkInOutSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date
  }
});

module.exports = mongoose.model('CheckInOut', checkInOutSchema);
