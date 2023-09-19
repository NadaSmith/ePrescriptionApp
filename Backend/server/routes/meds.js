import express from "express";
import {
    getMeds,
    addRemoveMeds,
    updateMeds,

} from "..//controllers/meds.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//read medication details
router.get("/:id", verifyToken, getMeds);

//add or remove medication
router.patch("/:id/:medId", verifyToken, addRemoveMeds);

//update medication information
router.patch("/:id/meds/:medId", verifyToken, updateMeds)

export default router;
