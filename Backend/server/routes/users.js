const express = require("express");
const {
    getUser,
    getUserPatients,
} = require("../controllers/user.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

//read user details
router.get("/:id", verifyToken, getUser);

//read user's list of patients
router.get('/:id/patients', verifyToken, getUserPatients);

module.exports = router;