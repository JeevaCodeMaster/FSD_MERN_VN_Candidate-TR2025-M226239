import React, { useEffect, useState, } from "react";
import axios from "axios";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const tokenDispatch = useDispatch();
  const navigate=useNavigate()

 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res =await axios.post("http://localhost:8090/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });
     

      if (res.data != 0) {
        setMsg(res.data.msg || "successfully login!");
       
      }
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        tokenDispatch(login(res.data.token))
        localStorage.setItem("userName", res.data.userName);
        navigate("/home")
        
      }
      
    } catch (error) {
      setMsg("Invalid user or password!");
      console.log(error);
    }
  };

  useEffect(()=>{
    
  })

  return (
    <div className="container d-flex justify-content-center gap-5 align-items-center vh-100">
      
      
      <div><img src="/images/loginimage.jpg" className="rounded" alt="doctor with patient" /></div>
      <div className="card shadow p-4" style={{ width: "360px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
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

          {/* Button */}
          <button className="btn btn-primary w-100 mt-2" type="submit">
            Login
          </button>
        </form>

        <p className="text-center mt-4 mb-0" >
          Don't have an account?{" "}
          <a  onClick={()=>{navigate("/register")}} className="text-decoration-none">
            Register
          </a>
        </p>
        {<p className="text-success mt-4">{msg}</p>}
      </div>
    </div>
  );
}

export default Login;
