import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyProduct() {
  const [books, setBooks] = useState([]);
  const navigate=useNavigate()

  const token = useSelector((state) =>{return state.auth.token});
  const sellerId = useSelector((state) =>{return state.auth.userId});
  const role = useSelector((state) =>{return state.auth.role});

  // Fetch books added by this seller
  const loadMyProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/book/my-products/${sellerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBooks(res.data.books || []);
    } catch (err) {
      console.log("Error loading products:", err);
    }
  };

  const deleteproduct =async (id)=>{
    try {
        const res = axios.delete(`http://localhost:8080/book/delete-book/${id}`,
            {headers:{Authorization: `Bearer ${token}`,}}
        )
        alert(`book removed !`)
            setBooks((prevBooks) => prevBooks.filter((b) => b._id !== id));
        
    } catch (error) {
        alert("not able to delete your product",error)
    }
  }

  useEffect(() => {
    loadMyProducts();
   
  },[]);
   useEffect(() => {
   if(!token ){
    return (
        navigate("/")
    )
   }
   
  },);
 


 if(token && role=="seller"){
    return (
    <div className="container  pt-4 mb-5" style={{marginTop:"5rem"}}>
      <h2 className="text-center mb-4">My Products</h2>

      {books.length === 0 ? (
        <h4 className="text-center text-muted">No books added yet.</h4>
      ) : (
        <div className="row g-3">
          {books.map((book) => (
            <div  className="
                  col-12 
                  col-sm-6 
                  col-md-4 
                  col-lg-4 
                  col-xl-3 
                  col-xxl-3
                " key={book._id}>
              <div className="card w-100 shadow-sm h-100">
                <img
                  src={book.image}
                  className="card-img-top"
                  alt={book.title}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="text-muted">Author: {book.author}</p>
                  <p>Price: ₹{book.price}</p>
                  <p>Stock: {book.stock}</p>

                  <button className="btn btn-danger w-100 mt-2" onClick={()=>{deleteproduct(book._id)}}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  }
  
  
}

export default MyProduct;
