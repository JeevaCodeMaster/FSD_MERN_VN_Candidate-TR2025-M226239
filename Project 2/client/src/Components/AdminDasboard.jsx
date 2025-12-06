import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => {
    return state.auth.token;
  });

  const loadAppoints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8090/appointment/get-apps",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments(res.data.Appointment);
    } catch (error) {
      alert(`${error}`);
    }
  };

  useEffect(() => {
    loadAppoints();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  return (
    <div className="container mt-4 " >
      <h2 className="mb-4">Admin Dashboard - All Appointments</h2>

      <table className="table table-striped table-bordered shadow-sm " >
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Doctor</th>

            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((app, index) => (
            <tr key={index}>
              <td>{app._id}</td>

              <td className="text-start py-2 px-3">
                {app.patientId ? (
                  <>
                    <b>{app.PatientName}</b>
                  </>
                ) : (
                  "User "
                )}
              </td>

              <td>{app.doctorId ? app.doctorName : "Doctor"}</td>

              <td>{new Date(app.date).toLocaleDateString()}</td>

              <td>{app.time}</td>

              <td>
                <span
                  className={`badge ${
                    app.status === "pending"
                      ? "bg-warning"
                      : app.status == "completed"
                      ? "bg-success"
                      : app.status === "confirmed"
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {app.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
