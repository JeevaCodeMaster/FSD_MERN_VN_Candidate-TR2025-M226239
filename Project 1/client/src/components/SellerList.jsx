import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SellerList() {

  const [users, setUsers] = useState([]);

  const token =useSelector((state)=>{return state.auth.token})
  const role =useSelector((state)=>{return state.auth.role})
    const navigate= useNavigate()
  const getUsers = async () => {
    try {
        const role="seller";
      const res = await axios.get(`http://localhost:8080/user/get-user/${role}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.allUser);
     
    } catch (err) {
      
    }
  };
  const deleteUsers = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/user/delete-user/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("user deleted! ")
     
    } catch (err) {
     
    }
  };

  useEffect(() => {
    getUsers();
  }, );


useEffect(()=>{if(!token){
navigate("/")
}})

  if(token && role=='admin'){
    return (
    <div className="container mt-4" style={{paddingTop:"100px",paddingBottom:"100px"}}>
      <h2 className="text-center mb-4">Seller List (Admin Panel)</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined At</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5">No Users Found</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td className="text-start p-3">{user.name || "N/A"}</td>
                  <td className="text-start p-3">{user.email}</td>
                  <td>{user.role || "user"}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td><button className="bg-danger text-white" onClick={()=>{deleteUsers(user._id)}}>Delete</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  }
}

export default SellerList;
