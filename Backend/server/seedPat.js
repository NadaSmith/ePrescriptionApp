require("dotenv").config();
const mongoose = require("mongoose");
const Patient = require("./models/Patients"); // Adjust the import path to match your project structure
const mockPatients = require("./data/patientData");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Delete existing patients (optional)
    await Patient.deleteMany({});

    // Seed mock patients
    await Patient.insertMany(mockPatients);

    console.log("Seeded mock patients");

    // Close the connection
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
