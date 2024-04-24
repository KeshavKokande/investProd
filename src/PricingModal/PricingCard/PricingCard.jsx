// src/components/PricingCard/PricingCard.js
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./PricingCard.css";
import { useNavigate } from 'react-router-dom';

const PricingCard = ({ title, price, feature1, feature2, feature3,recomendation,planid,advisor,days }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(`/payment/${advisor}/${planid}/${days}`); // Navigate to the payment page
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="PricingCard">
      <header>
        <p className="card-title">{title}</p>
        <p className="card-title">{recomendation}</p>
        <h1 className="card-price">{price}</h1>
      </header>
      <div className="card-features">
        <div className="card-storage">{feature1}</div>
        <div className="card-users-allowed">{feature2}</div>
        <div className="card-send-up">{feature3}</div>
      </div>
      <button className="card-btn" onClick={handleBuyNow}>
        Buy Now
      </button>
      <Modal isOpen={modalIsOpen} closeModal={closeModal}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>{title}</h2>
          <p>{price}</p>
          <p>{feature1}</p>
          <p>{feature2}</p>
          <p>{feature3}</p>
        </div>
      </Modal>
    </div>
  );
};

export default PricingCard;
