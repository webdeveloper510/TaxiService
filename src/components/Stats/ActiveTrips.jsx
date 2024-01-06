import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBCardImage,

} from 'mdb-react-ui-kit';
import trips from "../../assets/images/bookedtrips.png"
import { getTripCompleted } from "../../utils/api";
//import background from '../assets/images/heroimg.png';

const ActiveTrips = ({ data }) => {



  return (
    <>
      <MDBCard>
        <MDBCardBody className="d-flex booked-trips-card">
          <MDBCol sm='4' className="booked-trip-icon">
            <MDBCardImage position='top' alt='...' src={trips} />
          </MDBCol>
          <MDBCol sm='8'>
            <MDBCardText>
              <div>
                <h5>Booked Trips</h5>
                <span>{data?.bookedTrips}</span>
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

export default ActiveTrips; 