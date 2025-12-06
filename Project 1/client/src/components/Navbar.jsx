import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useSelector((state) => {
    return state.auth.role;
  });
  const userId = useSelector((state) => {
    return state.auth.userId;
  });
  const token = useSelector((state) => {
    return state.auth.token;
  });

  if (token && role === "buyer") {
    return (
      <nav className="navbar navbar-expand-lg p-3 fixed-top bg-body-tertiary">
        <div className="container-fluid">

          <a className="navbar-brand fs-4" href="#">
            Get your Book!
          </a>

          {/* Bootstrap hamburger */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#buyerNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="buyerNav">
         

            <div className="d-flex flex-column flex-lg-row ms-auto gap-3 mt-2 mt-lg-0">

              {role === "buyer" && (
                <>
                  <button
                    type="button"
                    className="border bg-black text-white px-3"
                    onClick={() => navigate("/home")}
                  >
                    Home
                  </button>

                  <button
                    type="button"
                    className="border bg-black text-white px-3"
                    onClick={() => navigate(`/cart/${userId}`)}
                  >
                    Cart
                  </button>

                  <button
                    type="button"
                    className="border bg-black text-white px-3"
                    onClick={() => navigate(`/Myorders/${userId}`)}
                  >
                    Orders
                  </button>
                </>
              )}

              <button
                className="btn bg-danger text-white px-4"
                type="button"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // SELLER NAVBAR
  else if (token && role === "seller") {
    return (
      <nav className="navbar navbar-expand-lg p-3 fixed-top bg-body-tertiary w-100">
        <div className="container-fluid">

          <a className="navbar-brand fs-4" href="#">
            Add your Books!
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sellerNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="sellerNav">
            

            <div className="d-flex flex-column flex-lg-row ms-auto gap-3 mt-2 mt-lg-0">

                <Link to="/seller-dash" className="btn border bg-black text-white fs-5">
                Dashboard
              </Link>
              <Link to="/books" className="btn border bg-black text-white fs-5">
                Home
              </Link>

              <Link
                to="/seller-product/:sellerId"
                className="btn border bg-black text-white fs-5"
              >
                MyProducts
              </Link>

              <Link
                to="/addbook"
                className="btn border bg-black text-white fs-5"
              >
                Add book
              </Link>
              <Link
                to="/sellerOrder"
                className="btn border bg-black text-white fs-5"
              >
                Orders
              </Link>

              <button
                className="btn bg-danger text-white px-4"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>

        </div>
      </nav>
    );
  }

  // ADMIN NAVBAR
  else if (token && role === "admin") {
    return (
      <nav className="navbar navbar-expand-lg p-3 fixed-top bg-body-tertiary">
        <div className="container-fluid">

          <a className="navbar-brand fs-2">Administration</a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="adminNav">
            <div className="d-flex flex-column flex-lg-row ms-auto gap-3 mt-2 mt-lg-0">

              <Link to="/dashboard"
                className="btn border bg-black text-white fs-5"
              >
                Dashboard
              </Link>

              <Link to="/users"
                className="btn border bg-black text-white fs-5"
              >
                Users
              </Link>

              <Link to="/sellers"
                className="btn border bg-black text-white fs-5"
              >
                Sellers
              </Link>

              <Link to="/books"
                className="btn border bg-black text-white fs-5"
              >
                Books
              </Link>

              <button
                className="btn bg-danger text-white px-4"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>

        </div>
      </nav>
    );
  }

  // NO TOKEN NAVBAR
  else {
    return (
      <nav className="navbar navbar-expand-lg p-3 fixed-top bg-body-tertiary">
        <div className="container-fluid">

          <a className="navbar-brand fs-2">Book Store</a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#publicNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="publicNav">
            <div className="d-flex flex-column flex-lg-row ms-auto gap-3 mt-2 mt-lg-0">

              <button
                className="btn bg-primary text-white px-4"
                onClick={() => navigate("/")}
              >
                Login
              </button>

              <button
                className="btn bg-info text-white px-4"
                onClick={() => navigate("/register")}
              >
                Register
              </button>

            </div>
          </div>

        </div>
      </nav>
    );
  }
}

export default Navbar;
