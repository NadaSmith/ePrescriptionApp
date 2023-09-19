import Medication from '../models/Medication';

// Read medications for a particular patient
export const getMeds = async (req, res) => {
    try {
        const { patientId } = req.params;
        const medications = await Medication.find({ patient: patientId });
        res.status(200).json(medications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add or remove medication for a patient
export const addRemoveMeds = async (req, res) => {
    try {
        const { id, medId } = req.params;
        const patient = await User.findById(id);
        const medication = await Medication.findById(medId);

        // Check if the medication exists
        if (!medication) {
            return res.status(404).json({ message: 'Medication not found' });
        }

        // Check if the patient already has this medication
        const patientHasMedication = patient.medications.includes(medId);

        if (patientHasMedication) {
            // Remove the medication from the patient's list
            patient.medications = patient.medications.filter((id) => id !== medId);
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
export const updateMeds = async (req, res) => {
    try {
        const { id, medId } = req.params;
        const medication = await Medication.findById(medId);

        // Check if the medication exists
        if (!medication) {
            return res.status(404).json({ message: 'Medication not found' });
        }

        // Update medication details using req.body
        const { name, dosage, frequency } = req.body;
        if (name) medication.name = name;
        if (dosage) medication.dosage = dosage;
        if (frequency) medication.frequency = frequency;

        // Save the updated medication
        await medication.save();

        // Return the updated medication details
        res.status(200).json(medication);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
