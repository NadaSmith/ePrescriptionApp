const Patient = require('../models/Patients'); // Import the Patient model

//fetch dashboard data for a specific patient 
const fetchDashboardData = async (req, res) => {
    try {
        const { patientID } = req.params;

        // Assuming you have a Patient model with a field like 'patientID' to match
        // You may need to adjust this query based on your actual data structure
        const dashboardData = await Patient.findOne({ patientID });

        if (!dashboardData) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Modify this part to structure and send the dashboard data as needed
        res.status(200).json(dashboardData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Fetch dashboard data for a specific patient
const fetchPatientDashboard = async (req, res) => {
    try {
        // Get the patient ID from the URL parameter
        const { patientID } = req.params;

        // Query the database to get the specific patient's data
        const patient = await Patient.findById(patientID);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // You can fetch and format the specific patient's dashboard data here

        // Send the dashboard data as a response
        res.status(200).json({ patientDashboardData: id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { fetchDashboardData, fetchPatientDashboard };

