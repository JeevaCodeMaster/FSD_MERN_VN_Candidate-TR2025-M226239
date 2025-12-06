import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

const BuyNowForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const data = location.state;

  const [address, setAddress] = useState("");

  const total = (data.price * 1+21);
 const datahandler=(e)=>{
  setAddress(e.target.value)
 }

console.log(data)
 const confirmOrder = async () => {
  const orderDetail = {
    userId: userId,
    bookId: data._id,
    title: data.title,
    quantity: 1,
    price: data.price,
    totalAmount: total,
    address: address // if backend expects address
  };

  try {
    await axios.post(
      "http://localhost:8080/order/my-orders",
      orderDetail,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Order Placed Successfully!");
    navigate("/Myorders/:id");
  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Order Failed!");
  }
};


  

  return (
    <div className="container  pt-4" style={{ marginTop: "8rem",paddingTop:"150px", marginBottom:"80px" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">

          <div className="card shadow-lg border-0 p-3">
            <h3 className="text-center mb-3">Checkout</h3>
            <hr />

            {/* IMAGE */}
            <div className="text-center mb-3">
              <img
                src={data.image}
                alt={data.title}
                className="img-fluid rounded"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
            </div>

            {/* BOOK DETAILS */}
            <p><strong>Book:</strong> {data.title}</p>
            <p><strong>Price:</strong> ₹{data.price} + <span className="text-muted">₹21 (Delivery)</span></p>
            <p><strong>Quantity:</strong> 1</p>

            <h5 className="mt-3 mb-3 text-success">
              <strong>Total Amount:</strong> ₹{total.toFixed(2)}
            </h5>

            {/* ADDRESS */}
            <label className="form-label mt-3"><strong>Delivery Address</strong></label>
            <textarea
              className="form-control"
              placeholder="Enter your full delivery address"
              value={address}
              onChange={(e) => datahandler(e)}
              rows="4"
            ></textarea>

            {/* BUTTON */}
            <button
              className="btn btn-primary w-100 mt-4 py-2"
              onClick={confirmOrder}
              disabled={!address.trim()}
            >
              Confirm Order
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BuyNowForm;
