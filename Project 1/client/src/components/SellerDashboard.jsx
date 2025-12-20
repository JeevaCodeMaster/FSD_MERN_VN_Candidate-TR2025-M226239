import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SellerDashboard() {
  const sellerId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const navigate=useNavigate()

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/book/seller/stats/${sellerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setChartData(res.data.result))
      .catch((err) => console.log(err));
  }, [sellerId, token]);

  // SUMMARY VALUES
  const totalBooks = chartData.length;
  const totalOrders = chartData.reduce((sum, item) => sum + item.orders, 0);

  const data = {
  labels: ["Books Added", "Orders Received"],
  datasets: [
    {
      label: "Seller Statistics",
      data: [totalBooks, totalOrders],
      backgroundColor: [
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 193, 7, 0.8)"
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 193, 7, 1)"
      ],
      borderWidth: 1
    }
  ]
};


  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Books & Orders Overview"
      }
    }
  };

  useEffect(()=>{
    if(!token){
        navigate("/")
    }
  })

 if(token && role=="seller"){
     return (
    <div className="container mt-xs-1 mt-5 text-center mb-5">

      {/* TOP SUMMARY CARDS */}
      <div className="container">
        <div className="row mb-4 justify-content-center gap-3">

        <div className=" col-sm-6 col-md-3">
          <div className="card shadow-sm p-3" style={{ borderLeft: "5px solid #007bff" }}>
            <h5>Total Books Added</h5>
            <h2 className="text-primary">{totalBooks}</h2>
          </div>
        </div>

        <div className=" col-sm-6 col-md-3">
          <div className="card shadow-sm p-3" style={{ borderLeft: "5px solid #ffc107" }}>
            <h5>Total Orders Received</h5>
            <h2 className="text-warning">{totalOrders}</h2>
          </div>
        </div>

      </div>
      </div>

      {/* CHART SECTION */}
      <div className="col-md-6 col-12 mx-auto col-xs-12 col-xl-6">
        <div >
        <Bar data={data} options={options} />
      </div>
      </div>
    </div>
  );
 }
}

export default SellerDashboard;
