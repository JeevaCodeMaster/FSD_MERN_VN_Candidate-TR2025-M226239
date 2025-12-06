const appointmodel = require("../models/Appointments");

const addAppointment = async (req, res) => {
  const {
    patientId,
    PatientName,
    doctorId,
    doctorName,
    date,
    time,
    status,
    reason,
  } = req.body;

  try {
    const exists =await appointmodel.findOne({ time, date });
    if (exists) {
      return res.status(400).json({ msg: "Already doctor booked by someone" });
      
    }
    const addappoint =await appointmodel.create({
      patientId,
      PatientName,
      doctorId,
      doctorName,
      date,
      time,
      status,
      reason,
    });
    
    return res.status(200).json({ msg: "appointment sended ", addappoint });
  } catch (error) {
    return res.status(500).json({ msg: `${error}` });
  }
};

const update_Appointment = async (req, res) => {
  const id = req.params.id;
  const status=req.params.status;
 

  try {
    const exists =await appointmodel.findOne({ _id: req.params.id });
    if (exists) {
      const upAppoint =await appointmodel.findByIdAndUpdate(req.params.id, { status:req.params.status });
      if (upAppoint) {
        return res.status(200).json({ msg: `appointment ${status}  ` });
      }
    }
   return res.status(400).json({ msg: "Not able to change status" });
  } catch (error) {
   return res.status(500).json({ msg: `${error}` });
  }
};

//for admin
const getAppointment = async (req, res) => {
  try {
    const getappoint =await appointmodel.find();
    if (getappoint) {
    return  res.status(200).json({ msg: "appointments", Appointment: getappoint }).sort({ date: -1 }).exec();
    }
   return res.status(400).json({ msg: "not able to fetch appointment" });
  } catch (error) {
   return res.status(500).json({ msg: `${error}` });
  }
};



const getDoctorAppointment = async (req, res) => {
    const id =req.params.id;
   
  try {
    const getappoint =await appointmodel.find({doctorId:id}).sort({ date: -1 }).exec();
    if (getappoint) {
    return  res.status(200).json({ msg: "appointments", Appointment: getappoint });
    }
   return res.status(400).json({ msg: "no appointment yet !" });
  } catch (error) {
   return res.status(500).json({ msg: `${error}` });
  }}

const getUserAppointment = async (req, res) => {
    const id=req.params.id;
  
  try {
    const getappoint =await appointmodel.find({patientId:id});
    
    if (getappoint.length!=0) {
     return res.status(200).json({ msg: "appointments", Appointment: getappoint });
    }
    return res.status(400).json({ msg: "no appointment yet !" });
  } catch (error) {
   return res.status(500).json({ msg: `${error}` });
  }

};

const deleteApp =async(req,res)=>{
     const id =req.params.id;
      try {
          const findUser =await appointmodel.findOne({_id:id});
          
          if(findUser) {
              const result= await appointmodel.deleteOne({_id:id})
              if(result){
                return res.status(200).json({msg:"successfully deleted!"});
              }
              
          }
         return res.status(400).json({msg:"try again"});
      } catch (error) {
         return res.status(500).json({Error:error.message})
      }
}



const appointmentController = { addAppointment ,getAppointment, getDoctorAppointment ,update_Appointment,getUserAppointment,deleteApp };
module.exports = appointmentController
