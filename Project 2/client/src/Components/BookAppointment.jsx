import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function BookAppointment() {
  const location = useLocation();
  const doctor = location.state;

  const userId = useSelector((state) => {
    return state.auth.userId;
  });
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const navigate=useNavigate()
const userName = localStorage.getItem("userName")


  const [form, setForm] = useState({
    doctorId: doctor.user,
    doctorName: doctor.doctorName,
    patientId: userId,
    PatientName: userName,
    date: "",
    time: "",
    status:"pending",
    reason: "",
    
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const bookAppointment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8090/appointment/add-app",
        form,{
          headers:{Authorization:`Bearer ${token}`}
        }
      );
      
      navigate("/home")
      alert(res.data.msg);
      
    } catch (err) {
      alert("Booking failed!", err);

 
    }
  };



  useEffect(()=>{
    if(!token){
      navigate("/")
    }
  })


  return (
    <div className="container mt-4  border p-5 rounded shadow" style={{width:"450px"}}>
      <h2>Book a Doctor : {doctor.doctorName.toUpperCase()}</h2>

      <div className=" mx-auto">
        <label className="float-start mb-2">Date:</label>
      <input
        type="date"
        name="date"
        className="form-control"
        onChange={handleChange}
      />

      <label className="float-start mt-2 mb-2">Time:</label>
      <input
        type="time"
        name="time"
        className="form-control"
        onChange={handleChange}
      />
      <label className="float-start mt-2 mb-2">Reason :</label>
      <input
        type="text"
        name="reason"
        className="form-control"
        onChange={handleChange}
      />

      <button className="btn btn-primary mt-3" onClick={bookAppointment}>
        Book Appointment
      </button></div>
    </div>
  );
}

export default BookAppointment;
