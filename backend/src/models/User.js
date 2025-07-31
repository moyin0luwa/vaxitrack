import mongoose from 'mongoose'; 
//User model schema for the Vaxitrack application
//This schema defines the structure of user documents in the MongoDB database
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
      required: true,
    },
    isElderly: {
      type: Boolean,
      default: false,
    },
    caregiverType: {
      type: String,
      enum: ["Mother", "Father", "Guardian", "Self"],
      required: true,
    },
    preferredLanguage: {
      type: String,
      default: "English",
    },
    children: [
      {
        name: String,
        age: Number,
      },
    ],
    vaccines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserVaccine",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);