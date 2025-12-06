import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [carts, setCarts] = useState({ items: [], totalPrice: 0 });
  const navigate = useNavigate();

  const token = useSelector((state) => {
    return state.auth.token;
  });

  const id = useSelector((state) => {
    return state.auth.userId;
  });

  const getCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/cart/get-cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCarts(res.data.cart);
    } catch (err) {
      console.log(err);
      alert("Error loading cart");
    }
  };

  const getMyorder = (book) => {
    navigate("/buy", { state: book });
  };

  const deleteCartItem = async (bookId) => {
    try {
      const result = await axios.delete(
        `http://localhost:8080/cart/deleteCart/${id}/${bookId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (result) {
        alert("successfully deleted !");
        setCarts((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item._id !== bookId),
        totalPrice: prev.totalPrice - (prev.items.find(i => i._id === bookId)?.price || 0)
      }));
      }
    } catch (error) {
      alert("Not able to deleted !");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {}, [carts]);

    useEffect(() => {});

  

  if (carts.items.length==0) {return (<h2>Your Cart is Empty</h2>)};

  return (
    <div className="mb-5  " style={{paddingTop: "1rem",marginTop:"5rem"}}>
      <div
        className="cart-grid"
    style={{
      display: "grid",
    padding: "1rem",
    
    gap: "1rem",
    justifyContent: "center",      
    gridTemplateColumns: `
      repeat(auto-fit, minmax(320px, 1fr))
    `,
    maxWidth: "1200px",             
    margin: "1rem auto"
    }}
      >
        {carts.items.map((item, index) => (
          <div
            className=" mx-auto   p-3 text-start shadow-lg"
        key={index}
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          width: "100%",           
          maxWidth: "380px"        
        }}
          >
            <h3>Title :{item.title}</h3>
            <p>Author: {item.author}</p>
            <p>Category: {item.category}</p>
            <p>Price: ₹{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ₹{item.price * item.quantity}</p>
            <div className="d-flex gap-2">
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteCartItem(item._id);
                }}
              >
                Remove
              </button>
              <button
                className="btn bg-black text-white"
                onClick={() => {
                  getMyorder(item);
                }}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>

      
      
    </div>
  );
};

export default Cart;
