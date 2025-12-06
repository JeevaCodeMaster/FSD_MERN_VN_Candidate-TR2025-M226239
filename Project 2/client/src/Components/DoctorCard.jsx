import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function DoctorCard({ doctor }) {
  const navigate=useNavigate()
const token =useSelector((state)=>{return state.auth.token})


useEffect(()=>{
  if(!token){
    navigate("/")
  }
})

  const bookDoctor=(doctors)=>{
    
    navigate("/Book_Appoint",{state:doctors})
  }

  return (
    <div
      className="card   p-2 text-start mx-auto shadow-sm w-100"
      style={{ width: "500px",height:"350px",borderRadius: "10px" }}
    >
      <div className="d-flex my-auto" >
        <img src="/images/profile.jfif" className="rounded-circle" alt="doctor photo" />
      <div className="card-body">
        <h4 className="card-title mb-2">{doctor.doctorName}</h4>

        <p className="card-text mb-1">
          <strong>Speciality:</strong> {doctor.speciality}
        </p>

        <p className="card-text mb-1">
          <strong>Experience:</strong> {doctor.experienceYears} years
        </p>

        <p className="card-text mb-1">
          <strong>Consultation Fee:</strong> ₹{doctor.fees}
        </p>

        <p className="card-text mb-1">
          <strong>Phone:</strong> {doctor.phone}
        </p>

        <p className="card-text mb-1">
          <strong>Location:</strong> {doctor.location}
        </p>

        <p className="card-text mb-1">
          <strong>Full Address:</strong> {doctor.address}, {doctor.district},{" "}
          {doctor.state} - {doctor.pincode}
        </p>

        <div className="text-end mt-3">
          <button className="btn btn-primary btn-sm" onClick={()=>{bookDoctor(doctor) }}>Book Appointment</button>
        </div>
      </div></div>
    </div>
  );
}

export default DoctorCard;
