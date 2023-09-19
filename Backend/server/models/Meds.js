const mongoose = require('mongoose');

const medSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dosage: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    direction: {
        type: String,
        required: true,
    },
    dispense: {
        type: Number,
        required: true,
    },
    dispenseUnits: {
        type: String,
        required: true,
    },
    refills: {
        type: Number,
        required: true,
    },
    supply: {
        type: Number,
        required: true,
    },
}, { timestamps: true}
);

module.exports = mongoose.model('Med', medSchema);
