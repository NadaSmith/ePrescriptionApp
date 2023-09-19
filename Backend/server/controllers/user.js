import User from '../models/User';


//read user details
export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: "Server error" });
    }
}

//read user's list of patients
export const getUserPatients = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
    
        const patients = await Promise.all(
            user.patients.map((id) => User.findById(id))
        );
    
        const formattedPatients = patients.map(
            ({ _id, name, age, birtdate, gender }) => {
                return { _id, name, age, birtdate, gender };
            }
        );
        res.status(200).json(formattedPatients);
    }   catch (error) {
        res.status(404).json({ message: "Server error" });
    }
}

//add or remove patient from user's patient's list
export const addRemovePatient = async (req, res) => {
    try {
        const { id, patientId } = req.params;
        const user = await User.findById(id);
        const patient = await User.findById(patientId);

        if (user.patients.includes(patientId)) {
            user.patients = user.patients.filter((id) => id !== patientId);
            patient.patients = patient.patients.filter((id) => id !== id);
        } else {
            user.patients.push(patientId);
            patient.patients.push(id);
        }
        await user.save();
        await patient.save();

        const patients = await Promise.all(
            user.patients.map((id) => User.findById(id))
        );
    
        const formattedPatients = patients.map(
            ({ _id, name, age, birtdate, gender }) => {
                return { _id, name, age, birtdate, gender };
            }
        );
        res.status(200).json(formattedPatients);
    }   catch (error) {
        res.status(404).json({ message: "Server error" });
    }
}

// Update patient information
export const updatePatient = async (req, res) => {
    try {
        const { id, patientId } = req.params;
        const user = await User.findById(id);

        // Find the patient by their ID within the user's list of patients
        const patientToUpdate = user.patients.find((patient) => patient == patientId);

        if (!patientToUpdate) {
            return res.status(404).json({ message: 'Patient not found for this user' });
        }

        // Update patient details using req.body
        const { name, age, birthdate, gender } = req.body;
        if (name) patientToUpdate.name = name;
        if (age) patientToUpdate.age = age;
        if (birthdate) patientToUpdate.birthdate = birthdate;
        if (gender) patientToUpdate.gender = gender;

        // Save the updated user
        await user.save();

        // Return the updated patient details
        res.status(200).json(patientToUpdate);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

