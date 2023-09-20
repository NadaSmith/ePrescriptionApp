const express = require("express");
const router = express.Router();
const { fetchDashboardData, fetchPatientDashboard } = require("../controllers/dashboard");
const { verifyToken } = require("../middleware/auth");

// Dashboard Page Route
router.get("/", verifyToken, fetchDashboardData);

// Dashboard Page Route for a specific patient
router.get("/:patientID", verifyToken, fetchPatientDashboard);

module.exports = router;
