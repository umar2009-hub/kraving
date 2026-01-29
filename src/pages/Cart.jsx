
// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { useCart, useDispatchCart } from "../components/CartContext";

// export default function Cart() {
//   const data = useCart();
//   const dispatch = useDispatchCart();

//   if (data.length === 0) {
//     return <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>;
//   }

//   const handleCheckout = async () => {
//     try {
//       const userEmail = localStorage.getItem("userEmail");

//       const response = await fetch(
//         "http://localhost:5000/api/orderData",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             order_data: data,
//             email: userEmail,
//             order_date: new Date().toDateString(),
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Checkout failed");
//       }

//       dispatch({ type: "DROP" });
//       alert("Order placed successfully");

//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong during checkout");
//     }
//   };

//   const totalPrice = data.reduce(
//     (total, food) => total + food.price * food.qty,
//     0
//   );

//   return (
//     <div className="container m-auto mt-5 table-responsive">
//       <table className="table table-hover">
//         <thead className="text-success fs-4">
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Quantity</th>
//             <th>Option</th>
//             <th>Amount</th>
//             <th></th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((food, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{food.name}</td>
//               <td>{food.qty}</td>
//               <td>{food.size}</td>
//               <td>₹{food.price * food.qty}</td>
//               <td>
//                 <button
//                   className="btn p-0"
//                   onClick={() => dispatch({ type: "REMOVE", index })}
//                 >
//                   <FontAwesomeIcon icon={faTrash} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2>Total Price: ₹{totalPrice}/-</h2>

//       <button className="btn bg-success mt-4" onClick={handleCheckout}>
//         Check Out
//       </button>
//     </div>
//   );
// }

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCart, useDispatchCart } from "../components/CartContext";

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <h4 className="text-muted">Your cart is empty</h4>
      </div>
    );
  }

  const handleCheckout = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      const response = await fetch(
        "http://localhost:5000/api/orderData",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      dispatch({ type: "DROP" });
      alert("Order placed successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong during checkout");
    }
  };

  const totalPrice = data.reduce(
    (total, food) => total + food.price * food.qty,
    0
  );

  return (
    <div className="container my-5" style={{ minHeight: "60vh" }}>
      <h2 className="text-center fw-bold mb-4">Your Cart</h2>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Size</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {data.map((food, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{food.name}</td>
                    <td>{food.qty}</td>
                    <td>{food.size}</td>
                    <td className="fw-semibold">
                      ₹{food.price * food.qty}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm text-danger"
                        onClick={() =>
                          dispatch({ type: "REMOVE", index })
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
        <h4 className="fw-bold mb-3 mb-md-0">
          Total: ₹{totalPrice}/-
        </h4>

        <button
          className="btn btn-success px-4 py-2"
          style={{ borderRadius: "8px" }}
          onClick={handleCheckout}
        >
          Check Out
        </button>
      </div>
    </div>
  );
}
