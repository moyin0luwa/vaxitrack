import VaccinationRecord from '../models/UserVaccinationRecord.js';
import Vaccine from '../models/Vaccine.js';
import User from '../models/User.js';
import { sendVaccinationReminder } from '../services/vaxiSMS.js';


export const createVaccinationRecord = async (req, res) => {
  try {
    const { fullName, vaccineName, dateAdministered } = req.body;

    // Find user by fullName
    const user = await User.findOne({ fullName });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Find vaccine by vaccineName
    const vaccine = await Vaccine.findOne({ vaccineName });
    if (!vaccine) {
      return res.status(404).json({ success: false, message: 'Vaccine not found.' });
    }

    // Parse and validate dosing interval
    const interval = parseInt(vaccine.dosingInterval);
    if (isNaN(interval)) {
      return res.status(400).json({ success: false, message: 'Invalid dosing interval.' });
    }

    // Generate dosing schedule
    //intervalDays should be in days. should it be a number or string
    const generateDosingSchedule = (startDate, numberOfDoses, intervalDays) => {
      const schedule = [];
      const baseDate = new Date(startDate);

      for (let i = 0; i < numberOfDoses; i++) {
        const doseDate = new Date(baseDate);
        doseDate.setDate(baseDate.getDate() + i * intervalDays);
        schedule.push(doseDate);
      }

      return schedule;
    };

    const startDate = new Date(dateAdministered || Date.now());
    const dosingSchedule = generateDosingSchedule(
      startDate,
      vaccine.numberOfDoses,
      interval
    );

const nextDoseDue = dosingSchedule.length > 1 ? dosingSchedule[1] : null;
    //once the next dose dose is sorted then we can isolate out the next dose due out to a sms api to the user.Phonenumber, a week to and two weeks to pegging the vaccine.location to be location
    //


    const newRecord = new VaccinationRecord({
      user: user._id,
      vaccine: vaccine._id,
      patientName: fullName,
      vaccineDispensed: vaccine.vaccineName,
      dateAdministered: startDate,
      dosesAdministered: 1,
      dosingSchedule,
      nextDoseDue: nextDoseDue,
      status: 'pending',
    });

    await newRecord.save();

    // Send SMS Reminder
    await sendVaccinationReminder({
      phoneNumber: user.phoneNumber,
      patientName: fullName,
      vaccineName: vaccine.vaccineName,
      nextDoseDue,
    });

    return res.status(201).json({
      success: true,
      message: 'Vaccination record created successfully.',
      data: newRecord,
    });

  } catch (error) {
    console.error('Error creating vaccination record:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not create vaccination record.',
    });
  }
};

export const getAllVaccinationRecords = async (req, res) => {
  try {
    const records = await VaccinationRecord.find().populate('user').populate('vaccine');
    return res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    console.error('Error fetching vaccination records:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch vaccination records.',
    });
  }
};

export const getVaccinationRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await VaccinationRecord.findById(id).populate('user').populate('vaccine');
    
    if (!record) {
      return res.status(404).json({ success: false, message: 'Vaccination record not found.' });
    }

    return res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error('Error fetching vaccination record:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch vaccination record.',
    });
  }
};

export const deleteVaccinationRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await VaccinationRecord.findByIdAndDelete(id);
    
    if (!record) {
      return res.status(404).json({ success: false, message: 'Vaccination record not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Vaccination record deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting vaccination record:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Could not delete vaccination record.',
    });
  }
};