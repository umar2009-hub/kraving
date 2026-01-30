import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Account created successfully. Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong");
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card shadow-sm"
        style={{ width: "480px", borderRadius: "12px" }}
      >
        <div className="card-body p-4">
          <h3 className="text-center mb-4 fw-bold">Create Account</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
              />
              <div className="form-text">
                We'll never share your email.
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Address</label>
              <input
                type="text"
                className="form-control"
                name="geolocation"
                value={formData.geolocation}
                onChange={onChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 mb-3"
              style={{ borderRadius: "8px" }}
            >
              Sign Up
            </button>

            <div className="text-center">
              <span className="text-muted">Already have an account?</span>
            </div>

            <Link
              to="/login"
              className="btn btn-outline-dark w-100 mt-2"
              style={{ borderRadius: "8px" }}
            >
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
