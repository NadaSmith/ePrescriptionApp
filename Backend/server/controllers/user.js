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
};



module.exports = { getUser, getUserPatients };