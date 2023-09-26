require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); // Import path module

// Import your models, controllers, and middleware as needed
const User = require("./models/User");
const { registerUser, login } = require("./controllers/auth");
const { fetchPatients, addPrescription } = require("./controllers/patients");
const { fetchDashboard } = require("./controllers/dashboard");
const { verifyToken } = require("./middleware/auth");

// Import Routes
const meds = require('./routes/meds.js'); // You had a typo here: 'meds' instead of 'medsRoutes'
const auth = require("./routes/auth.js");
const patients = require("./routes/patients.js"); 
const dashboard = require("./routes/dashboard.js");
const users = require("./routes/users.js");

/* CONFIGURATIONS */
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

/* MONGOOSE SETUP */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

/* ROUTES */

// Define your routes for patient operations
app.get("/api/patients/patientlist", (req, res) => {
  res.json(patients);
});

app.post("/api/patients/patients", (req, res) => {
  const newPatient = req.body;
  patients.push(newPatient);
  res.status(201).json(newPatient);
});

app.put("/api/patients/:patientID", (req, res) => {
  const patientID = req.params.patientID;
  const updatedData = req.body;

  const patientIndex = patients.findIndex((patient) => patient.id === patientID);

  if (patientIndex !== -1) {
    patients[patientIndex] = { ...patients[patientIndex], ...updatedData };
    res.json(patients[patientIndex]);
  } else {
    res.status(404).json({ message: "Patient not found" });
  }
});

app.delete("/api/patients/:patientID", (req, res) => {
  const patientID = req.params.patientID;

  patients = patients.filter((patient) => patient.id !== patientID);
  res.json({ message: "Patient deleted" });
});

// Home Page Route
app.get("/api/home", (req, res) => {
  // Handler function for the home page
  // Provide general information or perform necessary actions
  res.status(200).json({ message: "Welcome to the home page!" });
});

// Use the route files with their base paths
app.use("/api/auth", auth);
app.use("/api/patients", patients);
app.use("/api/meds", meds);
app.use("/api/dashboard", dashboard); // Corrected the path to dashboardRoutes
app.use("/api/users", users); // Added the route for users


/* SERVER SETUP */
const PORT = process.env.PORT || 6002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
