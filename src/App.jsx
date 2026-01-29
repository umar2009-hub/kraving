import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import MyOrder from "./pages/MyOrder";

function App() {
  return (
    <>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myOrder" element={<MyOrder />} />
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;

// import "./App.css";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import { CartProvider } from "./context/CartContext";

// import { Routes, Route } from "react-router-dom";

// function App() {
//   return (
//     <CartProvider>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>

//     </CartProvider>
//   );
// }

// export default App;
