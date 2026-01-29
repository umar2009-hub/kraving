// import React from "react";
// import { Link } from "react-router-dom";

// export default function Footer() {
//   return (
//     <div>
//       <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
   
//         <div className="col-md-4 d-flex align-items-center">
      
//           <Link
//             to="/"
//             className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
//             aria-label="Bootstrap"
//           >
            
//           </Link>
//           <span className="mb-3 mb-md-0 text-body-secondary">
//             © 2025 Company, Inc
//           </span>
//         </div>
//       </footer>
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="border-top mt-5"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <div className="d-flex align-items-center">
            <Link
              to="/"
              className="text-decoration-none fw-bold fst-italic text-dark me-2"
              style={{ fontSize: "1.1rem" }}
            >
              Kraving
            </Link>
            <span className="text-muted">
              © 2025. All rights reserved.
            </span>
          </div>

          <div className="text-muted small">
            Built with ❤️ using MERN
          </div>
        </div>
      </div>
    </footer>
  );
}
