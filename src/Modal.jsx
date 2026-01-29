import { createPortal } from "react-dom";

const NAVBAR_HEIGHT = 70;

const OVERLAY_STYLES = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: 2000
};

const MODAL_STYLES = {
  position: "fixed",
  top: `${NAVBAR_HEIGHT + 20}px`,
  left: "50%",
  transform: "translateX(-50%)",
backgroundColor: "#ffffff",   // white background
color: "#000000",       
  zIndex: 2001,
  height: `calc(100vh - ${NAVBAR_HEIGHT + 40}px)`,
  width: "90vw",
  overflowY: "auto",
  borderRadius: "8px",
  padding: "20px"
};

export default function Modal({ children, onClose }) {
  const root = document.getElementById("cart-root");
  if (!root) return null;

  return createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <button
          onClick={onClose}
          className="btn btn-danger"
          style={{ position: "sticky", top: 0, float: "right" }}
        >
          X
        </button>
        {children}
      </div>
    </>,
    root
  );
}
