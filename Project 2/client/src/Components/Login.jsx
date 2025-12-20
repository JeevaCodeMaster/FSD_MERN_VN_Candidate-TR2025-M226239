import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8090/auth/login",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        dispatch(login(res.data.token));
        localStorage.setItem("userName", res.data.userName);
        navigate("/home");
      }
    } catch (error) {
      setMsg("Invalid user or password!");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center ">
      <div className="row w-100 justify-content-center align-items-center mx-auto gap-1">

        {/* Image Section (Hidden on Mobile) */}
        <div className="col-lg-6 d-none d-lg-flex justify-content-center">
          <img
            src="/images/loginimage.jpg"
            className="img-fluid rounded"
            alt="doctor with patient"
            style={{ maxHeight: "420px" }}
          />
        </div>

        {/* Login Card */}
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mt-2">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="float-start form-label">
                  Email Address
                </label>
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
                <label className="float-start form-label">
                  Password
                </label>
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

              <button className="btn btn-primary w-100 mt-2" type="submit">
                Login
              </button>
            </form>

            <p className="text-center mt-4 mb-0">
              Don't have an account?{" "}
              <span
                className="text-decoration-none text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>

            {msg && <p className="text-danger mt-3 text-center">{msg}</p>}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
