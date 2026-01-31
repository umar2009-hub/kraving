
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/myOrderData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setOrders(data.orderData || []);
    } catch (error) {
      console.error("Order fetch failed", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <Navbar />

      <div
        className="container my-5"
        style={{ minHeight: "60vh" }}
      >
        <h2 className="text-center fw-bold mb-4">My Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center text-muted fs-5">
            You have not placed any orders yet.
          </div>
        ) : (
          orders
            .slice()
            .reverse()
            .map((order, index) => (
              <div
                key={index}
                className="mb-5 p-3 rounded"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="fw-semibold mb-0">
                    Order Date
                  </h5>
                  <span className="text-muted">
                    {order.order_date}
                  </span>
                </div>

                <hr />

                <div className="row">
                  {order.items.map((item, i) => (
                    <div key={i} className="col-12 col-md-6 col-lg-3">
                      <div
                        className="card h-100 shadow-sm mt-3"
                        style={{ borderRadius: "12px" }}
                      >
                        <img
                          src={item.img}
                          className="card-img-top"
                          alt={item.name}
                          style={{
                            height: "140px",
                            objectFit: "cover",
                            borderTopLeftRadius: "12px",
                            borderTopRightRadius: "12px",
                          }}
                        />

                        <div className="card-body d-flex flex-column">
                          <h6 className="card-title fw-semibold">
                            {item.name}
                          </h6>

                          <div className="text-muted small mb-2">
                            Qty: {item.qty} · Size: {item.size}
                          </div>

                          <div className="mt-auto fs-5 fw-bold text-success">
                            ₹{item.price * item.qty}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>

      <Footer />
    </>
  );
}

