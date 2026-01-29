// import React, { useEffect, useRef, useState } from "react";
// import { useCart, useDispatchCart } from "./CartContext";

// export default function Card(props) {
//   const cart = useCart();
//   const priceRef = useRef();
//   const dispatch = useDispatchCart();

//   const [qty, setQty] = useState(1);
//   const [size, setSize] = useState("Small");

//   const priceOptions = props.options?.[0] || {};
//   const unitPrice = Number(priceOptions[size] || 0);
//   const finalPrice = unitPrice * qty;
//   console.log(cart)
// useEffect(()=>{
//   setSize(priceRef.current.value)
// },[])


//   const handleAddToCart = () => {
//     if (!props.foodId) {
//       console.error("foodId is undefined!", props);
//       return;
//     }

//     dispatch({
//       type: "ADD",
//       id: props.foodId,
//       name: props.foodName,
//       price: finalPrice,
//       qty,
//       size,
//       img: props.imgSrc,
//     });
//   };

//   return (
//     <div className="card h-100">
//       <img
//         src={props.imgSrc}
//         className="card-img-top"
//         style={{ height: "200px", objectFit: "cover" }}
//         alt={props.foodName}
//       />

//       <div className="card-body d-flex flex-column">
//         <h5 className="card-title">{props.foodName}</h5>

//         <div className="mt-auto">
//           {/* Quantity */}
//           <select
//             className="me-2 rounded"
//             style={{ backgroundColor: "rgb(174, 218, 204)" }}
//             value={qty}
//             onChange={(e) => setQty(Number(e.target.value))}
//           >
//             {Array.from({ length: 6 }, (_, i) => (
//               <option key={i + 1} value={i + 1}>
//                 {i + 1}
//               </option>
//             ))}
//           </select>

//           {/* Size */}
//           <select
//             className="me-2 rounded"
//             style={{ backgroundColor: "rgb(174, 218, 204)" }}
//             value={size}
//             ref={priceRef}
//             onChange={(e) => setSize(e.target.value)}
//           >
//             {Object.keys(priceOptions).map((key) => (
//               <option key={key} value={key}>
//                 {key}
//               </option>
//             ))}
//           </select>

//           <div className="fw-bold mt-2">₹{finalPrice}</div>
//         </div>

//         <hr />

//         <button className="btn btn-success" onClick={handleAddToCart}>
//           Add to cart
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./CartContext";

export default function Card(props) {
  const cart = useCart();
  const priceRef = useRef();
  const dispatch = useDispatchCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("Small");

  const priceOptions = props.options?.[0] || {};
  const unitPrice = Number(priceOptions[size] || 0);
  const finalPrice = unitPrice * qty;
  console.log(cart);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleAddToCart = () => {
    if (!props.foodId) {
      console.error("foodId is undefined!", props);
      return;
    }

    dispatch({
      type: "ADD",
      id: props.foodId,
      name: props.foodName,
      price: finalPrice,
      qty,
      size,
      img: props.imgSrc,
    });
  };

  return (
    <div
      className="card h-100 shadow-sm"
      style={{ borderRadius: "12px", overflow: "hidden" }}
    >
      <img
        src={props.imgSrc}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
        alt={props.foodName}
      />

      <div className="card-body d-flex flex-column p-3">
        <h6 className="card-title fw-semibold mb-2">
          {props.foodName}
        </h6>

        <div className="mt-auto">
          <div className="d-flex align-items-center mb-2 gap-2">
            {/* Quantity */}
            <select
              className="form-select form-select-sm w-auto"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            {/* Size */}
            <select
              className="form-select form-select-sm w-auto"
              value={size}
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {Object.keys(priceOptions).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div className="fw-bold fs-5 text-success mb-2">
            ₹{finalPrice}
          </div>
        </div>

        <button
          className="btn btn-success w-100 mt-2"
          style={{ borderRadius: "8px" }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
