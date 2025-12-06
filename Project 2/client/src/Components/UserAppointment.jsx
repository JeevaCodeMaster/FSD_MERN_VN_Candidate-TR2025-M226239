import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserAppointment() {
  const userId = useSelector((state) => {
    return state.auth.userId;
  });
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  // Fetch appointments of current user
  const getAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8090/appointment/get-appByUsId/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAppointments(res.data.Appointment);
     
    } catch (error) {
      console.error(error);
      alert("Failed to load appointments");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });
  return (
    <div className="container  " style={{ marginTop: "7rem" ,marginBottom:"7rem"}}>
      <h3 className="mb-3 text-center">My Appointments</h3>

      {appointments.length === 0 ? (
        <p className="text-center text-muted">No Appointments Found</p>
      ) : (
        <div className="d-flex flex-wrap gap-3 justify-content-start">
          {appointments.map((appt) => (
            <div
              className="card shadow p-2 w-25"
              key={appt._id}
              style={{ minWidth: "250px" }}
            >
              <div className="card-body text-start px-3 py-3">
                <h5 className="card-title">Doctor: {appt.doctorName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Patient: {appt.PatientName}
                </h6>

                <p className="mb-1">
                  <strong>Date:</strong> {appt.date.split("T")[0]}
                </p>
                <p className="mb-1">
                  <strong>Time:</strong> {appt.time}
                </p>

                <p className="mb-1">
                  <strong>Health Issue:</strong> {appt.reason || "No details"}
                </p>

                <p className="mb-1">
                  <strong>Status:</strong>
                  <span
                    className={`badge ms-2 
                      ${appt.status === "pending" ? "bg-warning" : ""} 
                      ${appt.status === "confirmed" ? "bg-primary" : ""} 
                      ${appt.status === "cancelled" ? "bg-danger" : ""}
                    ${appt.status === "completed" ? "bg-success" : ""}`}
                  >
                    {appt.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    
  );
}

export default UserAppointment;
