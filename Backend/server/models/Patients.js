const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    birthdate: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'NonBinary', 'Other'], // You can customize this enum as needed
    },
});

module.exports = mongoose.model('Patient', patientSchema);
