const express = require("express");
const { registerUser, login } = require("../controllers/auth.js");

const router = express.Router();

//registration page route
router.post('/register', registerUser);

//login page route
router.post("/login", login);

module.exports = router;