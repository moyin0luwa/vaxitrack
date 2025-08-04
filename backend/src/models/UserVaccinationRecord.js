import mongoose from 'mongoose';
import Vaccine from './Vaccine.js'; // Required to fetch numberOfDoses

const userVaccinationRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vaccine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vaccine',
    required: true
  },
   patientName: {
    type: String,
    required: true
  },
  vaccineDispensed:{   
    type: String,
    required: true  
  },
  dateAdministered: {
    type: Date,
    default: null
  },
  dosesAdministered: {
    type: Number,
    default: 0,
    min: 0
  },
  dosingSchedule: {
    type: [Date], // Array of dose dates
    default: []
  },
  nextDoseDue: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  }
}, { timestamps: true });

// Auto-update status before saving
userVaccinationRecordSchema.pre('save', async function (next) {
  try {
    const vaccine = await Vaccine.findById(this.vaccine);
    if (!vaccine) return next(new Error('Vaccine not found'));

    if (this.dosesAdministered === 0) {
      this.status = 'pending';
    } else if (this.dosesAdministered < vaccine.numberOfDoses) {
      this.status = 'in progress';
    } else {
      this.status = 'completed';
    }

    // Set next dose due date from dosing schedule if applicable
    if (
      this.dosingSchedule.length > this.dosesAdministered &&
      this.status !== 'completed'
    ) {
      this.nextDoseDue = this.dosingSchedule[this.dosesAdministered];
    } else {
      this.nextDoseDue = null;
    }

    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('VaccinationRecord', userVaccinationRecordSchema);