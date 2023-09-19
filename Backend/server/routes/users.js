const express = require("express");
const {
    getUser,
    getUserPatients,
    createUser,
    updateUser,
} = require("../controllers/user.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

//read user details
router.get("/:useriId", verifyToken, getUser);

//read user's list of patients
router.get('/:userId/patients', verifyToken, getUserPatients);

//create a new user (registration)
router.post("/registration", verifyToken, createUser)

//update user information
router.put("/:userId", verifyToken, updateUser);

module.exports = router;