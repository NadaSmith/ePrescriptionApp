import express from "express";
import {
    getUser,
    getUserPatients,
    addRemovePatient,
    updatePatient,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//read user details
router.get("/:id", verifyToken, getUser);

//read user's list of patients
router.get('/:id/patients', verifyToken, getUserPatients);

//Add or Remove a patient 
router.patch("/:id/:patientId", verifyToken, addRemovePatient);

//update patient information 
router.patch("/:id/patients/:patientId", verifyToken, updatePatient)

export default router;