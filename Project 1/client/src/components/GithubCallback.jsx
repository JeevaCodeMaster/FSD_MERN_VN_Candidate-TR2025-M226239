import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GithubCallback() {
  const navigate = useNavigate();



  const getgithAccess =async()=>{
    const code = new URLSearchParams(window.location.search).get("code");

    try  {
      const res=await axios.get(`http://localhost:8080/auth/github/callback?code=${code}`)
       
          localStorage.setItem("token", res.data.token);
          navigate("/home");
    }
    catch(error){
      
    }
  }


  useEffect(() => {
    getgithAccess()
  }, []);

  return <div>Logging in with GitHub...</div>;
}

export default GithubCallback;
