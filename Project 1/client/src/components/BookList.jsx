import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import BuyNowForm from "./BuyNowForm";

function BookList() {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState("Author");

  const navigate = useNavigate();
  const token = useSelector((state) => {
    return state.auth.token;
  });

  const role = useSelector((state) => {
    return state.auth.role;
  });

  const loadBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/book/get-book", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(res.data.allbook);
    } catch (err) {
      console.log("Error fetching books", err);
    }
  };

  const addToCart = async (bookId) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/cart/addcart",
        { bookId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.msg);
    } catch (err) {
      console.log(err);
      alert("Failed to add to cart");
    }
  };

  const authorName = (e) => {
    setAuthor(e.target.value);
  };

  const searchBooks = async (e) => {
    e.preventDefault();

    // If search box is empty → load all books
    if (!author.trim()) {
      loadBooks();
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/book/search/${author}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooks(res.data.books)
      console.log(res.data.books);
    } catch (err) {
      console.log(err);
      alert("No books found");
    }
  };

 

  const getMyorder = (book) => {
    navigate("/buy", { state: book });
  };

  const deleteBook = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/book/delete-book/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        alert("book remove Successfully!");
        setBooks((prevBooks) => prevBooks.filter((b) => b._id !== id));
      }
    } catch (err) {
      alert("not able to remove!",err.message);
    }
  };
 useEffect(() => {
    loadBooks();
  }, []);
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  if (token && books != 0 && role == "buyer") {
    return (
      <>
        <form
          className="d-flex align-items-center justify-content-center "
          style={{ marginTop: "7rem", marginBottom: "2rem" }}
          role="search"
          onSubmit={searchBooks}
        >
          <input
            className="form-control me-2 w-25"
            type="search"
            placeholder="Author"
            onChange={authorName}
          />
          <button
            className="btn border  text-white outline-info bg-info px-4 me-2"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="container">
          <div className="row">
            {/*{style={styles.grid}} */}{" "}
            {books.map((book, index) => {
              return (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <div style={styles.card}>
                    {" "}
                    <img
                      src={
                        book.image.startsWith("http")
                          ? book.image
                          : `http://localhost:8080/uploads/${book.image}`
                      }
                      alt={book.title}
                      style={styles.image}
                    />{" "}
                    <p className="fw-bold mt-4">Title : {book.title}</p>{" "}
                    <p>Author : {book.author}</p> <p>Price: ₹{book.price}</p>{" "}
                    <p>Stock : {book.stock}</p>{" "}
                    <div className="d-flex gap-2 ">
                      <button
                        className="bg-black text-white py-2"
                        onClick={() => {
                          addToCart(book._id);
                        }}
                      >
                        {" "}
                        Cart{" "}
                      </button>
                      <button
                        className="bg-black text-white py-2"
                        onClick={() => {
                          getMyorder(book);
                        }}
                      >
                        {" "}
                        Buy{" "}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}{" "}
          </div>
        </div>
      </>
    );
  } else if (token && role == "seller" && books != 0) {
    return (
      <>
        <form
          className="d-flex align-items-center justify-content-center "
          style={{ marginTop: "7rem", marginBottom: "2rem" }}
          role="search"
          onSubmit={searchBooks}
        >
          <input
            className="form-control me-2 w-25"
            type="search"
            placeholder="Author"
            onChange={authorName}
          />
          <button
            className="btn border  text-white outline-info bg-info px-4 me-2"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="container">
          <div className="row">
            {/*{style={styles.grid}} */}{" "}
            {books.map((book, index) => {
              return (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <div style={styles.card}>
                    {" "}
                    <img
                      src={book.image}
                      alt={book.title}
                      style={styles.image}
                    />{" "}
                    <p className="fw-bold mt-4">Title : {book.title}</p>{" "}
                    <p>Author : {book.author}</p> <p>Price: ₹{book.price}</p>{" "}
                    <p>Stock : {book.stock}</p>{" "}
                  </div>
                </div>
              );
            })}{" "}
          </div>
        </div>
      </>
    );
  } else if (token && role == "admin" && books != 0) {
    return (
      <div style={{ paddingTop: "100px" }}>
        <h2 className="text-center mb-4">Book List (Admin Panel)</h2>
        <form
          className="d-flex align-items-center justify-content-center "
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
          role="search"
          onSubmit={searchBooks}
        >
          <input
            className="form-control me-2 w-25"
            type="search"
            placeholder="Author"
            onChange={authorName}
          />
          <button
            className="btn border  text-white outline-info bg-info px-4 me-2"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="container">
          <div className="row">
            {/*{style={styles.grid}} */}{" "}
            {books.map((book, index) => {
              return (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <div style={styles.card}>
                    {" "}
                    <img
                      src={book.image}
                      alt={book.title}
                      style={styles.image}
                    />{" "}
                    <p className="fw-bold mt-4">Title : {book.title}</p>{" "}
                    <p>Author : {book.author}</p> <p>Price: ₹{book.price}</p>{" "}
                    <p>Stock : {book.stock}</p>{" "}
                    <div className="d-flex gap-2  text-center ">
                      <button
                        className="text-danger w-100 bg-black"
                        onClick={() => {
                          deleteBook(book._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}{" "}
          </div>
        </div>
      </div>
    );
  } else {
    return <h1 className="text-center">Loading...</h1>;
  }
}

const styles = {
  page: {
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    padding: "20px",
    // backgroundColor: "black",
    width: "100%",
  },
  card: {
    padding: "15px",
    borderRadius: "10px",
    height: "650px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
    background: "white",
    textAlign: "start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "22rem",
    objectFit: "fill",
    borderRadius: "8px",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",

    background: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default BookList;
