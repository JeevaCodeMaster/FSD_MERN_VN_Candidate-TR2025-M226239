const doctormodel = require("../models/Doctors");
const usermodel = require("../models/Users");

const getDoctors = async (req, res) => {
  try {
    const allDoctor = await doctormodel.find();
    if (!allDoctor) {
     return res.status(400).json({ msg: "no doctor found" });
    }
    return res.status(200).json({ Doctor: allDoctor });
  } catch (error) {
   return res.status(500).json({ msg: error.message });
  }
};

const getDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const Doctor = await doctormodel.findOne({ user: id });
    if (!Doctor) {
      return res.status(200).json({ msg: "no doctor found" });
      
    }
   return res.status(200).json({ doctor: Doctor._id });
  } catch (error) {
   return res.status(500).json({ msg: error.message });
  }
};

const addDoctor = async (req, res) => {
  const {
    user,
    speciality,
    experienceYears,
    bio,
    fees,
    location,
    phone,
    state,
    district,
    address,
    pincode,
    doctorName,
    hospitalName,
  } = req.body;
 
  try {
    const Doctor = await usermodel.findOne({ _id: user });
    const Doctorexist = await usermodel.findOne({ user: user });
    if (!Doctor && !Doctorexist) {
       return res.status(400).json({ msg: "no doctor found" });
    }
    const adddoc = await doctormodel.create({
       user,
  speciality,
  experienceYears,
  bio,
  fees,
  location,
  phone,
  state,
  district,
  address,
  pincode,
  doctorName,
  hospitalName,
    });
  return  res.status(200).json({ doctor: adddoc });
  } catch (error) {
  return  res.status(500).json({ msg: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const findDoctor = await doctormodel.findOne({ _id: id });

    if (findDoctor) {
      const result = await doctormodel.deleteOne({ _id: id });
     
      if(result){
      return  res.status(200).json({ msg: "successfully deleted!" });
      }
      
    }
   return res.status(400).json({ msg: "try again" });
  } catch (error) {
   return res.status(500).json({ Error: error.message });
  }
};


const approveDoctor=async(req,res)=>{
const isapprove =req.params.allow;

try {
  const exists =await doctormodel.findOne({user:req.params.id})

  if(exists){

    const approved = await doctormodel.findOneAndUpdate(
      { user: req.params.id },
      { isApproved: isapprove },
      { new: true }
    );

    if(approved){
     return res.status(200).json({msg:`Dr ${approved.doctorName} is ${isapprove}`})
    }
  }
 return res.status(400).json({msg:`Dr ${exists.doctorName} is not approved `})
} catch (error) {
 return res.status(500).json({msg:`${error}`})
}
}

const doctorController = { deleteDoctor, addDoctor, getDoctor, getDoctors ,approveDoctor};
module.exports = doctorController;
