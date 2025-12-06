import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DoctorAList() {
  const [doctors, setDoctors] = useState([]);
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const navigate = useNavigate();
  const DocotrUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8090/doctor/get-docs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data.Doctor);
     
    } catch (err) {
      console.log(err);
      alert("Failed to load users");
    }
  };


  const doctorApprove = async (userId, allow) => {
    if (!window.confirm("Are you sure you want to approve this doctor?"))
      return;

    try {
      const res = await axios.patch(
        `http://localhost:8090/doctor/up-doc/${userId}/${allow}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (res.statusText == "OK") {
        DocotrUsers();
        alert(res.data.msg);
      }
    } catch (err) {
      console.log(err);
      alert("Not approved");
    }
  };

   const deleteDoctor = async (userId) => {
    if (!window.confirm("Are you sure you want to remove doctor?"))
      return;

    try {
      const res = await axios.delete(
        `http://localhost:8090/doctor/delete-doc/${userId}`,
        
        { headers: { Authorization: `Bearer ${token}` } }
      );
     
      if (res.statusText == "OK") {
        DocotrUsers();
        alert(res.data.msg);
      }
    } catch (err) {
      console.log(err);
      alert("Not remove");
    }
  };


  useEffect(() => {
    DocotrUsers();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Doctor List</h2>

      <table className="table table-striped table-bordered shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>

            <th>Speicalization</th>
            <th>Phone</th>
            <th>Action</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((user, index) => (
            <tr key={index}>
              <td className="w-25 text-start">{user._id}</td>

              <td className="mx-auto text-start">{user.doctorName}</td>

              <td>{user.speciality}</td>
              <td>
                <span>{user.phone}</span>
              </td>

              <td className=" ">
                <div className=" mx-1 d-flex gap-2">
                  {user.isApproved === "pending" && (
                    <>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => doctorApprove(user.user, "approved")}
                      >
                        Approved
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => doctorApprove(user.user, "reject")}
                      >
                        Reject
                      </button>
                      
                    </>
                  )}{ user.isApproved=="approved"&& <p className="text-white bg-success mt-2 border p-2 rounded ">{user.isApproved}</p>}
                  { user.isApproved=="reject"&& <p className="text-white bg-danger mt-2 border p-2 rounded ">{user.isApproved}</p>}
                </div>
              </td>
              <td>
                <div>
                    <button className="bg-danger mt-2 text-white" onClick={()=>{deleteDoctor(user._id)}}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorAList;
