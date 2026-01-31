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
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(loginDetails)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

      setUser(data.user);
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
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4" style={{ width: "420px" }}>

        {/* HOME BUTTON */}
        <Link to="/" className="btn btn-outline-success w-100 mb-3">
          Home
        </Link>

        <h3 className="text-center mb-4">Welcome Back</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            onChange={onChange}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            name="password"
            placeholder="Password"
            onChange={onChange}
            required
          />

          <button className="btn btn-success w-100">Login</button>

          <Link to="/signup" className="btn btn-outline-dark w-100 mt-2">
            Create an account
          </Link>
        </form>
      </div>
    </div>
  );
}
