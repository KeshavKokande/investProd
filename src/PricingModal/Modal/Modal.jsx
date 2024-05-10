// src/components/Modal/Modal.js
import React from "react";
import "./Modal.css";
import PricingCard from "../PricingCard/PricingCard";
import './../PricingApp/PricingApp.css'
import './../PricingCard/PricingCard.css'
const Modal = ({ isOpen, closeModal, planid, advisor, cat }) => {
  if (!isOpen) return null;
 let price1=1000;
 let price2=1800;
 let price3=3000;

 if (cat == 'executive') {
    price1 = 1500;
    price2 = 2500;
    price3 = 4000;
  } else if (cat == 'premium') {
    price1 = 1800;
    price2 = 3000;
    price3 = 5000;
  }

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
            price={`₹ ${price1}`}
            feature1="Rebalncing updates for 3 months"
            feature2="Access Premium plan for 3 months"
            feature3="X"
            planid = {planid}
            advisor ={advisor}
            days={90}
            fee={price1}
          />
          <PricingCard
         
            title="6 Months"
            recomendation="MOST BOUGHT"
            price={`₹ ${price2}`}
            feature1="Rebalncing updates for 6 months"
            feature2="Access Premium plan for 6 months"
            feature3="X"
            planid = {planid}
            advisor ={advisor}
            days = {180}
            fee={price3}
          />
          <PricingCard
            title="12 Months"
            price={`₹ ${price3}`}
            feature1="Rebalncing updates for 12 months"
            feature2="Access Premium plan for 12 months"
            feature3="X"
            planid = {planid}
            advisor ={advisor}
            days = {360}
            fee={price3}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
