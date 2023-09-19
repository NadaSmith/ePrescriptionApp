const express = require("express");
const {
    getUser,
    getUserPatients,
    addRemovePatient,
    updatePatient,
} = require("../controllers/user.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

//read user details
router.get("/:useriId", verifyToken, getUser);

//read user's list of patients
router.get('/:userId/patients', verifyToken, getUserPatients);

//Add or Remove a patient 
router.patch("/:userId/:patientId", verifyToken, addRemovePatient);

//update patient information 
router.patch("/:userId/patients/:patientId", verifyToken, updatePatient)

module.exports = router;