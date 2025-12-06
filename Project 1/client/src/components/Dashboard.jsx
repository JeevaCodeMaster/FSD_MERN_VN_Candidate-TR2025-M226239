

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const Dashboard = () => {

    const navigate=useNavigate()
    const token =useSelector((state)=>{return state.auth.token})
    const role =useSelector((state)=>{return state.auth.role})
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalBooks: 0,
    totalOrders: 0,
  });

  const getStats = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/dashboard",
        {headers:{
            Authorization:`Bearer ${token}`,
        }}
      );
      setStats(res.data);
    } catch (err) {
      console.log("Error loading dashboard data", err);
    }
  };

  useEffect(() => {
    getStats();
  }, []);


  const userPieData = {
    labels: ["Users", "Sellers"],
    datasets: [
      {
        data: [stats.totalUsers, stats.totalSellers],
        backgroundColor: ["#007bff", "#28a745"],
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart → Books & Orders
  const barData = {
    labels: ["Books", "Orders"],
    datasets: [
      {
        label: "Count",
        data: [stats.totalBooks, stats.totalOrders],
        backgroundColor: ["#ffc107", "#dc3545"],
      },
    ],
  };

if(!token ){
    navigate("/")
}

  if(token && role=="admin" ){
    return (
    <div className="container mt-4" style={{paddingTop:"100px",paddingBottom:"100px"}}>
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="row g-4 mb-4">
  {/* Users */}
  <div className="col-md-3 col-6">
    <div
      className="card p-3 shadow-sm rounded text-center"
      style={{
        borderLeft: "5px solid #0d6efd",
        background: "#fff",
      }}
    >
      <h5 className="mb-1">Total Users</h5>
      <h3 style={{ color: "#0d6efd" }}>{stats.totalUsers}</h3>
    </div>
  </div>

  {/* Sellers */}
  <div className="col-md-3 col-6">
    <div
      className="card p-3 shadow-sm rounded text-center"
      style={{
        borderLeft: "5px solid #198754",
        background: "#fff",
      }}
    >
      <h5 className="mb-1">Total Sellers</h5>
      <h3 style={{ color: "#198754" }}>{stats.totalSellers}</h3>
    </div>
  </div>

  {/* Books */}
  <div className="col-md-3 col-6">
    <div
      className="card p-3 shadow-sm rounded text-center"
      style={{
        borderLeft: "5px solid #ffc107",
        background: "#fff",
      }}
    >
      <h5 className="mb-1">Total Books</h5>
      <h3 style={{ color: "#ffc107" }}>{stats.totalBooks}</h3>
    </div>
  </div>

  {/* Orders */}
  <div className="col-md-3 col-6">
    <div
      className="card p-3 shadow-sm rounded text-center"
      style={{
        borderLeft: "5px solid #dc3545",
        background: "#fff",
      }}
    >
      <h5 className="mb-1">Total Orders</h5>
      <h3 style={{ color: "#dc3545" }}>{stats.totalOrders}</h3>
    </div>
  </div>
</div>

      <div className="row mt-5">
      
        <div className="col-md-6 col-12 mb-4 mx-auto ">
          <div className="shadow p-3 rounded">
            <h5 className="text-center">Users vs Sellers</h5>
            <Pie data={userPieData} />
          </div>
        </div>

       
        <div className="col-md-6 col-12 mb-4 w-100 " >
          <div className="shadow p-3 rounded ">
            <h5 className="text-center">Books & Orders Overview</h5>
            <Bar data={barData}  className=""/>
          </div>
        </div>
      </div>
    </div>
  );
  }
};




export default Dashboard
