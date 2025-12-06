import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const id =useSelector((state)=>{return state.auth.userId})
const navigate=useNavigate();
  const fetchOrders = async () => {
    const res = await axios.get(`http://localhost:8080/order/get-order/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(res.data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
   if(!token){
     navigate("/")
   }
  }, );

  return (
    <div className=" d-flex flex-column align-items-center mx-auto " 
    style={{marginTop:"100px",marginBottom:"100px"}}>
    
    <h1 className="mb-4">My Orders</h1>
    <div className="container">
      <div className="row justify-content-center text-start">
        <div className="d-flex flex-wrap text-start w-100">
      

      {orders.map((item, i) => (
        
        <div key={i}  className="
                col-12 col-sm-10 
                col-md-6 col-lg-4 
                col-xl-3 col-xxl-3
                d-flex
              " >
            <div className="m-2 p-3 border shadow-lg rounded w-100">
              <h4>Order: {i+1}</h4>
            <hr/>
          
           <ul key={i}>
             <p key={i}>
              Book :{item.title}   
            </p>
            <p>Quantity : {item.quantity}</p>
            <p>price :  ₹{item.price}</p>
           </ul>
          
          <p><b>Order Date:</b> {new Date(item.orderDate).toDateString()}</p>
          <p><b>Delivery Date:</b> {new Date(item.deliveryDate).toDateString()}</p>
          <p><b>Total Amount:</b> ₹{item.totalAmount.toFixed(2)}</p>

 </div>         
        </div>
      ))}
    </div>
      </div>
    </div>
    </div>
  );
};

export default Myorders;
