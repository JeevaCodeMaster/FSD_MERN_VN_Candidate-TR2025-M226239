import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const tokenDispatch = useDispatch();
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
      const res = await axios.post(`http://localhost:8080/auth/login`, user, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data !== 0) {
        setMsg("Login successful!");
      }

      // Save token (if your backend sends token)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        tokenDispatch(login(res.data.token));
        navigate("/home");
      }

      // Navigate to Dashboard or Home
      //   navigate("/");
    } catch (err) {
      setMsg("Invalid email or password");
      console.log(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await axios.get("http://localhost:8080/auth/google");
      window.location.href = res.data.url;
    } catch (error) {
      alert(error);
    }
  };

  const handleGithubLogin=async()=>{
    try{
      const githubRes = await axios.get("http://localhost:8080/auth/github");
      window.location.href=githubRes.data.url;
    }
    catch(error){
      console.log(error)
    }

  }

  return (
    <div
      style={{
        width: "auto",
        height: "100vh",
        backgroundImage: "url('/images/image.png') ",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        // justifyContent: "center", 
        alignItems: "center",
        marginBottom: "100px",
        marginTop: "100px",
      }}
    >
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

            <div className="mt-3 g-3">
              <svg
                onClick={handleGoogleLogin}
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                style={styles.icon}
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" style={styles.icon} viewBox="0 0 48 48">
<path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
</svg>
<img src="/icons8-github-32.png" onClick={handleGithubLogin} style={styles.icon} alt="github" />
            </div>
            <p className="mt-3">
              for registration ?{" "}
              <span
                className="text-info "
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register here
              </span>
            </p>

            {msg && <p style={styles.message}>{msg}</p>}
          </div>
        </div>
      </div>
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
    backgroundColor: "white",
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
  icon: {
    width: "25px",
    height: "25px",
    boxShadow: "0 0 10px #ccc",
    borderRadius: "5px",
    marginRight:"20px",
    cursor: "pointer",
  
  },
};

export default Login;
