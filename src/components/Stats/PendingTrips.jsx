import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBCardImage,
  
  } from 'mdb-react-ui-kit';
  import newuserimg from "../../assets/images/newuser.png"
import { getTripCompleted } from "../../utils/api";

const PendingTrips=({data})=> {

  
   
      return (
       <>
       
      <MDBCard>
          <MDBCardBody className="d-flex new-users">
          <MDBCol sm='4' className="booked-trip-icon">
          <MDBCardImage position='top' alt='...' src={newuserimg} />
          </MDBCol>
          <MDBCol sm='8'>
            <MDBCardText>
              <div>
                <h5>Pending Trips</h5>
            <span>{data?.pendingTrip}</span>
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
  
   export default PendingTrips; 