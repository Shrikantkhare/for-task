// models/Instructor.js

const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }, 
  role: {
    type: String,
    enum: ['instructor', 'admin'],
    default: 'instructor'
  },
  password: {
    type: String,
    required: true
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Instructor', instructorSchema);
