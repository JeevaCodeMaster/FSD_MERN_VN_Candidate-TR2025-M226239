import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DoctorForm() {
const navigate=useNavigate();
   

    const token =useSelector((state)=>{return state.auth.token})
    const userId =useSelector((state)=>{return state.auth.userId})
    
  const [formData, setFormData] = useState({
    user:userId,
    doctorName: "",
    hospitalName: "",
    fees: "",
    location: "",
    phone: "",
    pincode: "",
    state: "",
    district: "",
    address: "",
    speciality: "",
    
experienceYears: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     

    try {
      
      const res = await axios.post("http://localhost:8090/doctor/add-doc", formData,{headers:{Authorization:`Bearer ${token}`}});
      alert("Doctor details saved successfully!");
navigate("/doc-dash")

    } catch (err) {
      console.error(err);
      alert("Error saving doctor");
    }
  };


  useEffect(()=>{
    if(!token){
navigate("/")
    }
  },)
if(token){
  return (
    <div className="container " style={{marginTop:"7rem",marginBottom:"5rem"}}>
      <div
        className="card shadow p-4"
        style={{ borderRadius: "12px", maxWidth: "900px", margin: "auto" }}
      >
        <h3 className="text-center mb-4  fw-bold">
          Doctor Profile Registration
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* ---------------- LEFT SIDE ---------------- */}
            <div className="col-md-6 border-end">
              <h5 className="fw-bold text-secondary mb-3">Doctor Details</h5>

              <label className="float-start form-label fw-semibold">Doctor Name</label>
              <input
                type="text"
                name="doctorName"
                className="form-control mb-3"
                value={formData.doctorName}
                onChange={handleChange}
                required
              />

              <label className=" float-start form-label fw-semibold">Hospital Name</label>
              <input
                type="text"
                name="hospitalName"
                className="form-control mb-3"
                value={formData.hospitalName}
                onChange={handleChange}
                required
              />

              <label className="float-start form-label fw-semibold">Speciality</label>
              <input
                type="text"
                name="speciality"
                className="form-control mb-3"
                value={formData.speciality}
                onChange={handleChange}
                required
              />

              <label className="float-start form-label fw-semibold">
                Years of Experience
              </label>
              <input
                type="number"
                name="experienceYears"
                className="form-control mb-3"
                value={formData.experienceYears}
                onChange={handleChange}
                required
              />

              <label className="float-start form-label fw-semibold">Consultation Fee (₹)</label>
              <input
                type="number"
                name="fees"
                className="form-control mb-3"
                value={formData.fees}
                onChange={handleChange}
                required
              />

              <label className="float-start form-label fw-semibold">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control mb-3"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <label className="float-start form-label fw-semibold">Bio</label>
              <textarea
                name="bio"
                className="form-control mb-3"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* ---------------- RIGHT SIDE ---------------- */}
            <div className="col-md-6 ps-4">
              <h5 className="fw-bold text-secondary mb-3">Location & Address</h5>

              <label className="float-start form-label fw-semibold">State</label>
              <input
                type="text"
                name="state"
                className="form-control mb-3"
                value={formData.state}
                onChange={handleChange}
                required
              />

              <label className="float-start form-label fw-semibold">District</label>
              <input
                type="text"
                name="district"
                className="form-control mb-3"
                value={formData.district}
                onChange={handleChange}
                required
              />

              <label className="float-start form-label fw-semibold">Pincode</label>
              <input
                type="text"
                name="pincode"
                className="form-control mb-3"
                value={formData.pincode}
                onChange={handleChange}
                required
              />

              <label className="float-start form-label fw-semibold">Location</label>
              <input
                type="text"
                name="location"
                className="form-control mb-3"
                value={formData.location}
                onChange={handleChange}
                required
              />

              <label className="float-start form-label fw-semibold">Full Address</label>
              <textarea
                name="address"
                className="form-control mb-3"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          {/* Submit */}
          <div className="col-12 text-center mt-4">
            <button type="submit" className="btn btn-primary px-4 py-2">
              Save Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}
}




export default DoctorForm;
