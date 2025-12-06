import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    stock: "",
    description: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const sellerId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(book).forEach((key) => formData.append(key, book[key]));
      formData.append("image", image);
      formData.append("sellerId", sellerId);

      const res = await axios.post(
        "http://localhost:8080/book/add-book",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.msg);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Failed to add the book");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  if (!token) return null;

  return (
    <div className="container py-5" style={{marginTop:"100px", paddingTop: "110px" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">

          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Add New Book</h3>

            <form onSubmit={handleSubmit}>
              
              {/* Title */}
              <div className="mb-3">
                <label className="float-start form-label fw-bold">Book Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Enter book title"
                  value={book.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Author */}
              <div className="mb-3">
                <label className="float-start form-label fw-bold">Author</label>
                <input
                  type="text"
                  name="author"
                  className="form-control"
                  placeholder="Enter author name"
                  value={book.author}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Price */}
              <div className="mb-3">
                <label className="float-start form-label fw-bold">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Enter price"
                  value={book.price}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="float-start form-label fw-bold">Category</label>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  placeholder="Ex: Fiction, Drama, Education"
                  value={book.category}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Stock */}
              <div className="mb-3">
                <label className="float-start form-label fw-bold">Stock</label>
                <input
                  type="number"
                  name="stock"
                  className="form-control"
                  placeholder="Enter stock quantity"
                  value={book.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="float-start form-label fw-bold">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  placeholder="Enter book description"
                  rows="3"
                  value={book.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="float-start form-label fw-bold">Book Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </div>

              {/* Preview */}
              {preview && (
                <div className="text-center mb-3">
                  <img
                    src={preview}
                    alt="Preview"
                    className="img-fluid rounded shadow"
                    style={{
                      width: "150px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              {/* Submit Button */}
              <button className="btn btn-dark w-100 py-2" type="submit">
                Add Book
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddBook;
