const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
const registerUser = async (req, res) => {
    try {
          // Extract user data from the request body
          const { 
              firstname, 
              lastname, 
              username, 
              email, 
              password, 
              patientList, 
              location, 
              occupation 
          } = req.body;
  
          const salt = await bcrypt.genSalt();
          // Hash the password before storing it
          const hashedPassword = await bcrypt.hash(password, salt);
  
          // Create a new user using the User model
          const newUser = new User({ 
              firstname, 
              lastname,  
              email, 
              location, 
              occupation,
              username,
              password: hashedPassword , 
              patientList
          });
  
          // Save the new user to the database
          const savedUser = await newUser.save();
  
          // Return the user data and token
          res.status(201).json(savedUser);
    } catch (error) {
          // Handle registration errors
          res.status(500).json({ error: 'Server error' });
    }
};

const login = async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) return res.status(400).json({ message: 'User not found! '});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

        const token = jwt.sign({ id: user._id }, process.env.SECRET);
        delete user.password;
        res.status(200).json({ token, user });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = { registerUser, login }