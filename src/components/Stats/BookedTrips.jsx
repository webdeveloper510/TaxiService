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
          <MDBCardBody className="d-flex">
          <MDBCol sm='4'>
          <MDBCardImage position='top' alt='...' src={trips} />
          </MDBCol>
          <MDBCol sm='8'>
            <MDBCardText>
                <h5>Booked Trips</h5><br/>
            <span>450</span><br/>
            <hr></hr><br/>
            <p>60% increase in 20 days</p>
            </MDBCardText>
            </MDBCol>
          </MDBCardBody>
        </MDBCard>
       
       </>
      );
    };
  
   export default BookedTrips; 