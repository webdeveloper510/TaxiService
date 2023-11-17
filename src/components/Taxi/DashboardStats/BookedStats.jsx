import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBCardImage,
  
  } from 'mdb-react-ui-kit';
import trips from "../../../assets/images/bookedtrips.png"
import { getCountDashboard } from "../../../utils/api";
//import background from '../assets/images/heroimg.png';

const BookedStats=({count})=> {
   

  
      return (
       <>
      <MDBCard>
          <MDBCardBody className="d-flex booked-trips-card">
          <MDBCol sm='4'>
          <MDBCardImage position='top' alt='...' src={trips} />
          </MDBCol>
          <MDBCol sm='8'>
            <MDBCardText>
              <div>
                <h5>Booked Trips</h5>
            <span>{count?.bookedTrips}</span>
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
  
   export default BookedStats; 