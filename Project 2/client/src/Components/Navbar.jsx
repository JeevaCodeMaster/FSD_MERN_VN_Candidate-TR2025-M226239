import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const role = useSelector((state) => {
    return state.auth.role;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name=localStorage.getItem("userName")

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  if (token && role == "user") {
    return (
      <nav className="navbar sticky-top navbar-expand-lg bg-info p-3">
        <div className="container-fluid w-100">
          <a className="navbar-brand text-white ms-3" href="#">
            {name.toUpperCase()}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {token && role=="user" &&
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="float-right ms-auto">
            <button
              className="btn bg-dark me-2 text-white"
              onClick={() => {
                navigate("/home")
              }}
            >
              Doctors
            </button>
            <button
              className="btn bg-dark me-2 text-white"
              onClick={() => {
                navigate("/user-app")
              }}
            >
              Appointments
            </button>
            <button
              className="btn bg-danger text-white"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </button>
          </div>
          </div>
          
          
          }
        </div>
      </nav>
    );
  } else if (token && role == "doctor") {
    return (
      <nav className="navbar navbar-expand-lg fixed-top bg-info">
        {token && role=="doctor"  && <div className="container-fluid">
          <a className="navbar-brand text-white fs-1 ms-3" href="#">
            Dr {name}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
            <div className="ms-auto me-2">

              
              <button
              className="btn bg-dark me-2 text-white"
              onClick={() => {
                navigate("/doc-dash");
              }}
            >
              All Appointments
            </button>
              {" "}
              <button
                className="btn bg-danger text-white"
                onClick={() => {
                  dispatch(logout());
                  navigate("/")
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>}
      </nav>
    );
  }
  
  else if(token && role=="admin"){
    return (
      <nav className="navbar navbar-expand-lg sticky-top bg-success" style={{opacity:"0.7"}}>
        {token && role=="admin"  && <div className="container-fluid">
          <a className="navbar-brand text-white fs-2 ms-5" href="#">
            Admin 
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
            <div className="ms-auto me-4">
              <button
              className="btn bg-dark me-2 text-white"
              onClick={() => {
                navigate("/admin-dash")
              }}
            >
              Appointment List
            </button>
              
              <button
              className="btn bg-dark me-2 text-white"
              onClick={() => {
                navigate("/userl")
              }}
            >
              Users
            </button>
              
              <button
              className="btn bg-dark me-2 text-white"
              onClick={() => {
                navigate("/doctorl")
              }}
            >
              Doctor
            </button>
              {" "}
              <button
                className="btn bg-danger text-white"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>}
      </nav>
    );
  }
  
  
  
  else {
    return (
      <nav className="navbar navbar-expand-lg fixed-top bg-secondary ">
        {!token && <div className="container-fluid">
          <a className="navbar-brand text-white fs-1 ms-3" href="#">
            Doctor Appointment
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto">
              <Link to="/" className="btn bg-primary text-white me-3">
                Login
              </Link>
              <Link to="/register" className="btn bg-info text-white me-3">
                Register
              </Link>
            </div>
          </div>
        </div>}
      </nav>
    );
  }
}

export default Navbar;
