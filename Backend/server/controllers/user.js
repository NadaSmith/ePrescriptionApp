const User = require('../models/User.js');


//read user details
const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: "Server error" });
    }
}

//read user's list of patients
const getUserPatients = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
    
        const patients = await Promise.all(
            user.patients.map((id) => User.findById(id))
        );
    
        const formattedPatients = patients.map(
            ({ _id, firstname, lastname, age, birtdate, gender }) => {
                return { _id, firstname, lastname, age, birtdate, gender };
            }
        );
        res.status(200).json(formattedPatients);
    }   catch (error) {
        res.status(404).json({ message: "Server error" });
    }
}

// Create a new user (registration)
const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, username, password, location, occupation, patientlist } = req.body;
        const newUser = new User({
            firstname,
            lastname,
            email,
            username,
            password,
            location,
            occupation,
            patientlist,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user information by ID
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { firstname, lastname, email, username, password, location, occupation, patientlist } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstname,
                lastname,
                email,
                username,
                password, // You may want to hash the password before updating.
                location,
                occupation,
                patientlist,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getUser, getUserPatients, createUser, updateUser };