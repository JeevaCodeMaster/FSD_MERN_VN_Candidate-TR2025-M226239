import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {login} from "../redux/authSlice"
import {useDispatch} from "react-redux"


function Login() {

  
  
  const navigate = useNavigate();
const tokenDispatch=useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:8080/user/login`, user ,{
    headers: { "Content-Type": "application/json" }
  });
     
      if(res.data!==0){
        setMsg("Login successful!");
      }

      // Save token (if your backend sends token)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        tokenDispatch(login(res.data.token))
        navigate("/home")
      }

      // Navigate to Dashboard or Home
    //   navigate("/");
    } catch (err) {
      setMsg("Invalid email or password");
      console.log(err);
      
      
    }
  };

  return (
    <div style={{   
    width: "auto",
    height:"100vh",
    backgroundImage: "url('/images/image.png') ",
    backgroundSize: "cover",
    backgroundPosition: "center", 
    display: "flex",
    justifyContent: "center",   // horizontal center
    alignItems: "center",
    marginBottom:"100px"
  }}>
    <div className="row w-100 justify-content-center">
       <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 col-xxl-3">
      <div style={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={user.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={user.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      <p className="mt-3">for registration ? <span className="text-info" onClick={()=>{navigate("/register")}}>Register here</span></p>

      {msg && <p style={styles.message}>{msg}</p>}
    </div></div></div>
    
    
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "40px auto",
    padding: "25px 25px 45px 25px",
    borderRadius: "10px",
    boxShadow: "0 0 10px #ccc",
    textAlign: "center",
    backgroundColor:"white"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    border: "1px solid gray",
    borderRadius: "5px",
  },
  button: {
    padding: "12px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "10px",
    color: "green",
    fontWeight: "bold",
  },
};

export default Login;
