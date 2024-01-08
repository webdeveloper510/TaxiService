import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBCardImage,

} from 'mdb-react-ui-kit';
import canceltrip from "../../assets/images/cancelled-trip.png"

const CancelledTrips = ({ data }) => {



  return (
    <>
      <br />
      <MDBCard>
        <MDBCardBody className="d-flex cancelled-trips">
          <MDBCol sm='4' className="booked-trip-icon">
            <MDBCardImage position='top' alt='...' src={canceltrip} />
          </MDBCol>
          <MDBCol sm='8'>
            <MDBCardText>
              <div>
                <h5>Cancelled Trips</h5>
                <span>{data?.cancelTrips || 0}</span>
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

export default CancelledTrips; 