import React from 'react';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';

import './Card.css'; // Import the CSS file for the Card component


const Card = ({ title, text, buttonLabel }) => (

  <MDBCard className="card">

    <MDBCardBody className="card-body">

      <MDBCardTitle className="card-title">{title}</MDBCardTitle>

      <MDBCardText className="card-text">{text}</MDBCardText>

      <MDBBtn className="card-button">{buttonLabel}</MDBBtn>

    </MDBCardBody>

  </MDBCard>

);


export default Card;