import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserList() {

  const [users, setUsers] = useState([]);
const navigate =useNavigate()
  const token =useSelector((state)=>{return state.auth.token})
  const role =useSelector((state)=>{return state.auth.role})

  const getUsers = async () => {
    try {
        const role="buyer";
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

useEffect(()=>{
    if(!token ){
    navigate("/")
}
})

 if(token && role=="admin"){
  return (
      <div className="container mt-4" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <h2 className="text-center mb-4">Seller List (Admin Panel)</h2>

        {/* RESPONSIVE WRAPPER */}
        <div className="table-responsive-sm table-responsive-md table-responsive-lg">
          <table className="table table-bordered table-hover text-center align-middle">

            <thead className="table-dark">
              <tr>
                <th className="px-2 px-sm-3">S.No</th>
                <th className="px-2 px-sm-3">User Name</th>
                <th className="px-2 px-sm-3">Email</th>
                <th className="px-2 px-sm-3">Role</th>
                <th className="px-2 px-sm-3">Joined At</th>
                <th className="px-2 px-sm-3">Delete</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6">No Users Found</td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>

                    {/* TEXT wraps properly on small screens */}
                    <td className="text-start p-2 p-sm-3">{user.name || "N/A"}</td>
                    <td className="text-start p-2 p-sm-3">{user.email}</td>

                    <td>{user.role || "user"}</td>

                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm w-100 w-sm-auto"
                        onClick={() => deleteUsers(user._id)}
                      >
                        Delete
                      </button>
                    </td>
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

export default UserList;
