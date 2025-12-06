import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone:"",
    role: "user",
  });

  const navigate =useNavigate()
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Register Data:", form);

    try {
      const res =await axios.post("http://localhost:8090/auth/register", form);
console.log(res)
     
        setMsg(res.data.msg || "registered successfully!");
        
      
    } catch (error) {
     
      setMsg("please provide all details");
       console.log(error);
    }
  };

  return (
    <div className="container d-flex   justify-content-center gap-3 align-items-center " style={{marginTop:"7rem",marginBottom:"7rem"}}>
      
      <div className=" card shadow p-4" style={{ width: "420px" }}>
        <h3 className="text-center mb-4">Create Account</h3>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="float-start form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="float-start form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="float-start form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          {/* number */}
            <div className="mb-3">
            <label className="float-start form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="Enter your phone no"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-3">
            <label className="float-start form-label">Register As</label>
            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Button */}
          <button className="btn btn-primary w-100 mt-2" type="submit">
            Register
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <a onClick={()=>{navigate("/")}} className="text-decoration-none">
            Login
          </a>
          
        </p>
        {msg && <p>{msg}</p>}
      </div>
            <div><img src="/images/registerimage.png" alt="registration image" style={{borderRadius:"1rem",display:"flex",width:"700px",height:"500px"}} /></div>

    </div>
  );
}

export default Register;
