// import { Link , useNavigate} from "react-router-dom";
// import React from "react";
// import Badge from 'react-bootstrap/Badge';
// import { useState } from "react";
// import Modal from "../Modal.jsx";
// import { useCart } from "../components/CartContext";
// import Cart from "../pages/Cart.jsx";


// export default function Navbar() {
//   const [cartView, setcartView] =  useState(false);
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     navigate("/login")
//   }
//   const cart = useCart();


//   return (
//     <nav
//       className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
//       style={{ backgroundClip: "rgba(212, 249, 237, 1)" }}
//     >
//       <div className="container-fluid">
//         <Link
//           className="navbar-brand fs-1 fw-bold fst-italic"
//           style={{ marginLeft: "40px" }}
//           to="/"
//         >
//           Kraving
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent" 
//          style={{
//           width:"700px"
//          }}
//         >
//           <form className="d-flex mx-auto" 
//           style={{
//             width:"600px"
//           }}
//           >
//             <input
//               style={{ borderRadius: "8px 8px 8px 8px" }}
//               className="form-control "
//               placeholder="Enter food name"
//             />

//             <button
//               className="btn btn-success ml-25"
//               style={{ marginLeft: "10px" }}
//             >
//               Search
//             </button>
//           </form>

//           <Link
//             className="nav-link me-3 bg-success text-white"
//             style={{
//               marginRight: "20px",
//               width: "72.6px",
//               height: "37.6px",
//               borderRadius: "7px",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginLeft: "25px"
//             }}
//             to="/"
//           >
//             Home
//           </Link>

//           {localStorage.getItem("token") ? (
//             <Link
//               className="nav-link me-3 bg-success text-white"
//               style={{
//                 marginRight: "20px",
//                 width: "77.6px",
//                 height: "37.6px",
//                 borderRadius: "7px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginLeft: "50px",
//               }}
//               to="/myOrder"
//             >
//               My orders
//             </Link>
//           ) : (
//             " "
//           )}
//         </div>

//         <div className="ls d-flex">
//           {!localStorage.getItem("token") ? (
//             <>
//               <Link
//                 className="nav-link me-3 bg-success text-white"
//                 style={{
//                   marginLeft: "20px",
//                   width: "72.6px",
//                   height: "37.6px",
//                   borderRadius: "7px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//                 to="/login"
//               >
//                 Login
//               </Link>

//               <Link
//                 className="nav-link me-3 bg-success text-white"
//                 style={{
//                   marginLeft: "20px",
//                   width: "72.6px",
//                   height: "37.6px",
//                   borderRadius: "7px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//                 to="/signup"
//               >
//                 Signup
//               </Link>
//             </>
//           ) : (
//             <div className="d-flex align-items-center">
//               <div
//                 className="btn nav-link me-3 bg-success text-white"
//                 style={{
//                   marginLeft: "20px",
//                   width: "72.6px",
//                   height: "39.6px",
//                   borderRadius: "7px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//                 onClick={()=>{setcartView(true)}}
//               >
//                 My Cart {" "}
//                 <Badge pill bg="light" text="dark">
//   {cart.length}
// </Badge>

//               </div>
//               {cartView && (
//   <Modal onClose={() => setcartView(false)}>
//     <Cart />
//   </Modal>
// )}

//               <div
//               onClick={handleLogout}
//                 className="btn nav-link me-3 bg-success text-white"
//                 style={{
//                   marginLeft: "20px",
//                   width: "72.6px",
//                   height: "37.6px",
//                   borderRadius: "7px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 Logout
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }


import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal.jsx";
import { useCart } from "../components/CartContext";
import Cart from "../pages/Cart.jsx";

export default function Navbar() {
  const [cartView, setcartView] = useState(false);
  const navigate = useNavigate();
  const cart = useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
          <form className="d-flex mx-auto my-2 my-lg-0" style={{ maxWidth: "520px", width: "100%" }}>
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

            {localStorage.getItem("token") && (
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
          {!localStorage.getItem("token") ? (
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
