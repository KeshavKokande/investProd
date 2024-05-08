// src/components/Modal/Modal.js
import React from "react";
import "./Modal.css";
import PricingCard from "../PricingCard/PricingCard";
import './../PricingApp/PricingApp.css'
import './../PricingCard/PricingCard.css'
const Modal = ({ isOpen, closeModal, planid, advisor }) => {
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
            title="3 Months"
            price="₹ 1000"
            feature1="Rebancing updates for 3 months"
            feature2="X"
            feature3="X"
            planid = {planid}
            advisor ={advisor}
            days={0}
          />
          <PricingCard
         
            title="6 Months"
            recomendation="MOST BOUGHT"
            price="₹ 1800"
            feature1="90 days support"
            feature2="Access to paid plans for 6 months"
            feature3="X"
            planid = {planid}
            advisor ={advisor}
            days = {84}
          />
          <PricingCard
            title="12 Months"
            price="3000"
            feature1="180 days support"
            feature2="Access to free plans and paid plans for 12 months"
            feature3=""
            planid = {planid}
            advisor ={advisor}
            days = {168}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
