import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate=useNavigate()

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
      const res = await axios.post("http://localhost:8080/user/register", user);
      setMsg(res.data.msg || "Registered successfully!");
    } catch (err) {
      setMsg("Registration failed. Try again.");
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
    paddingTop:"110px",
    display: "flex",
    justifyContent: "center",   // horizontal center
    alignItems: "center",}} >
       <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">
         <div style={styles.container}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit} style={styles.form} className="">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={user.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

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

        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Select Role</option>
          <option value="seller">Seller</option>
          <option value="buyer">Buyer</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" style={styles.button}>Register</button>
      </form>
    <p className="mt-3 ">already sign up ?<span className="text-info cursor-pointer" onClick={()=>{navigate("/")}}>Login</span></p>
      {msg && <p style={styles.message}>{msg}</p>}
     
    </div>
       </div>
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px #ccc",
    textAlign: "center",
    backgroundColor:"white"
    
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    margin:"40px auto "
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

export default Register;
