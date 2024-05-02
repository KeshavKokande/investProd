// src/components/PricingApp/PricingApp.js
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import PricingCard from "../PricingCard/PricingCard";
import "./PricingApp.css";

function PricingApp() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="PricingApp">
      <div className="app-container">
       
        <Modal isOpen={modalIsOpen} closeModal={closeModal}>
          
        </Modal>
      </div>
    </div>
  );
}

export default PricingApp;
