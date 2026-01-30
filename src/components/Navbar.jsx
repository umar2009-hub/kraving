import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal.jsx";
import { useCart } from "../components/CartContext";
import Cart from "../pages/Cart.jsx";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [cartView, setcartView] = useState(false);
  const navigate = useNavigate();
  const cart = useCart();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) return null;

  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top shadow-sm">
      <div className="container-fluid px-4">
        <Link
          className="navbar-brand fw-bold fst-italic"
          style={{ fontSize: "1.8rem" }}
          to="/"
        >
          Kraving
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Search */}
          <form
            className="d-flex mx-auto my-2 my-lg-0"
            style={{ maxWidth: "520px", width: "100%" }}
          >
            <input
              className="form-control rounded"
              placeholder="Search food..."
            />
            <button className="btn btn-success ms-2 px-3">
              Search
            </button>
          </form>

          {/* Links */}
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <Link className="btn btn-outline-success px-3" to="/">
                Home
              </Link>
            </li>

            {user && (
              <li className="nav-item">
                <Link className="btn btn-outline-success px-3" to="/myOrder">
                  My Orders
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-2">
          {!user ? (
            <>
              <Link className="btn btn-success px-3" to="/login">
                Login
              </Link>

              <Link className="btn btn-outline-dark px-3" to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <>
              <button
                className="btn btn-success d-flex align-items-center gap-2"
                onClick={() => setcartView(true)}
              >
                Cart
                <Badge pill bg="light" text="dark">
                  {cart.length}
                </Badge>
              </button>

              {cartView && (
                <Modal onClose={() => setcartView(false)}>
                  <Cart />
                </Modal>
              )}

              <button
                className="btn btn-outline-danger px-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
