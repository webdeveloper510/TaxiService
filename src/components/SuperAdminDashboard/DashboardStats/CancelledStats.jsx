import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBCardImage,
  
  } from 'mdb-react-ui-kit';
import canceltrip from "../../../assets/images/cancelled-trip.png"

const CancelledStats=()=> {
   
      return (
       <>
      <MDBCard>
          <MDBCardBody className="d-flex cancelled-trips">
          <MDBCol sm='4'>
          <MDBCardImage position='top' alt='...' src={canceltrip} />
          </MDBCol>
          <MDBCol sm='8'>
            <MDBCardText>
              <div>
                <h5>Cancelled Trips</h5>
            <span>450</span>
            <hr></hr>
            <p>60% increase in 20 days</p>
            </div>
            </MDBCardText>
            </MDBCol>
          </MDBCardBody>
        </MDBCard>
       
       </>
      );
    };
  
   export default CancelledStats; 