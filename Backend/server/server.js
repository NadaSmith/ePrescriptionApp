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
const patients = require("./routes/patients.js"); // You had a typo here: 'patient' instead of 'patientRoutes'
const dashboard = require("./routes/dashboard.js"); // You had a typo here: 'dashnoard' instead of 'dashboardRoutes'
const users = require("./routes/users.js");

/* CONFIGURATIONS */
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Catch-all route for serving the frontend
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/* SERVER SETUP */
const PORT = process.env.PORT || 6002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
