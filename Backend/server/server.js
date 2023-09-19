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
const  { addRemoveMed } = require("./controllers/meds.js");
const { verifyToken } = require("./middleware/auth.js");
const User = require("./models/User.js");
const Med = require("./models/Meds.js");
const { users } = require("./data/userData.js");
const { medications } = require("./data/medData.js");



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

//static catch-all app; always goes last bc want to test everything else first
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
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    //Add data one time
    User.insertMany(users);
    Med.insertMany(medications);
  })
  .catch((error) => console.log(`${error} did not connect`));