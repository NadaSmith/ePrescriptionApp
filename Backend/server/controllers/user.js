import User from '../models/User';


//Read
export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: "Server error" });
    }
}

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

//Update

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