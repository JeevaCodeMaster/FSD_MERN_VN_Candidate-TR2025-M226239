import React, { useEffect } from "react";
import DoctorCard from "./DoctorCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DoctorList({ doctor }) {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="container my-4">
      <div className="row g-4 justify-content-center">
        {doctor
          ?.filter((docs) => docs.isApproved === "approved")
          .map((doc, index) => (
            <div
              className="col-12 col-md-10 col-lg-6"
              key={index}
            >
              <DoctorCard doctor={doc} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default DoctorList;
