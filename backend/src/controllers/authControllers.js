import User from '../models/User.js';

export const loginUser = async (req, res) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    return res.status(400).json({ message: 'Phone number and password are required.' });
  }

  try { 
    const user = await User.findOne({ phone: phoneNumber });
    if (!user || user.phone !== password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // You can store the user ID in a session or JWT here
    req.user = user; // For demo, we just attach it to the request
    res.status(200).json({
      message: 'Login successful',
      redirect: `/vaxitrack/user/dashboard/${user._id}`, // Adjust this as needed
      userId: user._id, // useful on frontend to request other info
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
