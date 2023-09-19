const Med = require('../models/Meds.js');
const User = require('../models/User.js');

// Read medications for a particular patient
const getMeds = async (req, res) => {
    try {
        const { patientId } = req.params;
        const medications = await Med.find({ patient: patientId });
        res.status(200).json(medications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add or remove medication for a patient
const addRemoveMeds = async (req, res) => {
    try {
        const { patientId, medId } = req.params;
        const patient = await User.findById(patientId);
        const medication = await Med.findById(medId);

        // Check if the medication exists
        if (!medication) {
            return res.status(404).json({ message: 'Medication not found' });
        }

        // Check if the patient already has this medication
        const patientHasMedication = patient.medications.includes(medId);

        if (patientHasMedication) {
            // Remove the medication from the patient's list
            patient.medications = patient.medications.filter((id) => patientId !== medId);
        } else {
            // Add the medication to the patient's list
            patient.medications.push(medId);
        }

        // Save the updated patient
        await patient.save();

        // Return the updated patient's list of medications
        res.status(200).json(patient.medications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update medication information
const updateMeds = async (req, res) => {
    try {
        const { patientId, medId } = req.params;
        const medication = await Med.findById(medId);

        // Check if the medication exists
        if (!medication) {
            return res.status(404).json({ message: 'Medication not found' });
        }


        // Update medication details using req.body
        const { name, dosage, startDate, direction, dispense, dispenseUnits, refills, supply } = req.body;

        if (!name || !dosage || !startDate || !direction || !dispense || !dispenseUnits || !refills || !supply) {
            return res.status(400).json({ success: false, error: 'Required fields are missing' });
        }

        if (name) medication.name = name;
        if (dosage) medication.dosage = dosage;
        if (startDate) medication.startDate = startDate;
        if (direction) medication.direction = direction;
        if (dispense) medication.dispense = dispense;
        if (dispenseUnits) medication.dispenseUnits = dispenseUnits;
        if (refills) medication.refills = refills;
        if (supply) medication.supply = supply;

        // Save the updated medication
        await medication.save();

        // Return the updated medication details
        res.status(200).json(medication);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { getMeds, addRemoveMeds, updateMeds };