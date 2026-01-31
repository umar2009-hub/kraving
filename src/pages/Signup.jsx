import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });

  const [successMsg, setSuccessMsg] = useState(""); // NEW
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
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

      // 🎉 SHOW ANIMATED MESSAGE
      setSuccessMsg("🎉 Registered Successfully!");

      // Redirect after 2 sec
      setTimeout(() => {
        navigate("/login");
      }, 2000);

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
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4" style={{ width: "480px" }}>

        <Link to="/" className="btn btn-outline-success w-100 mb-3">
          Home
        </Link>

        <h3 className="text-center mb-3">Create Account</h3>

        {/* SUCCESS ANIMATION */}
        {successMsg && (
          <div
            className="alert alert-success text-center fw-bold"
            style={{
              animation: "fadeIn 0.6s ease-in-out",
              borderRadius: "10px"
            }}
          >
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" name="name" placeholder="Name" onChange={onChange} required />
          <input className="form-control mb-2" name="email" placeholder="Email" onChange={onChange} required />
          <input className="form-control mb-2" name="password" type="password" placeholder="Password" onChange={onChange} required />
          <input className="form-control mb-3" name="geolocation" placeholder="Address" onChange={onChange} required />

          <button className="btn btn-success w-100">Sign Up</button>

          <Link to="/login" className="btn btn-outline-dark w-100 mt-2">
            Login
          </Link>
        </form>
      </div>

      {/* SIMPLE CSS ANIMATION */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
