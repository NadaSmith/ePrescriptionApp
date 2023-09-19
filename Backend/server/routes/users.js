import express from "express";
import {
    getUser,
    getUserPatients,
    addRemovePatient,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
import { verify } from "jsonwebtoken";

const router = express.Router();

//Read
router.get("/:id", verifyToken, getUser);
router.get('/:id/patients', verifyToken, getUserPatients);

//Update
router.patch("/:id/:patientId", verifyToken, addRemovePatient);

export default router;