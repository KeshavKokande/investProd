import React from 'react';

import {

  MDBCard,

  MDBCardBody,

  MDBTypography,

  MDBCardText,

  MDBRow,

  MDBCol

} from 'mdb-react-ui-kit';


const CardWithText = ({ title, text }) => {

  return (

    <MDBRow className="g-0">

      <MDBCol md="12">

        <MDBCardBody className="p-4">

          <MDBTypography tag="h6">{title}</MDBTypography>

          <hr className="mt-0 mb-4" />

          <MDBCardText>{text}</MDBCardText>

        </MDBCardBody>

      </MDBCol>

    </MDBRow>

  );

};


export default CardWithText;