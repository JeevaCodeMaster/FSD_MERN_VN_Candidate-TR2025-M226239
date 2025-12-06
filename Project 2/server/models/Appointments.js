const mongoose =require("mongoose");

const AppointmentSchema =new mongoose.Schema({

patientId:{
    type:mongoose.Schema.Types.ObjectId,
    ref :"User",
    required:true
},
PatientName:{type:String,required:true},
doctorId:{

    type:mongoose.Schema.Types.ObjectId,
    ref:"Doctor",
    required:true
},
doctorName:{type:String,required:true},
date:{
    type:Date,
    required:true
},
time:{
    type:String,
    required:true
},
  status: { type: String, enum: ['pending','confirmed','cancelled','completed'], default: 'pending' },
  reason: String,
  createdAt: { type: Date, default: Date.now }


})
AppointmentSchema.index(
  { doctorId: 1, date: 1, time: 1 },
  { unique: true }
);
module.exports=mongoose.model("Appointment",AppointmentSchema);