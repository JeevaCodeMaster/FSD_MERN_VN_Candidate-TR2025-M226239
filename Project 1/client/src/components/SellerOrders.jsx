import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SellerOrder() {
  const sellerId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
    const role = useSelector((state) => state.auth.role);
  const [orders, setOrders] = useState([]);

  const navigate=useNavigate()

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/book/seller-order/${sellerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(res.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(()=>{
    if(!token)
    {
      navigate("/")
    }
  })

 if(token && role=="seller"){
   return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Orders Received</h3>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders yet...</p>
      ) : (
        <div className="table-responsive shadow rounded">
          <table className="table table-bordered table-hover">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>Book Title</th>
                <th>Quantity</th>
                <th>Price (₹)</th>
                <th>Total Amount</th>
                <th>Order Date</th>
                <th>Delivery Date</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.title}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.price}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{new Date(order.deliveryDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
 }
}

export default SellerOrder;
