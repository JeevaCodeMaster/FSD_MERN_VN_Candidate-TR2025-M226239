import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import DoctorCard from "./DoctorCard";
import axios from "axios";
import DoctorList from "./DoctorList";
import { useNavigate } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";
import AdminDashboard from "./AdminDasboard";

function Home() {
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const role = useSelector((state) => {
    return state.auth.role;
  });
  const userId = useSelector((state) => {
    return state.auth.userId;
  });

  const navigate = useNavigate();
  const [doctor, setDoctor] = useState();

  const docCheck = async () => {
    try {
      const dres = await axios.get(
        `http://localhost:8090/doctor/get-doc/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      if (role == "doctor" && dres.data.msg == "no doctor found") {
        navigate("/doc-form", { state: userId });
      }
    } catch (error) {
      console.log(error.msg);
    }
  };
  if (role == "doctor" && token) {
    docCheck();
  }

  const loadDoctor = async () => {
    try {
      const doctors = await axios.get("http://localhost:8090/doctor/get-docs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (doctors != 0) {
        setDoctor(doctors.data.Doctor);
     
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    loadDoctor();
  }, []);
   useEffect(() => {
    if(!token){
      navigate("/")
    }
  },);



  if (token && role == "user") {
    return (
      <div>
        <DoctorList doctor={doctor} />
      </div>
    );
  } else if (token && role == "doctor") {
    return (
      <div>
       
        <DoctorDashboard/>
      </div>
    );
  } 
  else if (token && role == "admin") {
    return (
      <div>
      <AdminDashboard/>
      </div>
    );
  } 
}

export default Home;
