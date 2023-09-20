require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const usersData = require("./data/userData"); // Update the path as needed

const seedDatabase = async () => {
    try {
      // Connect to the MongoDB database
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      // Remove any existing data from the User collection
      await User.deleteMany();
  
      // Insert the mock user data into the User collection
      await User.insertMany(usersData);
  
      console.log("Database seeded successfully.");
    } catch (error) {
      console.error("Error seeding database:", error);
    } finally {
      // Disconnect from the database when done
      mongoose.disconnect();
    }
};
  
// Call the seedDatabase function to start the seeding process
seedDatabase();
  
