const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  speciality: { type: String, required: true },
  experienceYears: Number,
  hospitalName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  pincode: { type: Number, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  bio: String,
  fees: Number,
  location: String,
  isApproved:{type:String,enum: ['pending','reject','approved'], default: 'pending'}
});

module.exports = mongoose.model("Doctor", DoctorSchema);
