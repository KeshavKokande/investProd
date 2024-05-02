import React from "react";
import PricingApp from "../../PricingCards/PricingApp"; // Import your PricingApp component
import "./Modal.css";

const Modal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
        <h2>Pricing</h2>
        <PricingApp /> {/* Render the PricingApp component inside the modal */}
      </div>
    </div>
  );
};

export default Modal;