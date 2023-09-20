const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: { 
    type: String,
    unique: true,
    required: true,
  },
  location: String,
  occupation: String,
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: { 
        type: String,
        required: true,
  },
  patientList: {
    type: Array,
    default: [],
  },
  
}, {
  timestamps: true,}
);

module.exports = mongoose.model('User', userSchema);
