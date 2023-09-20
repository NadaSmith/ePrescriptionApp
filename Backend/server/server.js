const User = require("./models/User.js"); // Import the User model
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { fileURLToPath } = require("url");
const { register } = require("./controllers/auth.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const medsRoutes = require("./routes/meds.js");
const { addRemoveMed } = require("./controllers/meds.js");
const { verifyToken } = require("./middleware/auth.js");
const { users } = require("./data/userData.js"); // Import user data

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/meds", medsRoutes);

// Define the /api/home route
app.get('/api/home', async (req, res) => {
  try {
    // Perform any necessary logic here
    // For example, you can fetch data from the User model
    // or perform other actions to prepare the response

    // Here, we're providing a simple JSON response
    const generalInfo = {
      message: 'Welcome to our website!',
      featuredContent: 'Check out our latest articles.',
    };

    // Send a JSON response back to the frontend
    res.status(200).json(generalInfo);
  } catch (error) {
    // Handle any errors and send an error response if needed
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

// Static catch-all app; always goes last because we want to test everything else first
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6002;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Add data one time
    // User.insertMany(users).then((insertedUsers) => {
    //   console.log(`Inserted ${insertedUsers.length} users.`);
    // }).catch((insertError) => {
    //   console.error("Error inserting users:", insertError);
    // });

    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
