// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const [loginDetails, setLoginDetails] = useState({
//     email: "",
//     password: ""
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch("http://localhost:5000/api/loginuser", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         email: loginDetails.email,
//         password: loginDetails.password
//       })
//     });

//     const json = await response.json();
//     console.log(json);

//     if (json.success) {
//       localStorage.setItem("userEmail", loginDetails.email);
//       // store token (temporary) because of JWT
//       localStorage.setItem("token", json.token);
//       navigate("/");
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   const onChange = (e) => {
//     setLoginDetails({
//       ...loginDetails,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//       <form
//         style={{ height: "300px", width: "400px", display: "flex", flexDirection: "column" }}
//         onSubmit={handleSubmit}
//       >
//         <h3 className="text-center mb-4">Login</h3>

//         <div className="mb-3">
//           <label className="form-label fw-bold">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             name="email"
//             value={loginDetails.email}
//             onChange={onChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label fw-bold">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             name="password"
//             value={loginDetails.password}
//             onChange={onChange}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-success mx-auto" style={{ width: "120px" }}>
//           Login
//         </button>

//         <Link to="/signup" className="btn btn-dark mx-auto mt-3" style={{ width: "200px" }}>
//           I am a new user
//         </Link>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: loginDetails.email,
        password: loginDetails.password
      })
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("userEmail", loginDetails.email);
      localStorage.setItem("token", json.token);
      navigate("/");
    } else {
      alert("Invalid credentials");
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
