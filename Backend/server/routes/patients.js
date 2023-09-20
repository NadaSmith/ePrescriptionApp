const express = require('express');
const router = express.Router();
const { createPatient, getAllPatients, deletePatient, updatePatient } = require('../controllers/patients');
const { verifyToken } = require('../middleware/auth');


// Route for creating a new patient
router.post('/api/patients', verifyToken, createPatient);

// Route for getting all patients
router.get('/api/patientlist', verifyToken, getAllPatients);

// Route for deleting a patient by ID
router.delete('/api/patients/:id', verifyToken, deletePatient);

// Route for updating patient information by ID
router.put('/api/patients/:id', verifyToken, updatePatient);

module.exports = router;