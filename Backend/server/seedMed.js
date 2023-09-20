require("dotenv").config();
const mongoose = require("mongoose");
const Meds = require("./models/Meds");

const medData = require("./data/medData");

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
      for (const medInfo of medData) {
        const med = new Meds({
          // Map properties from medInfo to your Med model
          name: medInfo.name,
          // Add other properties as needed
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
  