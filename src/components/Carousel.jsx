import React from "react";
import BG1 from "../Images/BG1.jpeg";
import BG2 from "../Images/BG2.jpeg";
import BG3 from "../Images/BG3.jpeg";

export default function Carousel() {
  return (
    <div
      id="carouselExample"
      className="carousel slide position-relative"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={BG1}
            className="d-block w-100"
            style={{ height: "450px", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={BG2}
            className="d-block w-100"
            style={{ height: "450px", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={BG3}
            className="d-block w-100"
            style={{ height: "450px", objectFit: "cover" }}
          />
        </div>
      </div>


      <button className="carousel-control-prev" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" />
      </button>
      <button className="carousel-control-next" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" />
      </button>
    </div>
  );
}

