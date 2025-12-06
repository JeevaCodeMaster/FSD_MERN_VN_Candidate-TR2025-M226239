import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => {
    return state.auth.token;
  });

  const navigate=useNavigate();


  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8090/user/get-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.allUser);
    } catch (err) {
      console.log(err);
      alert("Failed to load users");
    }
  };

  // Delete user (optional)
  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:8090/user/delete-user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.statusText == "OK") {
        fetchUsers();
        alert("User deleted successfully");
      }
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
 useEffect(() => {
    if(!token){
        navigate("/")
    }
  },);
  return (
    <div className="container mt-5">
      <h2 className="mb-4">User List</h2>

      <table className="table table-striped table-bordered shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users
            .filter((user) => {
              return user.role == "user";
            })
            .map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td className="mx-auto text-start">{user.name}</td>

                <td className="text-start">{user.email}</td>

                <td>
                  <span className="badge bg-info">{user.role}</span>
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
