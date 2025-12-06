import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const doctorId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
 

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8090/appointment/get-appBydocId/${doctorId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments(res.data.Appointment);
     
    } catch (err) {
      console.log(err);
      alert("Failed to load doctor appointments");
    }
  };

  useEffect(() => {
   
    fetchAppointments();
  }, []);
useEffect(()=>{
     if (!token) {navigate("/")}
})
  // Update appointment status (confirm, cancel, complete)
  const updateStatus = async (apptId, status) => {
    try {
      const res = await axios.put(
        `http://localhost:8090/appointment/up-app/${apptId}/${status}`,{},

        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.msg);
      console.log(res.data);
      fetchAppointments(); // reload data
    } catch (err) {
      console.log(err);
      alert("Status update failed");
    }
  };

  return (
    <div className="container" style={{ marginTop: "7rem" ,marginBottom:"5rem"}}>
      <h3 className="text-center mb-4">🩺 Doctor Dashboard – Appointments</h3>

      <div className="d-flex flex-column align-items-center gap-3">
        {appointments.length === 0 ? (
          <p className="text-muted">No Appointments Found</p>
        ) : (
          <div className="d-flex flex-column align-items-center gap-3">
  {appointments.length === 0 ? (
    <p className="text-muted">No Appointments Found</p>
  ) : (
    <div className="d-flex flex-wrap gap-4 justify-content-center w-100">
      {appointments.map((appt) => (
        <div
          className="card shadow"
          key={appt._id}
          style={{ width: "300px", borderRadius: "12px" }}
        >
          <div className="card-body text-start">

            <h5 className="fw-bold">
              👤 Patient: {appt.PatientName}
            </h5>

            <p className="mb-1">
              <strong>Date: </strong>
              {appt.date.split("T")[0]}
            </p>

            <p className="mb-1">
              <strong>Time: </strong>
              {appt.time}
            </p>

            <p className="mb-1">
              <strong>Health Issue: </strong>
              {appt.reason}
            </p>

            <p className="mb-2">
              <strong>Status:</strong>
              <span
                className={`badge ms-2 
                  ${appt.status === "pending" ? "bg-warning" : ""}
                  ${appt.status === "confirmed" ? "bg-primary" : ""}
                  ${appt.status === "cancelled" ? "bg-danger" : ""}
                  ${appt.status === "completed" ? "bg-success" : ""}
                `}
              >
                {appt.status}
              </span>
            </p>

            {/* BUTTONS SECTION */}
            <div className="mt-3 d-flex gap-2">
              {appt.status === "pending" && (
                <>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => updateStatus(appt._id, "confirmed")}
                  >
                    Confirm
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => updateStatus(appt._id, "cancelled")}
                  >
                    Cancel
                  </button>
                </>
              )}

              {appt.status === "confirmed" && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => updateStatus(appt._id, "completed")}
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

         
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;
