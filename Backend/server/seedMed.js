require("dotenv").config();
const mongoose = require("mongoose");
const Meds = require("./models/Meds");

const medications = require("./data/medData");

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

const seedMedications = async () => {
  try {
    // Loop through medData and create and save Med instances
    for (const medInfo of medications) {
      const med = new Meds({
        name: medInfo.name,
        supply: medInfo.supply, // Add supply from medInfo
        refills: medInfo.refills, // Add refills from medInfo
        dispenseUnits: medInfo.dispenseUnits, // Add dispenseUnits from medInfo
        dispense: medInfo.dispense, // Add dispense from medInfo
        direction: medInfo.direction, // Add direction from medInfo
        startDate: medInfo.startDate, // Add startDate from medInfo
        dosage: medInfo.dosage, // Add dosage from medInfo
      });

      // Save the medication to the database
      await med.save();
    }

    console.log("Medications seeded successfully");
  } catch (error) {
    console.error("Error seeding medications:", error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
};
  
// Call the seeding function
seedMedications();
  