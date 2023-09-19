const express = require("express");
const {
    getMeds,
    addRemoveMeds,
    updateMeds,
} = require("..//controllers/meds.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

//read medication details
router.get("/:patientId/meds", verifyToken, getMeds);

//add or remove medication
router.patch("/:patientId/:medId", verifyToken, addRemoveMeds);

//update medication information
router.patch("/:patientId/meds/:medId", verifyToken, updateMeds)

module.exports = router;
