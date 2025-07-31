import User from '../models/User.js';

// Function to create a new user
// This function handles the creation of a new user  by the admin in the Vaxitrack application
export const createUser = async (req, res) => {
  try {
    const {
      fullName,
      age,
      dateOfBirth,
      phone,
      email,
      location,
      gender,
      occupation,
      maritalStatus,
      isElderly,
      caregiverType,
      preferredLanguage,
      children
    } = req.body;
    // Validate required fields
    const elderlyStatus = age > 65 ? true : isElderly;

    const user = new User({
      fullName,
      age,
      dateOfBirth,
      phone,
      email,
      location,
      gender,
      occupation,
      maritalStatus,
      isElderly: elderlyStatus,
      caregiverType,
      preferredLanguage,
      children
    });

    const savedUser = await user.save();
    res.status(201).json({ success: true, newUser: savedUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }   
    res.status(200).json({ success: true, updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
    };
};


export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }   
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};