const mongoose = require('mongoose');

const userSchema = new Schema({
  firstname: {
    type: String,
    min: 2,
    max: 50,
    lowercase: true,
    required: true
  },
  lastname: {
    type: String,
    min: 2,
    max: 50,
    lowercase: true,
    required: true
  },
  email: { 
    type: String,
    unique: true,
    max: 50,
    lowercase: true,
    required: true
  },
  location: String,
  occupation: String,
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: { 
        type: String,
        trim: true,
        minLength: 8,
        required: true
  },
  patientList: {
    type: Array,
    default: [],
  },
  
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

module.exports = mongoose.model('User', userSchema);
