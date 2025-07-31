// controllers/vaccineController.js
import Vaccine from '../models/Vaccine.js';

export const createVaccine = async (req, res) => {
  try {
    const {
      vaccineName,
      disease,
      manufacturer,
      numberOfDoses,
      dosingInterval,
      ageGroup,
      routeOfAdministration,
      stockCount,
      storageRequirements,
      expiryDate,
      location,
      description,
    } = req.body;

    // Validate required fields
    if (
      !vaccineName ||
      !disease ||
      !manufacturer ||
      !numberOfDoses ||
      !ageGroup ||
      !routeOfAdministration ||
      stockCount === undefined ||
      !expiryDate ||
      !location 
    ) {
      return res.status(400).json({
        success: false,
        message: 'vaccineName, disease, manufacturer, numberOfDoses, ageGroup,RouteOfAdminstration, Stockcount, expirydate, location fields are required to create a vaccine.',
      });
    }

    const newVaccine = new Vaccine({
      vaccineName,
      disease,
      manufacturer,
      numberOfDoses,
      dosingInterval,
      ageGroup,
      routeOfAdministration,
      stockCount,
      storageRequirements,
      expiryDate,
      location,
      description,
    });

    await newVaccine.save();

    res.status(201).json({
      success: true,
      message: 'Vaccine created successfully.',
      data: newVaccine,
    });
  } catch (error) {
    console.error('Error creating vaccine:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not create vaccine.',
    });
  }
};

export const getAllVaccines = async (req, res) => {
  try {
    const vaccines = await Vaccine.find();
    res.status(200).json({
      success: true,
      data: vaccines,
    });
  } catch (error) {
    console.error('Error fetching vaccines:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch vaccines.',
    });
  }
};


export const getVaccine = async (req, res) => {
  try {
    const { vaccineid } = req.params;
    const vaccine = await Vaccine.findById(vaccineid);
    if (!vaccine) {
      return res.status(404).json({success: false, message: 'Vaccine not found.',
      });
    }
    res.status(200).json({success: true, data: vaccine,
    });
  } catch (error) {
    console.error('Error fetching vaccine:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch vaccine.',
    });
  }
};

export const updateVaccine = async (req, res) => {
 
  try {
     const { vaccineid } = req.params;
    const updatedVaccine = await Vaccine.findByIdAndUpdate(vaccineid, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedVaccine) {
      return res.status(404).json({
        success: false,
        message: 'Vaccine not found.',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Vaccine updated successfully.',
      data: updatedVaccine,
    });
    } catch (error) {           
    console.error('Error updating vaccine:', error);
    res.status(500).json({
        success: false,
        message: 'Server error. Could not update vaccine.',
        }); 
    }
};

export const deleteVaccine = async (req, res) => {
  const { vaccineid } = req.params;
  try {
    const deletedVaccine = await Vaccine.findByIdAndDelete(vaccineid);
    if (!deletedVaccine) {
      return res.status(404).json({
        success: false,
        message: 'Vaccine not found.',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Vaccine deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting vaccine:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not delete vaccine.',
    });
  }
};