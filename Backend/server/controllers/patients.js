const Patient = require('../models/Patients'); // Import the Patient model

// Create a new patient
const createPatient = async (req, res) => {
    try {
        const { firstname, lastname, age, birthdate, gender } = req.body;
        const newPatient = new Patient({
            firstname,
            lastname,
            age,
            birthdate,
            gender,
        });
        const savedPatient = await newPatient.save();
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a patient by ID
const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPatient = await Patient.findByIdAndRemove(id);
        if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(deletedPatient);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update patient information by ID
const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, age, birthdate, gender } = req.body;

        const updatedPatient = await Patient.findByIdAndUpdate(
            id,
            {
                firstname,
                lastname,
                age,
                birthdate,
                gender,
            },
            { new: true }
        );

        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createPatient, getAllPatients, deletePatient, updatePatient };
