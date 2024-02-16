import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBCardImage,

} from 'mdb-react-ui-kit';
import trips from "../../assets/images/bookedtrips.png"

const PendingTrips = ({ data }) => {



  return (
    <>
      <MDBCard>
        <MDBCardBody className="d-flex booked-trips-card">
          <MDBCol md='4' className="booked-trip-icon">
            <MDBCardImage position='top' alt='...' src={trips} />
          </MDBCol>
          <MDBCol md='8'>
            <MDBCardText>
              <div>
                <h5>Pending Trips</h5>
                <span>{data?.pendingTrip || 0}</span>
                <hr></hr>
                {/* <p>60% increase in 20 days</p> */}
              </div>
            </MDBCardText>
          </MDBCol>
        </MDBCardBody>
      </MDBCard>

    </>
  );
};

export default PendingTrips; 