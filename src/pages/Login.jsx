import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include", // 🔥 REQUIRED FOR COOKIES
          body: JSON.stringify({
            email: loginDetails.email,
            password: loginDetails.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // ✅ Update global auth state
      setUser(data.user);

      // ✅ Redirect
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  };

  const onChange = (e) => {
    setLoginDetails({
      ...loginDetails,
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
        style={{ width: "420px", borderRadius: "12px" }}
      >
        <div className="card-body p-4">
          <h3 className="text-center mb-4 fw-bold">Welcome Back</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={loginDetails.email}
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={loginDetails.password}
                onChange={onChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 mb-3"
              style={{ borderRadius: "8px" }}
            >
              Login
            </button>

            <div className="text-center">
              <span className="text-muted">New here?</span>
            </div>

            <Link
              to="/signup"
              className="btn btn-outline-dark w-100 mt-2"
              style={{ borderRadius: "8px" }}
            >
              Create an account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
