import mongoose from 'mongoose';

const vaccineSchema = new mongoose.Schema(
  {
    vaccineName: {
      type: String,
      required: true,
      trim: true,
    },
    disease: {
      type: String,
      required: true,
      trim: true,
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfDoses: {
      type: Number,
      required: true,
      min: 1,
    },
    dosingInterval: {
      type: String,
      trim: true,
    },
    ageGroup: {
      type: String,
      required: true,
      trim: true,
    },
    routeOfAdministration: {
      type: String,
      enum: ['oral', 'intramuscular', 'subcutaneous', 'intradermal', 'nasal'],
      required: true,
      trim: true,
    },
    stockCount: {
      type: Number,
      required: true,
      min: 0,
    },
    storageRequirements: {
      type: String,
      trim: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Vaccine', vaccineSchema);
