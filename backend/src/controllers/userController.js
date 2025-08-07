import UserVaccinationRecord from '../models/UserVaccinationRecord.js';
import User from '../models/User.js';

export const getDashboard = async (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching dashboard for user ID: ${userId}`);
  try {
    const user = await User.findById(userId).select('-__v');
    const records = await UserVaccinationRecord.find({ user: userId }).populate('vaccine');

    res.status(200).json({
      profile: {
        name: user.fullName,
        phoneNumber: user.phone,
      },
      vaccinationRecords: records.map(rec => ({
        patientName: rec.patientName,
        vaccineName: rec.vaccine.vaccineName,
        vaccineDispensed: rec.vaccineDispensed,
        nextDoseDue: rec.nextDoseDue,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard.', error: err.message });
  }
};

