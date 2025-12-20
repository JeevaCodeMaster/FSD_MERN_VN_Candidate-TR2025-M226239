import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

function GoogleCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAccess = async () => {
    const code = new URLSearchParams(window.location.search).get("code");

    try {
      const res = await axios.post("http://localhost:8080/auth/google/callback", {
        code,
      },{Headers: { "Content-Type": "application/json"}});
    

      // Store token
      localStorage.setItem("token", res.data.token);

      // Update Redux
      dispatch(login(res.data.token));

      // Navigate home
      navigate("/home");
    } catch (error) {
      console.log("Google login error:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    getAccess();
  }, []);

  return <div>Logging in...</div>;
}

export default GoogleCallback;
