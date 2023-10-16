import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBCardImage,
  
  } from 'mdb-react-ui-kit';
import trips from "../../assets/images/bookedtrips.png"
//import background from '../assets/images/heroimg.png';

const BookedTrips=()=> {
   
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
  
   export default BookedTrips; 