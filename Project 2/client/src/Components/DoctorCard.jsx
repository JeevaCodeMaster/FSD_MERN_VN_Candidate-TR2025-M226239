import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const bookDoctor = () => {
    navigate("/Book_Appoint", { state: doctor });
  };

  return (
    <div className="card shadow-sm p-3 my-4 ">
      <div className="d-flex flex-column flex-md-row align-items-center ">
        
        {/* Image */}
        <img
          src="/images/profile.jfif"
          alt="doctor"
          className="rounded-circle mb-3 mb-md-0 me-md-3"
          style={{ width: "190px", height: "auto", objectFit: "cover" }}
        />

        {/* Content */}
        <div className="card-body text-start p-0">
          <h4 className="card-title">{doctor.doctorName}</h4>

          <p className="mb-1"><strong>Speciality:</strong> {doctor.speciality}</p>
          <p className="mb-1"><strong>Experience:</strong> {doctor.experienceYears} years</p>
          <p className="mb-1"><strong>Consultation Fee:</strong> ₹{doctor.fees}</p>
          <p className="mb-1"><strong>Phone:</strong> {doctor.phone}</p>
          <p className="mb-1"><strong>Location:</strong> {doctor.location}</p>
          <p className="mb-2">
            <strong>Address:</strong> {doctor.address}, {doctor.district}, {doctor.state} - {doctor.pincode}
          </p>

          <div className="text-end">
            <button className="btn btn-primary btn-sm" onClick={bookDoctor}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
