// src/components/Modal/Modal.js
import React from "react";
import "./Modal.css";
import PricingCard from "../PricingCard/PricingCard";
import './../PricingApp/PricingApp.css'
import './../PricingCard/PricingCard.css'
const Modal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <header>
          <h1 className="header-topic">Our Pricing Plan</h1>
          <div className="header-row"></div>
        </header>
        <div className="pricing-cards" >
          <PricingCard
            title="Free"
            price="₹ 0"
            feature1="Access to free plans"
            feature2="X"
            feature3="X"
          />
          <PricingCard
            title="3 Month"
            recomendation="MOST BOUGHT"
            price="₹ 3000"
            feature1="90 days support"
            feature2="Access to free plans and paid plans"
            feature3="X"
          />
          <PricingCard
            title="6 Month"
            price="₹ 4000"
            feature1="180 days support"
            feature2="Access to free plans and paid plans"
            feature3="Personalized recommendations"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
